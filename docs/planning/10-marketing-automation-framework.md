# Marketing Automation Framework
**For: AltMed Medical Center**
**Goal:** Achieve 60 patients/day (320/week) through automated digital marketing
**Budget:** Under $500/month
**Date:** 2026-02-02

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   MARKETING AUTOMATION                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    │
│  │   Traffic    │──▶│   Capture    │──▶│   Nurture    │    │
│  │   Sources    │   │    Leads     │   │  & Convert   │    │
│  └──────────────┘   └──────────────┘   └──────────────┘    │
│       │                   │                   │             │
│       ▼                   ▼                   ▼             │
│  • Google Ads        • Chatbot          • Email Seq        │
│  • Facebook Ads      • Forms            • SMS              │
│  • SEO               • Exit Intent      • Retargeting      │
│  • B2B Outreach      • Phone            • Follow-up        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         INTEGRATION LAYER (Zapier/Make.com)          │   │
│  └──────────────────────────────────────────────────────┘   │
│       │                                                      │
│       ▼                                                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    │
│  │   CRM/DB     │   │  DriverHub   │   │   Booking    │    │
│  │  (Airtable)  │   │   (SQLite)   │   │(PatientFusion│    │
│  └──────────────┘   └──────────────┘   └──────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Lead Capture (Week 1-2)

### 1. AI Chatbot Integration

**Platform:** Tidio (Free tier: 100 chats/month) or ChatBot.com

**Implementation:**

```html
<!-- Add to /altmed-website/public/index.html -->
<script src="//code.tidio.co/YOUR_TIDIO_ID.js" async></script>
```

**Chatbot Flows:**

**Flow A: General Visitor**
```
Bot: Hi! 👋 Looking for healthcare services in Manassas?
User: [Yes] / [No] / [Text response]

→ If Yes:
Bot: What brings you in today?
[Primary Care] [DOT Physical] [Drug Test] [Weight Loss] [Other]

→ After selection:
Bot: Great! Can I get your name and phone number to schedule?
[Capture: Name, Phone, Email]

→ SMS sent: "Thanks [Name]! Call (703) 361-4357 to schedule, or book online: [link]"
```

**Flow B: Corporate Client**
```
Bot: Welcome! Are you looking for employee health services?
[Yes, for my company] [No, personal care]

→ If Yes:
Bot: Perfect! We serve trucking, utilities, and corporate clients. Which best describes your business?
[Trucking/Fleet] [Utilities] [Other Corporate]

→ Capture: Company Name, Contact, # Employees, Services Needed
→ Trigger: Email to clinic + SMS to contact
```

**Flow C: Returning Patient**
```
Bot: Welcome back! Need to:
[Schedule Appointment] [Pay Invoice] [Check Results] [Other]

→ Route accordingly
```

### 2. Exit Intent Popup

**File: `/src/components/ExitIntentPopup.jsx`**

```jsx
import { useState, useEffect } from 'react';
import { X, Phone, Calendar } from 'lucide-react';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !localStorage.getItem('popup_shown')) {
        setShow(true);
        localStorage.setItem('popup_shown', Date.now());
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Send to email list (Mailchimp/SendGrid)
    console.log('Captured email:', email);
    setSubmitted(true);
    setTimeout(() => setShow(false), 3000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Wait! Before you go...
            </h2>
            <p className="text-gray-600 mb-6">
              Get <strong>$20 off</strong> your first DOT physical or primary care visit!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Get My $20 Off Coupon
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Or call now to schedule:</p>
              <a
                href="tel:+17033614357"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50"
              >
                <Phone className="w-5 h-5" />
                (703) 361-4357
              </a>
            </div>
          </>
        ) : (
          <div className="text-center">
            <Calendar className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Check Your Email!
            </h3>
            <p className="text-gray-600">
              Your $20 off coupon is on its way. See you soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 3. Lead Capture Forms

**High-Converting Form Fields:**
- Name (required)
- Phone (required)
- Email (required)
- Service Needed (dropdown)
- Preferred Date/Time (optional)
- Company Name (if corporate)

**Embed on:**
- Homepage
- Service pages
- Landing pages
- Contact page

---

## Phase 2: Email Automation (Week 2-3)

### Platform: SendGrid (Free: 100 emails/day) or Mailchimp

### Email Sequences

**Sequence 1: DOT Physical Lead**

**Email 1 (Immediate):**
```
Subject: Schedule Your DOT Physical Today - AltMed

Hi [Name],

Thanks for your interest in our DOT physical exams!

We know you're busy, so we've made it easy:
✓ Walk-in friendly (no appointment needed)
✓ Results same-day
✓ Medical card issued on-site

📍 Location: 8551 Rixlew Lane, Suite 140, Manassas, VA
📞 Call: (703) 361-4357
🌐 Book online: [Link]

See you soon!
Dr. Gerald K. Lee & Team
```

**Email 2 (+2 days if no booking):**
```
Subject: Still need your DOT physical, [Name]?

We're here to help! Here's what to bring:
- Valid driver's license
- List of current medications
- Glasses/contacts (if you wear them)

Average visit time: 30 minutes
Price: $100 (most competitive in the area)

[Schedule Now Button]

Questions? Call (703) 361-4357
```

**Email 3 (+5 days):**
```
Subject: [Name], Your DOT card expires when?

Don't risk being grounded! FMCSA violations can cost you time and money.

✓ Fast service
✓ Same-day medical card
✓ Experienced examiner

Book now: [Link]
Walk in today: 8551 Rixlew Lane, Manassas
```

**Sequence 2: Corporate Lead**

**Email 1 (Immediate):**
```
Subject: Fleet Compliance Made Easy - AltMed DriverHub

Hi [Name],

Thanks for reaching out about employee health services!

We help companies like [Company] stay DOT compliant without the paperwork headaches.

Our DriverHub platform offers:
✓ Automated expiration alerts
✓ Digital medical card storage
✓ Online scheduling for drivers
✓ Compliance reporting

[Schedule a Demo] [Download Info Sheet]

Best,
AltMed Medical Center
```

**Email 2 (+3 days):**
```
Subject: See DriverHub in action (5-minute video)

Hi [Name],

Curious how DriverHub simplifies driver compliance?

Watch this quick demo: [Video Link]

See how we help fleet managers like you:
- Eliminate manual tracking
- Never miss an expiration
- Reduce admin time by 80%

Ready to chat? [Book a Call]
```

**Email 3 (+7 days):**
```
Subject: What if compliance was this easy?

[Case Study]

ABC Trucking reduced violations by 95% in 6 months using DriverHub.

Could we do the same for [Company]?

[Get Started] [Talk to Us]
```

---

## Phase 3: SMS Automation (Week 3)

### Platform: Twilio ($0.0079/SMS) or SimpleTexting

**Use Cases:**

1. **Appointment Reminders**
   ```
   Hi [Name], reminder: DOT physical tomorrow at 2pm.
   AltMed Medical Center, 8551 Rixlew Ln, Manassas.
   Reply CONFIRM or call (703) 361-4357
   ```

2. **Follow-Up After Visit**
   ```
   Thanks for visiting AltMed today! Your medical card is valid
   until [Date]. We'll send you a reminder 30 days before expiration.
   Questions? Call (703) 361-4357
   ```

3. **Re-engagement**
   ```
   Hi [Name], your DOT medical card expires in 30 days.
   Schedule your renewal at AltMed: [Link] or call (703) 361-4357
   ```

---

## Phase 4: Retargeting Ads (Week 4)

### Facebook/Instagram Pixel

**Install on website:**
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

**Retargeting Audiences:**

1. **Visited pricing page but didn't book**
   - Ad: "$20 off your first visit - Limited time!"

2. **Visited DOT Physical page**
   - Ad: "Same-day DOT medical cards. Walk-ins welcome."

3. **Abandoned contact form**
   - Ad: "Still have questions? Call us: (703) 361-4357"

---

## Phase 5: Automation Workflows (Zapier/Make.com)

### Workflow 1: Lead → CRM → Notification

```
Trigger: New form submission (website)
↓
Action 1: Add to Airtable (CRM database)
↓
Action 2: Send email notification to clinic staff
↓
Action 3: Send SMS to lead (immediate)
↓
Action 4: Add to email sequence (Mailchimp/SendGrid)
```

### Workflow 2: Corporate Demo Request

```
Trigger: "Corporate" form submission
↓
Action 1: Create DriverHub company record
↓
Action 2: Send calendar invite (demo)
↓
Action 3: Add to corporate email sequence
↓
Action 4: Notify sales team via Slack/Discord
```

### Workflow 3: Appointment Booked

```
Trigger: Appointment scheduled (PatientFusion webhook)
↓
Action 1: Send confirmation email
↓
Action 2: Send SMS reminder (-24 hours)
↓
Action 3: Add to DriverHub if DOT service
```

---

## Budget Allocation ($500/month)

| Channel | Monthly Cost | Purpose |
|---------|-------------|---------|
| Google Ads | $200 | High-intent keywords (DOT physical, drug test) |
| Facebook/Instagram Ads | $150 | Local awareness, retargeting |
| Tidio/Chatbot | $20 | Lead capture |
| SendGrid/Mailchimp | $15 | Email automation |
| Twilio (SMS) | $50 | Appointment reminders, follow-ups |
| Zapier/Make.com | $30 | Automation workflows |
| Domain/Hosting | $35 | Website + tools |
| **Total** | **$500** | |

---

## Success Metrics (KPIs)

### Weekly Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Website Visitors | 1,000/week | TBD | 🔄 |
| Leads Captured | 200/week | TBD | 🔄 |
| Conversion Rate | 10% | TBD | 🔄 |
| Appointments Booked | 320/week | TBD | 🔄 |
| Cost Per Lead | <$2.50 | TBD | 🔄 |
| Cost Per Patient | <$25 | TBD | 🔄 |

### Dashboard Tracking

Use Google Analytics + custom dashboard:
- Traffic sources
- Conversion funnel
- Email open/click rates
- SMS response rates
- ROI by channel

---

## Implementation Timeline

**Week 1:**
- [ ] Install chatbot (Tidio)
- [ ] Add exit intent popup
- [ ] Set up Facebook Pixel
- [ ] Configure Google Analytics goals

**Week 2:**
- [ ] Set up SendGrid/Mailchimp
- [ ] Create email sequences (3 for each audience)
- [ ] Design email templates with AltMed branding

**Week 3:**
- [ ] Set up Twilio for SMS
- [ ] Create SMS templates (reminders, follow-ups)
- [ ] Test SMS workflows

**Week 4:**
- [ ] Launch retargeting ads (Facebook/Instagram)
- [ ] Set up Zapier/Make.com workflows
- [ ] Connect all systems (CRM → Email → SMS → Ads)

---

## Next Steps

1. **Choose platforms** (Tidio vs ChatBot, SendGrid vs Mailchimp)
2. **Create accounts** and get API keys
3. **Build email templates** with AltMed branding
4. **Test workflows end-to-end** before going live
5. **Launch Phase 1** (chatbot + exit intent) this week
