# Altmed Website Growth Roadmap

Date: 2026-04-30

## Scope

This roadmap turns `altmedfirst.com` into a stronger local healthcare platform with a cleaner public site, stronger SEO coverage, and a more usable admin dashboard.

The current codebase already includes:
- Next.js public site with route-level service pages
- Admin CMS for blog posts, FAQs, announcements, providers, menus, site settings, treatment plans, and contact submissions
- Sitemap and robots routes
- Clinic, website, breadcrumb, service, and FAQ schema helpers
- S3-capable image upload with local `/uploads` fallback

## Current Page Inventory

Core public pages:
- `/`
- `/services`
- `/about-us`
- `/contact-us`
- `/appointment`
- `/patient-forms`
- `/telehealth-manassas`
- `/health-blogs`
- `/faq`
- `/plans`
- `/updates`

Service pages currently represented:
- `/services/urgent-care-manassas-va`
- `/services/primary-care-manassas-va`
- `/services/occupational-health-manassas`
- `/services/occupational-health/drug-alcohol-testing-manassas`
- `/services/occupational-health/breath-alcohol-test-manassas`
- `/services/occupational-health/lab-testing-manassas`
- `/services/occupational-health/pre-employment-physical`
- `/services/occupational-health/vaccinations-immunizations-manassas-va`
- `/services/occupational-health/workers-compensation-injury-care-manassas`
- `/services/occupational-health/xray-service`
- `/services/weight-loss-manassas-va`
- `/services/functional-medicine-manassas`
- `/services/addiction-medicine-manassas`
- `/services/tpa-services-northern-virginia`

Legacy or compatibility pages exist for `/about`, `/contact`, `/blog`, `/faqs`, and related redirects.

## Audit Findings

### High Priority

1. Image uploads fail in production unless backend ECS has a proper `taskRoleArn` with S3 permissions.
   - Current behavior: S3 env vars trigger S3 uploads.
   - Required AWS fix: backend task role needs `s3:PutObject`, `s3:DeleteObject`, and optionally `s3:GetObject` for `arn:aws:s3:::altmed-uploads-prod/uploads/*`.

2. Admin service-page editing was hidden behind dynamic URLs.
   - Fix started: added `/admin/services-pages` inventory page and sidebar entry.

3. Duplicate legacy URLs can dilute crawl clarity if they render content instead of redirecting or canonicalizing.
   - Confirm canonical strategy for `/about` vs `/about-us`, `/contact` vs `/contact-us`, `/blog` vs `/health-blogs`, `/faqs` vs `/faq`.

4. Location SEO needs expansion beyond broad Manassas targeting.
   - Add service-location combinations only where useful and non-duplicative.
   - Prioritize Gainesville, Bristow, Haymarket, Manassas Park, Woodbridge, Centreville, and Prince William County.

5. Conversion paths need a consistent CTA model.
   - Every service page should include `Book Appointment`, `Call`, and `Contact/Consult` actions near the top, mid-page, and bottom.

### Medium Priority

1. Schema coverage is good but should be made consistent.
   - Use service schema and FAQ schema for every service page with meaningful FAQs.
   - Add physician/provider schema once provider data is stable.

2. Blog and FAQ can target long-tail queries better.
   - Create service-specific FAQ clusters and link them to service pages.
   - Add article templates for symptoms, preparation, cost/insurance, employer compliance, and visit expectations.

3. Admin UI should be grouped by mental model, not implementation model.
   - Started groups: Dashboard, Services, Content, Appointments / Leads, Settings.
   - Future group: Media Uploads once a media library exists.

4. Navigation should reduce clutter.
   - Keep top-level nav focused on Services, Patient Forms, Plans, Blog, FAQ, Contact.
   - Use grouped service dropdowns for Primary/Urgent Care, Occupational Health, Wellness/Treatment, and Employer Services.

### Lower Priority

1. Add a true media library.
   - Central list of uploaded files, copy URL, preview, delete, and storage status.

2. Add role-based access.
   - Current backend has `role`, but admin/editor UX is not separated.
   - Later: editor can manage blog/FAQ only; admin can manage settings/payments/users.

3. Add lead pipeline states.
   - Contact submissions are reviewed/unreviewed today.
   - Later: new, contacted, booked, closed, spam.

## Competitor Gap Signals

Nearby competitors and references reviewed:
- Patient First Manassas: strong service breadth, walk-in positioning, hours, insurance, awards, on-site labs/x-rays.
- Valley Patient Urgent Care: broad service list, extended/weekend hours, testimonials, multilingual positioning, booking CTAs.
- NextCare Virginia: strong location finder, wait-time style urgency, virtual care CTAs, insurance messaging.

