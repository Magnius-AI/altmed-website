# Auto-Billing System Design for AltMed

## Overview
Automate invoicing for services rendered, especially B2B (employer accounts).

---

## Billing Scenarios

### 1. Patient Self-Pay (Point of Service)
- Patient pays at checkout
- Cash, card, or payment plan
- No invoicing needed (handled by practice management software)

### 2. Insurance Billing
- Claims submitted to insurance
- Handled by existing billing software/clearinghouse
- Out of scope for this system

### 3. Employer/Corporate Billing (AUTO-INVOICE)
- Company sends employees for DOT physicals, drug tests, etc.
- AltMed invoices company monthly or per-service
- **THIS IS WHAT WE'RE AUTOMATING**

---

## Auto-Invoice Flow

```
Employee Visit → Service Logged → Invoice Generated → Email to Company → Payment Tracked
```

### Step 1: Company Account Setup
```sql
CREATE TABLE billing_accounts (
  id INTEGER PRIMARY KEY,
  company_name TEXT NOT NULL,
  billing_contact_name TEXT,
  billing_email TEXT NOT NULL,
  billing_address TEXT,
  payment_terms INTEGER DEFAULT 30, -- Net 30
  tax_exempt BOOLEAN DEFAULT FALSE,
  tax_exempt_number TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE billing_rates (
  id INTEGER PRIMARY KEY,
  account_id INTEGER REFERENCES billing_accounts(id),
  service_code TEXT NOT NULL,
  service_name TEXT NOT NULL,
  rate DECIMAL(10,2) NOT NULL,
  -- NULL account_id = default rate
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Service Logging
When employee visits:
```sql
CREATE TABLE billable_services (
  id INTEGER PRIMARY KEY,
  account_id INTEGER REFERENCES billing_accounts(id),
  employee_name TEXT,
  employee_id TEXT,
  service_date DATE NOT NULL,
  service_code TEXT NOT NULL,
  service_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  invoice_id INTEGER REFERENCES invoices(id), -- NULL until invoiced
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Step 3: Invoice Generation
```sql
CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  invoice_number TEXT UNIQUE NOT NULL, -- ALT-2026-0001
  account_id INTEGER REFERENCES billing_accounts(id),
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, paid, overdue, void
  sent_at DATETIME,
  paid_at DATETIME,
  payment_method TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoice_line_items (
  id INTEGER PRIMARY KEY,
  invoice_id INTEGER REFERENCES invoices(id),
  service_id INTEGER REFERENCES billable_services(id),
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);
```

### Step 4: Auto-Generation Logic
```javascript
// Run monthly (or weekly) via cron
async function generateInvoices() {
  // Get all accounts with unbilled services
  const accounts = await db.getAccountsWithUnbilledServices();
  
  for (const account of accounts) {
    // Get unbilled services for this account
    const services = await db.getUnbilledServices(account.id);
    
    if (services.length === 0) continue;
    
    // Calculate totals
    const subtotal = services.reduce((sum, s) => sum + s.total_price, 0);
    const taxRate = account.tax_exempt ? 0 : 0; // Medical services usually tax exempt
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;
    
    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber(); // ALT-2026-0042
    
    // Create invoice
    const invoice = await db.createInvoice({
      invoiceNumber,
      accountId: account.id,
      invoiceDate: new Date(),
      dueDate: addDays(new Date(), account.payment_terms),
      subtotal,
      taxAmount,
      totalAmount: total,
      status: 'draft'
    });
    
    // Link services to invoice
    for (const service of services) {
      await db.linkServiceToInvoice(service.id, invoice.id);
    }
    
    // Generate PDF
    const pdfPath = await generateInvoicePDF(invoice);
    
    // Send email
    await sendInvoiceEmail(account.billing_email, invoice, pdfPath);
    
    // Update status
    await db.updateInvoiceStatus(invoice.id, 'sent', new Date());
  }
}
```

---

## Invoice PDF Template

```
╔══════════════════════════════════════════════════════════════╗
║                    ALTMED MEDICAL CENTER                      ║
║              8551 Rixlew Lane Suite 140                       ║
║              Manassas, VA 20109                               ║
║              Phone: (703) 361-4357                            ║
║              info@altmedfirst.com                             ║
╚══════════════════════════════════════════════════════════════╝

INVOICE #: ALT-2026-0042                    DATE: February 1, 2026
                                            DUE: March 3, 2026

BILL TO:
ABC Trucking Company
123 Industrial Blvd
Manassas, VA 20109
Attn: John Smith, HR Manager

═══════════════════════════════════════════════════════════════
DATE        EMPLOYEE        SERVICE                    AMOUNT
═══════════════════════════════════════════════════════════════
01/15/26    Mike Johnson    DOT Physical               $85.00
01/15/26    Mike Johnson    Drug Screen (10-panel)     $55.00
01/18/26    Sarah Williams  DOT Physical               $85.00
01/22/26    Robert Garcia   Pre-Employment Drug Test   $45.00
01/28/26    Tom Anderson    DOT Physical               $85.00
01/28/26    Tom Anderson    Drug Screen (10-panel)     $55.00
═══════════════════════════════════════════════════════════════
                                        SUBTOTAL:     $410.00
                                        TAX:            $0.00
                                        ─────────────────────
                                        TOTAL DUE:    $410.00

PAYMENT OPTIONS:
• Check payable to: Altmed Medical Center
• Credit Card: Call (703) 361-4357
• ACH/Wire: Contact billing@altmedfirst.com for details

Thank you for your business!
```

---

## Automated Email Notifications

### Invoice Sent
```
Subject: Invoice #ALT-2026-0042 from Altmed Medical Center

Dear John,

Please find attached your invoice for services rendered in January 2026.

Invoice #: ALT-2026-0042
Amount Due: $410.00
Due Date: March 3, 2026

[View Invoice Online] [Pay Now]

Questions? Reply to this email or call (703) 361-4357.

Thank you for choosing Altmed Medical Center.
```

### Payment Reminder (7 days before due)
```
Subject: Reminder: Invoice #ALT-2026-0042 due in 7 days

Your invoice of $410.00 is due on March 3, 2026.

[Pay Now]
```

### Overdue Notice (7 days after due)
```
Subject: OVERDUE: Invoice #ALT-2026-0042 - Payment Required

Your invoice of $410.00 was due on March 3, 2026.

Please remit payment immediately to avoid service interruption.

[Pay Now] [Contact Us]
```

---

## Payment Tracking

### Online Payment Options
1. **Stripe** - Credit card processing
2. **Square** - Simple invoicing + payments
3. **QuickBooks** - Full accounting integration
4. **PaySimple** - Recurring billing

### Recommended: Square Invoices
- Free to send invoices
- 2.6% + 10¢ per card payment
- ACH payments: 1% (min $1)
- Built-in payment reminders
- Integrates with QuickBooks

---

## Implementation Options

### Option A: Add to DriverHub
- Build into existing system
- Full customization
- More development work

### Option B: Square/QuickBooks
- Use existing tools
- Less customization
- Faster to implement
- Monthly fee (~$30-80/month)

### Option C: Hybrid
- Log services in custom system
- Export to QuickBooks for invoicing
- Best of both worlds

---

## Service Price List (Configure in System)

| Code | Service | Default Rate |
|------|---------|--------------|
| DOT-PHY | DOT Physical | $85 |
| DOT-COMBO | DOT Physical + Drug Screen | $130 |
| DRUG-5 | Drug Screen (5-panel) | $45 |
| DRUG-10 | Drug Screen (10-panel) | $55 |
| DRUG-RAP | Rapid Drug Test | $35 |
| ALC-BAT | Breath Alcohol Test | $35 |
| PHY-PRE | Pre-Employment Physical | $75 |
| PHY-ANN | Annual Physical | $95 |
| VAC-FLU | Flu Shot | $35 |
| WL-INIT | Weight Loss Initial Consult | $150 |
| WL-SEMI | Semaglutide (monthly) | $350 |
| WL-TIRZ | Tirzepatide (monthly) | $450 |
| WL-B12 | B12 Injection | $25 |

---

## Next Steps

1. Choose implementation approach
2. Set up payment processor (Square recommended)
3. Create company account onboarding form
4. Build/configure invoice generation
5. Set up automated email sequences
6. Train staff on logging billable services
