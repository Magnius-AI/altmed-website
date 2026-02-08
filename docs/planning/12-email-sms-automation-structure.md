# Email + SMS Automation Structure
**For: AltMed Medical Center**
**Goal:** Convert leads into appointments + retain patients
**Date:** 2026-02-02

---

## Systems Overview

**Email Platform:** SendGrid (free 100/day) or Mailchimp
**SMS Platform:** Twilio (pay per SMS)
**Automation Tool:** Zapier / Make.com

---

## Core Automation Pipelines

### 1. New Lead → Appointment

**Trigger:** New form submission OR chatbot lead captured

**Actions:**
1. Add lead to CRM (Airtable/Google Sheet)
2. Send immediate confirmation email
3. Send SMS with booking link
4. Start email sequence based on service type
5. Notify clinic staff in Discord

**Example Email (Immediate):**
```
Subject: We received your request - AltMed Medical Center

Hi [Name],

Thanks for reaching out to AltMed! We received your request for [Service].

To schedule faster, call us now: (703) 361-4357
Or book online: https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966

We’ll call you back shortly.

- AltMed Medical Center
```

**Example SMS (Immediate):**
```
AltMed: Thanks [Name]! To schedule your [Service], call (703) 361-4357 
or book online: [Link]. Reply STOP to unsubscribe.
```

---

### 2. Appointment Reminder Flow

**Trigger:** Appointment booked

**Schedule:**
- 24 hours before appointment
- 2 hours before appointment

**SMS Reminder (24h):**
```
AltMed Reminder: You have an appointment tomorrow at [Time].
Location: 8551 Rixlew Ln, Suite 140, Manassas.
Reply CONFIRM or call (703) 361-4357 to reschedule.
```

**SMS Reminder (2h):**
```
AltMed Reminder: Your appointment is in 2 hours at [Time].
Please arrive 10 minutes early.
```

---

### 3. Post-Visit Follow-Up

**Trigger:** Appointment completed

**Actions:**
1. Send thank-you email
2. Ask for Google review
3. If DOT service, set expiration reminder

**Email (24h after visit):**
```
Subject: Thanks for visiting AltMed!

Hi [Name],

Thanks for choosing AltMed Medical Center. We hope you had a great visit!

If you were happy with your experience, would you mind leaving a quick review?
👉 [Google Review Link]

We appreciate your trust!

- AltMed Team
```

---

### 4. DOT Card Expiration Reminder

**Trigger:** DOT physical completed

**Schedule:**
- 90 days before expiration
- 30 days before expiration
- 7 days before expiration

**SMS (30 days):**
```
AltMed Reminder: Your DOT medical card expires in 30 days.
Schedule your renewal now: [Link] or call (703) 361-4357.
```

---

### 5. Corporate Client Follow-Up

**Trigger:** Corporate demo request

**Actions:**
1. Send corporate info packet email
2. Schedule demo call
3. Send DriverHub demo link

**Email (Immediate):**
```
Subject: DriverHub Compliance Demo - AltMed

Hi [Name],

Thanks for your interest in DriverHub! We help fleets stay compliant with:
✅ Automated driver file tracking
✅ Medical card expiration alerts
✅ DOT compliance reporting
✅ Online driver scheduling

Let’s schedule a 15-minute demo:
[Calendly Link]

- AltMed Corporate Team
```

---

## Email Sequences by Audience

### A. DOT Physical Leads (3-email sequence)

1. Immediate: Welcome + booking info
2. +2 days: What to bring + pricing
3. +5 days: Urgency (don’t risk DOT violations)

### B. Primary Care Leads (3-email sequence)

1. Immediate: Welcome + services overview
2. +3 days: Meet the doctor + location
3. +7 days: $20 off first visit

### C. Corporate Leads (3-email sequence)

1. Immediate: DriverHub overview
2. +3 days: Demo video + case study
3. +7 days: Offer pilot program

---

## SMS Templates Library

**Appointment Confirmation**
```
AltMed: Confirmed! Your appointment is set for [Date] at [Time].
Location: 8551 Rixlew Ln, Manassas.
Call (703) 361-4357 with questions.
```

**Missed Appointment**
```
AltMed: We missed you today. Want to reschedule?
Call (703) 361-4357 or book here: [Link]
```

**Prescription Ready**
```
AltMed: Your prescription is ready for pickup.
Call us at (703) 361-4357 if you need help.
```

---

## Compliance Notes

- All emails must include unsubscribe link (CAN-SPAM)
- All SMS must include "Reply STOP to unsubscribe" (TCPA)
- Store consent for marketing communications
- HIPAA: avoid sharing sensitive medical data in text/email

---

## Implementation Checklist

- [ ] Choose email platform (SendGrid or Mailchimp)
- [ ] Create email templates with AltMed branding
- [ ] Set up Twilio account + phone number
- [ ] Build automation workflows in Zapier
- [ ] Test all sequences end-to-end
- [ ] Launch campaigns

---

## KPI Targets

| Metric | Target |
|--------|--------|
| Email open rate | >35% |
| Email click rate | >8% |
| SMS response rate | >12% |
| Lead → Appointment | >20% |
| No-show rate | <10% |

---

## Next Steps

1. Confirm platform choices (SendGrid vs Mailchimp, Twilio vs SimpleTexting)
2. Create branded templates
3. Deploy automation workflows
4. Track and optimize weekly