Altmed opportunities:
- Own occupational health, DOT, drug testing, MRO, TPA, and employer compliance content more deeply than local urgent-care competitors.
- Add clearer trust and credential blocks around Dr. Gerald Lee and provider specialties.
- Emphasize same-day care plus ongoing primary care continuity.
- Use patient-friendly service preparation content: what to bring, what to expect, when results are available, employer paperwork steps.
- Improve conversion by making phone, booking, and form actions persistent and consistent on mobile.

## Keyword Plan

Primary local keywords:
- walk-in clinic Manassas VA
- urgent care Manassas VA
- primary care Manassas VA
- medical weight loss Manassas VA
- DOT physical Manassas VA
- drug testing Manassas VA
- breath alcohol test Manassas
- occupational health clinic Manassas
- workers compensation doctor Manassas
- lab testing Manassas
- telehealth Manassas
- Suboxone doctor Manassas
- functional medicine Manassas
- TPA services Northern Virginia
- MRO services Manassas

Location modifiers:
- Manassas Park
- Gainesville
- Bristow
- Haymarket
- Woodbridge
- Centreville
- Prince William County
- Northern Virginia

Long-tail FAQ targets:
- do I need an appointment for urgent care in Manassas
- what do I need for a DOT physical
- how long do drug test results take
- where can employers send workers for pre-employment physicals
- what happens after a workplace injury
- can I get medical weight loss injections near Manassas
- when should I choose urgent care instead of ER

## Page Expansion Plan

### Phase 1: Service Quality

Improve existing core services:
- Urgent Care
- Primary Care
- Occupational Health
- DOT Physicals
- Drug and Alcohol Testing
- Workers' Compensation
- Medical Weight Loss
- Telehealth

Each page should include:
- One clear H1
- Short intro with location and service promise
- Symptoms/use cases
- What to expect
- Insurance/payment note where appropriate
- FAQs
- Internal links to related services
- CTA blocks

### Phase 2: Occupational Health Cluster

Add or strengthen:
- DOT physicals
- Non-DOT physicals
- Pre-employment physicals
- Return-to-work exams
- Random drug testing programs
- MRO services
- TPA services
- Employer injury care

### Phase 3: Local SEO Pages

Create carefully differentiated local pages:
- Urgent care near Manassas Park
- Primary care near Gainesville / Bristow
- Occupational health for Prince William County employers
- Drug testing near Haymarket / Gainesville

Avoid mass duplicated city pages. Each page needs a distinct local angle and useful patient/employer content.

### Phase 4: Blog / Education Hub

Publish 2-4 articles/month:
- Visit prep
- Employer compliance
- Weight loss education
- Urgent care decision guides
- Primary care prevention
- Seasonal health

## Admin Dashboard Roadmap

Started:
- Added Services Management inventory page.
- Reorganized sidebar mental model.
- Added consistent loading/disabled submit states.
- Added success toaster pattern.
- Improved S3 upload error clarity.

Next:
- Add media library page.
- Add service-page filters for missing SEO title, missing description, inactive page, and no featured image.
- Add dashboard quick actions: Add Blog Post, Edit Services, Review Leads, Upload Image.
- Add admin error toasts for server action failures where recoverable.
- Add lead status workflow.
- Add editor/admin role permissions.

## Implementation Sequence

1. Fix deployment storage reliability.
2. Finish admin IA: services list, media library, lead workflow.
3. Normalize redirects/canonicals for legacy routes.
4. Build service-page SEO checklist into admin.
5. Refresh homepage CTA and service grouping.
6. Expand occupational health content cluster.
7. Add location pages only after core service pages are strong.
8. Add blog content calendar and publish cadence.
9. Run Lighthouse and Search Console checks after deployment.

## 90-Day Content Strategy

Month 1:
- What to Bring to a DOT Physical in Manassas
- Urgent Care vs ER: When to Choose Same-Day Clinic Care
- How Long Do Drug Test Results Take?
- Medical Weight Loss: What to Expect at Your First Visit

Month 2:
- Pre-Employment Physicals for Prince William County Employers
- Workers' Compensation Injury Care: First Steps After an Injury
- Breath Alcohol Testing for DOT and Workplace Compliance
- Primary Care Checkups: What Adults Should Track Each Year

Month 3:
- MRO Services Explained for Employers
- Drug Testing Programs for Small Businesses
- Telehealth for Common Follow-Up Visits
- Flu Shots and Vaccinations Before Peak Season

## Local SEO Actions Outside The Website

- Fully update Google Business Profile services.
- Add appointment URL, product/service listings, photos, and weekly posts.
- Request reviews with service keywords naturally mentioned by patients.
- Build consistent citations for name, address, phone, hours, and website.
- Track rankings by service plus location.
