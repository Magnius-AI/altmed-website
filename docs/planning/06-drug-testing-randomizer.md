# Quarterly Drug & Alcohol Testing Randomization System

## DOT Requirement Overview
- DOT requires **random drug testing** for safety-sensitive employees
- Minimum **50% of drivers** must be tested for drugs annually
- Minimum **10% of drivers** must be tested for alcohol annually
- Selection must be **truly random** (not predictable)
- **Quarterly selection** is industry standard

---

## How It Works

### Company Signs Up
1. Company provides employee roster (name, ID, position)
2. AltMed assigns them to random testing pool
3. Company pays annual fee per employee

### Quarterly Randomization
1. System randomly selects employees (ensures DOT minimums)
2. Selected employees notified (or employer notified)
3. Employees must test within specified window
4. Results sent to MRO for review
5. Company receives compliant documentation

---

## System Design

### Database Tables

```sql
-- Companies in the testing pool
CREATE TABLE testing_pool_companies (
  id INTEGER PRIMARY KEY,
  company_name TEXT NOT NULL,
  dot_number TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  annual_fee_per_employee DECIMAL(10,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Employees in testing pools
CREATE TABLE testing_pool_employees (
  id INTEGER PRIMARY KEY,
  company_id INTEGER REFERENCES testing_pool_companies(id),
  employee_name TEXT NOT NULL,
  employee_id TEXT, -- Company's internal ID
  position TEXT,
  is_dot_covered BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Random selections
CREATE TABLE random_selections (
  id INTEGER PRIMARY KEY,
  quarter TEXT NOT NULL, -- "2026-Q1"
  selection_date DATE NOT NULL,
  test_type TEXT NOT NULL, -- "drug" or "alcohol"
  employee_id INTEGER REFERENCES testing_pool_employees(id),
  notification_sent BOOLEAN DEFAULT FALSE,
  test_completed BOOLEAN DEFAULT FALSE,
  test_date DATE,
  result TEXT, -- "negative", "positive", "refused", "no-show"
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for compliance
CREATE TABLE selection_audit_log (
  id INTEGER PRIMARY KEY,
  quarter TEXT NOT NULL,
  total_employees INTEGER,
  drug_selections INTEGER,
  alcohol_selections INTEGER,
  random_seed TEXT, -- For audit trail
  selected_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Randomization Algorithm

```javascript
// Quarterly random selection
function selectForTesting(companyId, quarter) {
  // Get all active DOT-covered employees
  const employees = db.getActiveEmployees(companyId);
  const totalCount = employees.length;
  
  // DOT minimums (annual, so divide by 4 for quarterly)
  const drugMinPercent = 50 / 4; // 12.5% per quarter
  const alcoholMinPercent = 10 / 4; // 2.5% per quarter
  
  // Calculate selection counts
  const drugCount = Math.ceil(totalCount * (drugMinPercent / 100));
  const alcoholCount = Math.ceil(totalCount * (alcoholMinPercent / 100));
  
  // Generate cryptographically random seed
  const seed = crypto.randomBytes(32).toString('hex');
  
  // Shuffle employees using Fisher-Yates with seeded random
  const shuffled = fisherYatesShuffle(employees, seed);
  
  // Select for drug testing
  const drugSelections = shuffled.slice(0, drugCount);
  
  // Select for alcohol (can overlap with drug)
  const alcoholShuffled = fisherYatesShuffle(employees, seed + 'alcohol');
  const alcoholSelections = alcoholShuffled.slice(0, alcoholCount);
  
  // Log for audit
  db.logSelection({
    quarter,
    totalEmployees: totalCount,
    drugSelections: drugCount,
    alcoholSelections: alcoholCount,
    randomSeed: seed
  });
  
  return { drugSelections, alcoholSelections };
}
```

---

## Notification System

### Selection Notification (to Employer)
```
Subject: Q1 2026 Random Drug & Alcohol Testing Selections

Dear [Company Contact],

The following employees have been randomly selected for Q1 2026 testing:

DRUG TESTING (must complete by March 31, 2026):
- John Smith (ID: 12345)
- Maria Garcia (ID: 12346)
- Robert Johnson (ID: 12347)

ALCOHOL TESTING (must complete by March 31, 2026):
- John Smith (ID: 12345)

Please ensure selected employees report to Altmed Medical Center within 24-48 hours of notification.

Location: 8551 Rixlew Lane Suite 140, Manassas, VA 20109
Hours: Mon-Fri 8am-6pm, Sat 9am-2pm
Phone: (703) 361-4357

For DOT compliance, selected employees must not be given advance notice beyond what's necessary to report for testing.

Questions? Contact us at info@altmedfirst.com

Altmed Medical Center - Your DOT Compliance Partner
```

---

## Pricing Structure

| Pool Size | Annual Fee/Employee | Includes |
|-----------|---------------------|----------|
| 1-10 employees | $75/employee | Random selection, notifications, compliance reports |
| 11-50 employees | $60/employee | Same + dedicated account manager |
| 51+ employees | $50/employee | Same + quarterly compliance reviews |

**Testing fees billed separately when selected:**
- Drug test (5-panel): $XX
- Drug test (10-panel): $XX
- Breath alcohol test: $XX

---

## Compliance Reports

Generate quarterly:
1. **Selection Report** - Who was selected, method used
2. **Testing Report** - Who completed, results summary
3. **Compliance Status** - Are minimums being met?
4. **Annual Summary** - Year-end DOT filing support

---

## Implementation Options

### Option A: Add to DriverHub
Extend the AltMed DriverHub system we built:
- Add these tables to existing database
- Build admin UI for managing pools
- Automated quarterly cron job for selections
- Email notifications via SendGrid/Mailgun

### Option B: Third-Party Integration
Use existing DOT consortium software:
- **Foley** - Industry standard
- **DISA** - Large consortium
- **Quest Diagnostics** - Testing + management

### Option C: Spreadsheet + Manual (MVP)
For small number of companies:
1. Keep roster in Google Sheets
2. Use RAND() function quarterly
3. Email selections manually
4. Track in spreadsheet

---

## Next Steps

1. Decide implementation approach (A, B, or C)
2. Define pricing for AltMed's market
3. Create marketing materials for trucking companies
4. Set up first pilot company
