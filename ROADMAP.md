# Sleek Nexus Creative — Web Application Launch Roadmap

A complete step-by-step guide to launching, connecting, and growing the Sleek Nexus Creative web platform.

---

## Table of Contents

1. [Phase 1 — Get Your Website Live](#phase-1--get-your-website-live-this-week)
2. [Phase 2 — Make Contact Forms Work](#phase-2--make-contact-forms-work-next-week)
3. [Phase 3 — Complete Incomplete Pages](#phase-3--complete-incomplete-pages-following-week)
4. [Phase 4 — Add Backend Database](#phase-4--add-backend-database-month-2)
5. [Phase 5 — Launch Admin Dashboard](#phase-5--launch-admin-dashboard-month-23)
6. [Phase 6 — SEO and Analytics](#phase-6--seo-and-analytics-month-3)
7. [Phase 7 — Hosting Business](#phase-7--hosting-business-month-36)
8. [Full Roadmap Summary](#full-roadmap-summary)
9. [Honest Advice](#honest-advice)

---

## Phase 1 — Get Your Website Live (This Week)

This is the most important first step. Everything else comes after.

```
Priority:  URGENT
Cost:      ~$20/year
Time:      1–2 days
```

---

### Step 1 — Buy Your Domain

Go to **name.com** and purchase:

```
sleeknexuscreative.com  →  $12.99/year
```

Always choose `.com` over `.pro` or any other extension.
It is the most trusted and recognized domain extension worldwide.

---

### Step 2 — Push Your Code to GitHub

You have already committed your code. Fix the connection issue and push:

```bash
# Check your internet connection first
ping github.com

# Then push your code
git push origin main
```

If HTTPS keeps failing switch to SSH:

```bash
git remote set-url origin git@github.com:solomon-211/Sleek_Nexus_Creative.git
git push
```

---

### Step 3 — Host on AWS S3 + CloudFront

#### Create S3 Bucket
1. Go to **AWS Console → S3 → Create bucket**
2. Bucket name: `sleek-nexus-creative`
3. Region: **Africa (Cape Town) af-south-1**
4. Uncheck **Block all public access**
5. Click **Create bucket**

#### Upload Your Files
```bash
aws s3 sync ./frontend s3://sleek-nexus-creative --delete
```

#### Enable Static Website Hosting
1. Go to bucket → **Properties → Static website hosting → Edit**
2. Select **Enable**
3. Index document: `html/index.html`
4. Error document: `html/404.html`
5. Click **Save changes**

#### Set Bucket Policy
Go to **Permissions → Bucket policy → Edit** and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::sleek-nexus-creative/*"
    }
  ]
}
```

#### Create CloudFront Distribution
1. Go to **CloudFront → Create distribution**
2. Origin: your S3 bucket website endpoint
3. Enable **Redirect HTTP to HTTPS**
4. Default root object: `html/index.html`
5. Deploy — takes about 10 minutes

---

### Step 4 — Get Free SSL Certificate

1. Go to **AWS Certificate Manager → us-east-1 region**
2. Click **Request certificate → Request public certificate**
3. Add both domains:
   ```
   sleeknexuscreative.com
   www.sleeknexuscreative.com
   ```
4. Choose **DNS validation**
5. Click **Create records in Route 53**
6. Wait 5 minutes for validation

---

### Step 5 — Connect Domain via Route 53

#### Get Your Route 53 Nameservers
1. Go to **Route 53 → Hosted zones**
2. Create hosted zone for `sleeknexuscreative.com`
3. Copy your 4 nameservers:
   ```
   ns-123.awsdns-12.com
   ns-456.awsdns-34.net
   ns-789.awsdns-56.org
   ns-012.awsdns-78.co.uk
   ```

#### Update Nameservers on name.com
1. Log into **name.com → My Domains**
2. Click `sleeknexuscreative.com`
3. Go to **Nameservers → Edit**
4. Replace with your 4 Route 53 nameservers
5. Wait 24–48 hours for propagation

#### Add DNS Records in Route 53
```
Type    Name    Value
A       @       CloudFront distribution (Alias)
CNAME   www     your-cloudfront-url.cloudfront.net
```

---

### Step 6 — Set Up Professional Email on Zoho Mail

#### Sign Up
1. Go to **zoho.com/mail**
2. Choose **Forever Free Plan**
3. Enter domain `sleeknexuscreative.com`

#### Add DNS Records in Route 53
```
Type    Name    Value                    Priority
MX      @       mx.zoho.com              10
MX      @       mx2.zoho.com             20
MX      @       mx3.zoho.com             50
TXT     @       zoho-verification=xxx
TXT     @       v=spf1 include:zoho.com ~all
CNAME   zmail   business.zoho.com
```

#### Create 5 Team Email Accounts
Go to **Admin Console → User Management → Add User**

```
solomon@sleeknexuscreative.com     →  Founder / CEO
gideon@sleeknexuscreative.com      →  CTO
genesis@sleeknexuscreative.com     →  Lead Developer
agau@sleeknexuscreative.com        →  Marketing Head
daniel@sleeknexuscreative.com      →  Sales Manager
```

#### Create Department Aliases (Free — Unlimited)
Go to **Admin Console → Users → click user → Email Aliases → Add Alias**

```
info@sleeknexuscreative.com        →  solomon
support@sleeknexuscreative.com     →  genesis
careers@sleeknexuscreative.com     →  agau
billing@sleeknexuscreative.com     →  daniel
academy@sleeknexuscreative.com     →  gideon
noreply@sleeknexuscreative.com     →  solomon
```

---

### Result After Phase 1

```
✅ sleeknexuscreative.com is live
✅ HTTPS enabled with free SSL
✅ Fast loading via CloudFront CDN
✅ solomon@sleeknexuscreative.com working
✅ info@sleeknexuscreative.com working
✅ All 5 team emails working
✅ Unlimited department aliases working
```

---

## Phase 2 — Make Contact Forms Work (Next Week)

All contact forms, quote forms, and booking forms currently do nothing. This phase makes every form submission arrive in your inbox.

```
Priority:  HIGH
Cost:      $0 forever
Time:      1–2 days
```

---

### Forms to Connect

```
contact.html             →  Lambda /contact
quote.html               →  Lambda /quote
book-consultation.html   →  Lambda /consultation
internships.html         →  Lambda /internship-apply
volunteer.html           →  Lambda /volunteer-apply
newsletter form          →  Lambda /newsletter
```

---

### Step 1 — Set Up Amazon SES

1. Go to **SES → Verified identities → Create identity**
2. Enter `info@sleeknexuscreative.com`
3. Verify via confirmation email AWS sends you

---

### Step 2 — Create Lambda Function

1. Go to **Lambda → Create function → Author from scratch**
2. Name: `snc-contact-form`
3. Runtime: **Node.js 20.x**
4. Replace default code with:

```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { name, email, phone, service, message } = body;

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Name, email and message are required" })
    };
  }

  const params = {
    Source: "info@sleeknexuscreative.com",
    Destination: {
      ToAddresses: ["info@sleeknexuscreative.com"]
    },
    Message: {
      Subject: {
        Data: `New Message from ${name} — SNC Website`
      },
      Body: {
        Html: {
          Data: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Service:</strong> ${service || "Not specified"}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        }
      }
    },
    ReplyToAddresses: [email]
  };

  await ses.send(new SendEmailCommand(params));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ success: true, message: "Message sent successfully" })
  };
};
```

5. Click **Deploy**

---

### Step 3 — Give Lambda Permission to Use SES

1. Lambda → **Configuration → Permissions → Execution role**
2. **Add permissions → Attach policies**
3. Attach `AmazonSESFullAccess`

---

### Step 4 — Create API Gateway

1. Go to **API Gateway → Create API → HTTP API**
2. Add integration → Lambda → select `snc-contact-form`
3. Configure routes:
   ```
   POST /contact
   POST /quote
   POST /consultation
   POST /internship-apply
   POST /volunteer-apply
   POST /newsletter
   ```
4. Copy your API URL:
   ```
   https://abc123xyz.execute-api.us-east-1.amazonaws.com
   ```

---

### Step 5 — Enable CORS

```
Access-Control-Allow-Origin:   https://sleeknexuscreative.com
Access-Control-Allow-Methods:  POST, OPTIONS
Access-Control-Allow-Headers:  Content-Type
```

---

### Step 6 — Update Frontend Forms

Update `frontend/js/api.js` or each form's JS file:

```javascript
const API_URL = "https://abc123xyz.execute-api.us-east-1.amazonaws.com";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById("form-message").textContent =
        "Message sent! We'll reply within 24 hours.";
      document.getElementById("form-message").style.color = "green";
      e.target.reset();
    }
  } catch (error) {
    document.getElementById("form-message").textContent =
      "Something went wrong. Please try again.";
    document.getElementById("form-message").style.color = "red";
  }
});
```

---

### Result After Phase 2

```
✅ Every contact form submission lands in your inbox
✅ Clients can reach you directly from the website
✅ Job applications go to careers@sleeknexuscreative.com
✅ Newsletter signups are collected
✅ Quote requests arrive with full project details
✅ Consultation bookings come with date and topic
✅ Volunteer applications are received automatically
```

---

## Phase 3 — Complete Incomplete Pages (Following Week)

Some pages on the site still need real content added to them.

```
Priority:  MEDIUM
Cost:      $0
Time:      2–3 days
```

---

### Pages to Complete

| Page | What to Add |
|---|---|
| `portfolio.html` | Real project showcase with images and descriptions |
| `case-studies.html` | Detailed write-ups of completed projects |
| `client-success.html` | Real client testimonials with names and photos |
| `browse-courses.html` | Link properly to courses.html catalog |
| `free-resources.html` | Add downloadable guides and templates |
| `certifications.html` | Explain your certification process and criteria |
| `student-projects.html` | Showcase real work from past students |

---

### Content Guidelines for Each Page

#### portfolio.html
```
- Add minimum 6 real projects
- Each project needs: title, image, description, technologies used, live link
- Filter by category: Web, Mobile, EdTech, Enterprise
```

#### case-studies.html
```
- Pick 3 of your best completed projects
- For each write: The Challenge, Our Solution, The Result
- Include real numbers: users served, time saved, revenue increased
```

#### client-success.html
```
- Add minimum 5 real testimonials
- Each needs: client name, company, role, photo, quote
- Add star ratings
```

---

### Result After Phase 3

```
✅ Portfolio shows real work to potential clients
✅ Case studies prove your capability with evidence
✅ Client testimonials build trust
✅ All pages are complete and professional
✅ No more placeholder or stub content
```

---

## Phase 4 — Add Backend Database (Month 2)

Connect your site to a real database to store contacts, applications, and newsletter subscribers permanently.

```
Priority:  MEDIUM
Cost:      $0 (MongoDB Atlas free tier forever)
Time:      3–5 days
```

---

### Step 1 — Create MongoDB Atlas Account

1. Go to **mongodb.com/atlas**
2. Sign up for free
3. Create a free **M0 cluster** (512MB — enough to start)
4. Create a database user with username and password
5. Allow access from anywhere `0.0.0.0/0` or your EC2 IP
6. Copy your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/snc
   ```

---

### Step 2 — Update Your Backend Environment Variables

Update `backend/.env`:

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/snc
JWT_SECRET=your-secret-key-here
EMAIL_FROM=info@sleeknexuscreative.com
FRONTEND_URL=https://sleeknexuscreative.com
```

---

### Step 3 — Collections to Create

```
contacts        →  all contact form submissions
quotes          →  all quote requests
consultations   →  all booking requests
newsletter      →  all subscriber emails
applications    →  all job and internship applications
volunteers      →  all volunteer applications
```

---

### Step 4 — Update Lambda Functions to Save to Database

Add MongoDB save to each Lambda function:

```javascript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  // Save to database
  await client.connect();
  const db = client.db('snc');
  await db.collection('contacts').insertOne({
    ...body,
    createdAt: new Date(),
    status: 'new'
  });

  // Then send email via SES
  // ... existing email code
};
```

---

### Result After Phase 4

```
✅ Every form submission saved permanently in database
✅ Never lose a client inquiry even if email fails
✅ Can query and filter all submissions
✅ Foundation ready for admin dashboard
✅ Newsletter subscriber list growing automatically
```

---

## Phase 5 — Launch Admin Dashboard (Month 2–3)

Your site already has `admin.html` — make it fully functional so you can manage everything without touching code.

```
Priority:  MEDIUM
Cost:      $0
Time:      1–2 weeks
```

---

### Admin Features to Build

```
✅ View all contact form submissions
✅ View all quote requests with project details
✅ View all job and internship applications
✅ View and export newsletter subscribers
✅ Manage course enrollments
✅ Update internship open/close status
✅ View volunteer applications
✅ Mark inquiries as read/replied/closed
✅ Basic analytics — how many submissions this week/month
```

---

### Admin Authentication

Protect the admin panel with a login:

```javascript
// Check admin token before showing dashboard
const token = localStorage.getItem('admin_token');
if (!token) {
  window.location.href = 'login.html';
}

// Verify token with your backend
const response = await fetch(`${API_URL}/admin/verify`, {
  headers: { Authorization: `Bearer ${token}` }
});

if (!response.ok) {
  window.location.href = 'login.html';
}
```

---

### Result After Phase 5

```
✅ Full visibility into all client inquiries
✅ Manage everything from one dashboard
✅ No need to check multiple email inboxes
✅ Track status of every inquiry
✅ Export data when needed
✅ Update site content without touching code
```

---

## Phase 6 — SEO and Analytics (Month 3)

Get found on Google so clients in South Sudan and beyond can discover you organically.

```
Priority:  MEDIUM
Cost:      $0
Time:      2–3 days
```

---

### Step 1 — Google Search Console

1. Go to **search.google.com/search-console**
2. Click **Add property**
3. Enter `sleeknexuscreative.com`
4. Verify ownership via DNS record in Route 53
5. Submit your sitemap:
   ```
   https://sleeknexuscreative.com/sitemap.xml
   ```
6. Google will start indexing your pages within a few days

---

### Step 2 — Google Analytics

Your `index.html` already has the GA script with a placeholder ID. Replace it:

1. Go to **analytics.google.com**
2. Create a new property for `sleeknexuscreative.com`
3. Copy your Measurement ID e.g. `G-ABC123XYZ`
4. Replace `G-XXXXXXXXXX` in all your HTML files:

```bash
# Replace placeholder with real ID in all HTML files
# Do this manually or with a find and replace in your editor
G-XXXXXXXXXX  →  G-ABC123XYZ
```

---

### Step 3 — Google Business Profile

This makes your business appear on Google Maps and local searches.

1. Go to **business.google.com**
2. Click **Manage now**
3. Enter:
   ```
   Business name:    Sleek Nexus Creative
   Category:         Software Company / Web Design
   Location:         Juba, South Sudan
   Phone:            +211 925 277 700
   Website:          https://sleeknexuscreative.com
   ```
4. Verify your business — Google sends a postcard or calls your phone

---

### Step 4 — Meta Descriptions for All Pages

Make sure every page has a unique, descriptive meta tag. Check these files:

```html
<!-- Example for services page -->
<meta name="description" content="Professional web development,
mobile apps, UI/UX design, and IT consulting services in Juba,
South Sudan. Sleek Nexus Creative builds digital products that work.">
```

---

### Step 5 — Page Speed Optimization

Fast pages rank higher on Google. Check your score:

1. Go to **pagespeed.web.dev**
2. Enter `sleeknexuscreative.com`
3. Target score: **90+ on mobile and desktop**

Common fixes:
```
- Compress images using TinyPNG or Squoosh
- Make sure CloudFront caching is enabled
- Minify CSS and JS files
```

---

### Result After Phase 6

```
✅ Website appearing in Google search results
✅ Business showing on Google Maps
✅ Tracking visitor numbers and behaviour
✅ Knowing which pages are most visited
✅ Knowing where visitors come from
✅ Sitemap submitted — all pages indexed
```

---

## Phase 7 — Hosting Business (Month 3–6)

Once your own website is running perfectly start offering hosting to clients. This creates monthly recurring revenue.

```
Priority:  LOW — build this after Phases 1–4 are solid
Cost:      ~$45/month to start
Time:      2–4 weeks
```

---

### Business Model

```
AWS charges you    →  $10/month for a server
You charge client  →  $30/month
Your profit        →  $20/month per client
```

---

### Services to Offer

| Service | Monthly Price |
|---|---|
| Shared Website Hosting | $10–$15/month |
| App Hosting Node.js | $30–$50/month |
| Professional Email Hosting | $5/user/month |
| Domain Registration | $15–$25/year |
| Website Maintenance | $50/month |
| SSL Certificate | $10/year |

---

### Tools You Need

| Tool | Purpose | Cost |
|---|---|---|
| AWS EC2 | Server infrastructure | Free tier then ~$8/month |
| cPanel / WHM | Client control panel | ~$20/month |
| WHMCS | Billing and automation | $15–$25/month |
| Stripe | Payment collection | Free (2.9% per transaction) |

---

### Hosting Plans to Offer

**Starter — $10/month**
```
1 Website
5GB Storage
5 Email Accounts
Free SSL
cPanel Access
```

**Business — $25/month**
```
5 Websites
20GB Storage
20 Email Accounts
Free SSL
Daily Backups
cPanel Access
```

**Professional — $50/month**
```
Unlimited Websites
50GB Storage
Unlimited Email Accounts
Free SSL
Daily Backups
Priority Support
Free Domain
```

---

### Profit as You Grow

```
20 clients  ×  $15/month  =  $300 revenue  -  $80 costs  =  $220 profit
50 clients  ×  $15/month  =  $750 revenue  -  $150 costs =  $600 profit
100 clients ×  $15/month  =  $1,500 revenue - $250 costs =  $1,250 profit
```

---

### Startup Cost

| Item | Cost |
|---|---|
| AWS EC2 first year | $0 free tier |
| cPanel/WHM license | $20/month |
| WHMCS billing | $15–$25/month |
| Domain | $12.99/year |
| **Total to start** | **~$45/month** |

You only need **4–5 paying clients** to cover all startup costs.

---

### Payment Methods to Accept

```
Stripe          →  International credit/debit cards
PayPal          →  International clients
MTN Mobile Money →  South Sudan local clients
Airtel Money    →  South Sudan local clients
Bank Transfer   →  Large enterprise clients
```

---

### Result After Phase 7

```
✅ Recurring monthly revenue from hosting clients
✅ Every web client you build for becomes a hosting client
✅ Passive income that grows as client base grows
✅ All managed from your AWS account
✅ Professional billing and invoicing automated
```

---

## Full Roadmap Summary

```
WEEK 1 — Get Online
├── Buy domain on name.com            $12.99
├── Host website on AWS S3            Free tier
├── Connect CloudFront HTTPS          Free tier
├── Connect domain via Route 53       $0.50/month
└── Set up team emails on Zoho Mail   Free

WEEK 2 — Make Forms Work
├── Set up Amazon SES                 Free
├── Create Lambda functions           Free forever
├── Create API Gateway routes         Free forever
├── Connect all contact forms         Free
└── Test every form end to end        Free

WEEK 3–4 — Complete the Site
├── Add real projects to portfolio
├── Write 3 case studies
├── Add real client testimonials
└── Complete all stub pages

MONTH 2 — Add Database
├── Connect MongoDB Atlas             Free forever
├── Store all form submissions
├── Build functional admin dashboard
└── Protect admin with login

MONTH 3 — Get Found on Google
├── Submit to Google Search Console   Free
├── Set up Google Analytics           Free
├── Add Google Business Profile       Free
└── Optimize page speed               Free

MONTH 3–6 — Launch Hosting Business
├── Set up EC2 with cPanel            ~$20/month
├── Install WHMCS billing             ~$15/month
├── Create hosting plans page
├── Integrate Stripe payments
└── Get first 5 paying clients
```

---

## Cost Summary

### Year 1

| Item | Cost |
|---|---|
| Domain `sleeknexuscreative.com` | $12.99/year |
| AWS S3 + CloudFront | Free tier |
| AWS Lambda + API Gateway + SES | Free forever |
| AWS Route 53 | $6/year ($0.50/month) |
| SSL Certificate | Free forever |
| Zoho Mail (5 users) | Free |
| MongoDB Atlas | Free forever |
| **Total Year 1** | **~$19/year (~$1.58/month)** |

### Year 2 and Beyond

| Item | Cost |
|---|---|
| Domain renewal | $12.99/year |
| AWS S3 + CloudFront after free tier | ~$0.60/year |
| AWS Route 53 | $6/year |
| EC2 for backend after free tier | ~$96–$120/year |
| Lambda + SES + API Gateway | Free forever |
| Zoho Mail (5 users) | Free |
| MongoDB Atlas | Free forever |
| **Total Year 2+** | **~$120–$140/year (~$10–$12/month)** |

---

## Honest Advice

**Start with Phase 1 today.** The most important thing right now is:

```
1. Your website is live at sleeknexuscreative.com
2. Clients in South Sudan can find you online
3. When someone fills a form you receive the message
4. You have professional emails for every team member
```

Everything else — the admin dashboard, the hosting business,
the mobile app, the desktop app — all comes after you have
a solid, live, professional web presence.

A website that is live and working is worth more than
a perfect website that no one can visit yet.

---

## Quick Reference Links

| Resource | URL |
|---|---|
| AWS Console | console.aws.amazon.com |
| name.com domain purchase | name.com |
| Zoho Mail signup | zoho.com/mail |
| MongoDB Atlas | mongodb.com/atlas |
| Google Search Console | search.google.com/search-console |
| Google Analytics | analytics.google.com |
| Google Business Profile | business.google.com |
| PageSpeed Insights | pagespeed.web.dev |
| WHMCS billing | whmcs.com |
| Stripe payments | stripe.com |
| GitHub repository | github.com/solomon-211/Sleek_Nexus_Creative |

---

*Document prepared for Sleek Nexus Creative — Juba, South Sudan*
*© 2024 Sleek Nexus Creative. All rights reserved.*
