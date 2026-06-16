# Sleek Nexus Creative — Infrastructure & Hosting Guide

A complete reference for hosting, domain setup, email configuration, and building a hosting business on AWS.

---

## Table of Contents

1. [Hosting the Website on AWS S3](#1-hosting-the-website-on-aws-s3)
2. [Buying a Domain](#2-buying-a-domain)
3. [Backend Setup for Contact Forms](#3-backend-setup-for-contact-forms)
4. [AWS Free Tier Duration](#4-aws-free-tier-duration)
5. [Hosting Multiple Websites](#5-hosting-multiple-websites)
6. [Professional Email Setup](#6-professional-email-setup)
7. [Managing Team Email Accounts](#7-managing-team-email-accounts)
8. [Hosting Applications on AWS](#8-hosting-applications-on-aws)
9. [How Many Projects One Domain Can Host](#9-how-many-projects-one-domain-can-host)
10. [Building a Hosting Business](#10-building-a-hosting-business)

---

## 1. Hosting the Website on AWS S3

AWS S3 is used to host static websites (HTML, CSS, JS, images). It is cheap, reliable, and scales automatically.

### Step 1 — Create an S3 Bucket

1. Go to **AWS Console → S3 → Create bucket**
2. Set bucket name e.g. `sleek-nexus-creative`
3. Select region **Africa (Cape Town) af-south-1**
4. Uncheck **Block all public access**
5. Click **Create bucket**

### Step 2 — Upload Your Files

Upload everything inside your `frontend/` folder including all `.html`, `css/`, `js/`, and `images/` folders.

Using AWS CLI:
```bash
aws s3 sync ./frontend s3://your-bucket-name --delete
```

### Step 3 — Enable Static Website Hosting

1. Go to bucket → **Properties → Static website hosting → Edit**
2. Select **Enable**
3. Set **Index document** to `html/index.html`
4. Set **Error document** to `html/404.html`
5. Click **Save changes**

### Step 4 — Set Bucket Policy

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
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### Step 5 — Add CloudFront for HTTPS

1. Go to **CloudFront → Create distribution**
2. Set origin to your S3 bucket website endpoint
3. Enable **Redirect HTTP to HTTPS**
4. Set **Default root object** to `html/index.html`
5. Deploy — takes about 10 minutes

### Monthly Cost

| Service | Cost |
|---|---|
| S3 storage under 1GB | ~$0.02/month |
| S3 requests | ~$0.004 per 10,000 requests |
| CloudFront free tier | First 1TB/month free |
| Route 53 hosted zone | $0.50/month |
| **Total** | **~$0.51/month** |

---

## 2. Buying a Domain

### Recommended Registrars

| Registrar | .com Price | Notes |
|---|---|---|
| **name.com** | $12.99/year | Currently selected |
| **Cloudflare** | $9.15/year | Best value, no markup |
| **Namecheap** | $9–$11/year | Popular and easy |
| **Porkbun** | $9–$10/year | Very cheap |

### Recommended Domain

```
sleeknexuscreative.com  →  $12.99/year  (recommended)
sleeknexuscreative.pro  →  $4.99/year   (not recommended)
```

Always buy `.com` — it is the most trusted and recognized extension worldwide.

### Connect Domain to AWS After Purchase

#### Step 1 — Get Route 53 Nameservers
1. Go to **Route 53 → Hosted zones**
2. Create a hosted zone for `sleeknexuscreative.com`
3. Copy the 4 nameservers:
```
ns-123.awsdns-12.com
ns-456.awsdns-34.net
ns-789.awsdns-56.org
ns-012.awsdns-78.co.uk
```

#### Step 2 — Update Nameservers on name.com
1. Log into **name.com → My Domains**
2. Click on `sleeknexuscreative.com`
3. Go to **Nameservers → Edit**
4. Replace with your 4 Route 53 nameservers
5. Wait 24–48 hours for propagation

#### Step 3 — Add Route 53 DNS Records
```
Type    Name    Value
A       @       CloudFront distribution (Alias)
CNAME   www     your-cloudfront-url.cloudfront.net
```

### Add Free SSL Certificate via ACM

1. Go to **AWS Certificate Manager → us-east-1 region**
2. Click **Request certificate → Request public certificate**
3. Enter both:
   - `sleeknexuscreative.com`
   - `www.sleeknexuscreative.com`
4. Choose **DNS validation**
5. Click **Create records in Route 53**
6. Wait 5 minutes for validation

### Annual Cost Summary

| Item | Annual Cost |
|---|---|
| Domain `sleeknexuscreative.com` | $12.99 |
| AWS Route 53 hosted zone | $6.00 |
| S3 + CloudFront hosting | ~$0.60 after free tier |
| Lambda + SES contact forms | $0.00 forever |
| SSL Certificate ACM | $0.00 forever |
| **Total** | **~$19.59/year** |

---

## 3. Backend Setup for Contact Forms

S3 only hosts static files. For contact forms, newsletter signups, and messages you need a serverless backend.

### Architecture

```
User fills form → API Gateway → Lambda Function → SES (sends email to you)
```

### Step 1 — Set Up Amazon SES

1. Go to **SES → Verified identities → Create identity**
2. Enter `info@sleeknexuscreative.com`
3. Verify via the confirmation email AWS sends

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

### Step 3 — Give Lambda Permission to Use SES

1. Lambda → **Configuration → Permissions → Execution role**
2. **Add permissions → Attach policies**
3. Attach `AmazonSESFullAccess`

### Step 4 — Create API Gateway

1. **API Gateway → Create API → HTTP API**
2. Add integration → Lambda → select `snc-contact-form`
3. Configure route:
   - Method: `POST`
   - Path: `/contact`
4. Copy your API URL:
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com
```

### Step 5 — Enable CORS

```
Access-Control-Allow-Origin:   https://sleeknexuscreative.com
Access-Control-Allow-Methods:  POST, OPTIONS
Access-Control-Allow-Headers:  Content-Type
```

### Step 6 — Update Frontend Form JS

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
      document.getElementById("form-message").textContent = "Message sent! We'll reply within 24 hours.";
      document.getElementById("form-message").style.color = "green";
      e.target.reset();
    }
  } catch (error) {
    document.getElementById("form-message").textContent = "Something went wrong. Please try again.";
    document.getElementById("form-message").style.color = "red";
  }
});
```

### Backend Monthly Cost

| Service | Cost |
|---|---|
| Lambda 1M requests free/month | $0.00 |
| API Gateway 1M requests free/month | $0.00 |
| SES 62,000 emails/month free | $0.00 |
| **Total** | **$0.00/month** |

---

## 4. AWS Free Tier Duration

AWS Free Tier has three types:

### 12-Month Free Tier
Free for 12 months from account creation date:

| Service | Free Allowance |
|---|---|
| S3 | 5GB storage, 20,000 GET, 2,000 PUT requests/month |
| CloudFront | 1TB data transfer, 10M requests/month |
| EC2 | 750 hours/month t2.micro |

### Always Free — Never Expires

| Service | Free Allowance |
|---|---|
| Lambda | 1 million requests/month forever |
| API Gateway | 1 million requests/month forever |
| SES | 62,000 emails/month forever |
| DynamoDB | 25GB storage forever |
| CloudWatch | Basic monitoring forever |

### Your Total Cost After 12 Months

```
S3 + CloudFront   ≈  $0.05/month
Route 53          =  $0.50/month
Domain renewal    =  $1.08/month ($12.99 ÷ 12)
─────────────────────────────────
Total             ≈  $1.63/month  (~$20/year)
```

---

## 5. Hosting Multiple Websites

One AWS account can host unlimited static websites. Each website gets its own S3 bucket.

### Example Setup

```
sleek-nexus-creative     →  sleeknexuscreative.com
my-portfolio             →  portfolio.sleeknexuscreative.com
client-website-1         →  client1.sleeknexuscreative.com
client-website-2         →  client2.sleeknexuscreative.com
academy                  →  academy.sleeknexuscreative.com
```

### Free Tier Shared Across All Sites

| Resource | Free Allowance | 5 Sites Usage |
|---|---|---|
| S3 Storage | 5GB total | 5 × 50MB = 250MB (5%) |
| S3 Requests | 20,000/month | ~5,000 (25%) |
| CloudFront | 1TB/month | Minimal |

### Wildcard SSL Certificate

One certificate covers all subdomains — free forever:
```
*.sleeknexuscreative.com
```

### Cost for 5 Websites

| Item | Cost |
|---|---|
| S3 + CloudFront for 5 sites | $0.00 free tier |
| Lambda + SES for all forms | $0.00 forever |
| Route 53 one hosted zone | $0.50/month |
| Main domain | $1.08/month |
| **Total for 5 sites** | **~$1.58/month** |

---

## 6. Professional Email Setup

### Recommended — Zoho Mail Free Plan

- 5 real inboxes completely free
- 5GB per user
- Web and mobile access
- No ads
- Unlimited email aliases

### Team Email Addresses

```
solomon@sleeknexuscreative.com     →  Founder/CEO
gideon@sleeknexuscreative.com      →  CTO
genesis@sleeknexuscreative.com     →  Lead Developer
agau@sleeknexuscreative.com        →  Marketing Head
daniel@sleeknexuscreative.com      →  Sales Manager
```

### Department Aliases (Free — Unlimited)

```
info@sleeknexuscreative.com        →  delivers to → solomon
support@sleeknexuscreative.com     →  delivers to → genesis
careers@sleeknexuscreative.com     →  delivers to → agau
billing@sleeknexuscreative.com     →  delivers to → daniel
academy@sleeknexuscreative.com     →  delivers to → gideon
noreply@sleeknexuscreative.com     →  delivers to → solomon
```

### Setup Steps

#### Step 1 — Sign Up
1. Go to **zoho.com/mail**
2. Choose **Forever Free Plan**
3. Enter domain `sleeknexuscreative.com`

#### Step 2 — Add DNS Records in Route 53

```
Type    Name    Value                   Priority
MX      @       mx.zoho.com             10
MX      @       mx2.zoho.com            20
MX      @       mx3.zoho.com            50
TXT     @       zoho-verification=xxx
TXT     @       v=spf1 include:zoho.com ~all
CNAME   zmail   business.zoho.com
```

#### Step 3 — Create User Accounts
Go to **Admin Console → User Management → Add User** for each team member.

#### Step 4 — Create Aliases
Go to **Admin Console → User Management → Users → click user → Email Aliases → Add Alias**

### Email Cost Comparison

| Option | Cost | Real Inbox |
|---|---|---|
| Zoho Mail Free | $0/month up to 5 users | Yes |
| Zoho Mail Lite | $1/user/month | Yes |
| Google Workspace | $6/user/month | Yes |
| Amazon WorkMail | $4/user/month | Yes |

### Cost as Team Grows

```
5 people    →  $0/month    (Zoho free)
10 people   →  $10/month   (Zoho paid $1 × 10)
20 people   →  $20/month
```

---

## 7. Managing Team Email Accounts

### When an Employee Leaves — Best Practice

#### Step 1 — Suspend Account Immediately
Blocks login while preserving all emails.

#### Step 2 — Set Up Email Forwarding
```
genesis@sleeknexuscreative.com  →  forwards to →  info@sleeknexuscreative.com
```

#### Step 3 — Export Their Emails
Download all emails as backup for client conversations, contracts, and project files.

#### Step 4 — Delete the Account
Go to **Admin Console → User Management → Users → click user → Delete User**

#### Step 5 — Security Checklist After Someone Leaves

```
✅ Remove GitHub repository access
✅ Change any shared passwords they knew
✅ Remove from AWS IAM if they had access
✅ Revoke any API keys they were using
✅ Remove from shared tools (Slack, Notion, Trello)
✅ Recover any company devices
```

### Admin Capabilities

| Action | Possible |
|---|---|
| Delete employee email | ✅ Yes instantly |
| Suspend without deleting | ✅ Yes |
| Read their emails before deleting | ✅ Yes as admin |
| Forward their emails after leaving | ✅ Yes |
| Reassign email to someone new | ✅ Yes |
| Block from logging in | ✅ Yes immediately |

---

## 8. Hosting Applications on AWS

For Node.js backends, databases, and APIs you need more than S3.

### Option Comparison

| Option | Monthly Cost | Difficulty | Best For |
|---|---|---|---|
| EC2 t2.micro + MongoDB Atlas | $0 free tier 12 months | Medium | Full control |
| Elastic Beanstalk | ~$8–$15/month | Easy | Beginners |
| App Runner | ~$5–$10/month | Easy | Docker apps |
| Lambda + API Gateway | $0 forever | Medium | APIs |

### Recommended Setup for SNC

```
Frontend        →  S3 + CloudFront          (free tier)
Backend API     →  EC2 t2.micro             (free tier 12 months)
Database        →  MongoDB Atlas M0          (free forever 512MB)
Email/Forms     →  Lambda + SES             (free forever)
Domain/DNS      →  name.com + Route 53      ($13/year + $0.50/month)
SSL             →  ACM                      (free forever)
```

### Setting Up EC2 for Node.js

```bash
# Connect to your server
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone your project
git clone https://github.com/solomon-211/Sleek_Nexus_Creative.git
cd Sleek_Nexus_Creative/backend
npm install

# Start the app
pm2 start server.js --name snc-backend
pm2 startup
pm2 save

# Install Nginx
sudo apt install nginx -y
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.sleeknexuscreative.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/snc
JWT_SECRET=your-secret-key
EMAIL_FROM=info@sleeknexuscreative.com
FRONTEND_URL=https://sleeknexuscreative.com
```

### Cost After Free Tier

```
EC2 t3.micro        →  ~$8–$10/month
MongoDB Atlas M0    →  $0 forever
Lambda + SES        →  $0 forever
Route 53            →  $0.50/month
Domain              →  $1.08/month
──────────────────────────────────
Total               →  ~$10–$12/month
```

---

## 9. How Many Projects One Domain Can Host

**Unlimited.** A domain has no limit on subdomains or projects.

### Example Structure

```
sleeknexuscreative.com           →  Main business website
www.sleeknexuscreative.com       →  Same as above
api.sleeknexuscreative.com       →  Backend API (EC2)
academy.sleeknexuscreative.com   →  E-learning platform (S3)
portfolio.sleeknexuscreative.com →  Personal portfolio (S3)
admin.sleeknexuscreative.com     →  Admin dashboard (S3)
blog.sleeknexuscreative.com      →  Blog (S3)
app.sleeknexuscreative.com       →  Web application (EC2)
client1.sleeknexuscreative.com   →  Client project 1 (S3)
client2.sleeknexuscreative.com   →  Client project 2 (S3)
```

### Key Facts

| Question | Answer |
|---|---|
| How many subdomains | Unlimited |
| Extra cost per subdomain | $0 |
| Extra cost per S3 bucket | $0 |
| One SSL cert for all subdomains | Yes — free wildcard cert |
| DNS cost for all subdomains | $0.50/month total |

### Wildcard SSL Certificate

Covers every subdomain with one free certificate:
```
*.sleeknexuscreative.com
```

---

## 10. Building a Hosting Business

Turn your AWS knowledge into a recurring revenue stream by offering hosting services to clients.

### Business Model

```
AWS charges you   →  $10/month for a server
You charge client →  $30/month
Your profit       →  $20/month per client
```

### Services You Can Offer

| Service | Monthly Price to Charge |
|---|---|
| Shared Website Hosting | $5–$15/month |
| VPS Hosting | $20–$100/month |
| App Hosting (Node.js/PHP) | $30–$100/month |
| Email Hosting | $5–$10/user/month |
| Domain Registration | $15–$25/domain/year |
| SSL Certificates | $10–$50/year |
| Website Maintenance | $50/month |

### Required Tools

| Tool | Purpose | Cost |
|---|---|---|
| AWS EC2 | Server infrastructure | Free tier then ~$8/month |
| cPanel/WHM | Client control panel | ~$20/month |
| WHMCS | Billing and automation | $15–$25/month |
| Stripe | Payment collection | Free (2.9% + $0.30/transaction) |

### Hosting Plans to Offer

**Starter — $10/month**
```
1 Website
5GB Storage
10GB Bandwidth
5 Email Accounts
Free SSL
1 Database
cPanel Access
```

**Business — $25/month**
```
5 Websites
20GB Storage
Unlimited Bandwidth
20 Email Accounts
Free SSL
5 Databases
Daily Backups
```

**Professional — $50/month**
```
Unlimited Websites
50GB Storage
Unlimited Bandwidth
Unlimited Email Accounts
Free SSL
Unlimited Databases
Daily Backups
Priority Support
Free Domain
```

### Profit Calculation

```
20 clients × $15/month = $300 revenue
AWS costs              = $80/month
─────────────────────────────────
Profit                 = $220/month

50 clients             = $600/month profit
100 clients            = $1,250/month profit
200 clients            = $2,600/month profit
```

### Startup Costs

| Item | Cost |
|---|---|
| AWS EC2 first year free tier | $0 |
| cPanel/WHM license | $20/month |
| WHMCS billing software | $15–$25/month |
| Domain | $12.99/year |
| SSL for hosting site | $0 |
| **Total to start** | **~$45/month** |

You only need **4–5 paying clients** to cover startup costs.

### Bundle Services for Maximum Revenue

```
Build website       →  One-time $500–$2,000
Host website        →  $15/month recurring
Manage emails       →  $5/user/month recurring
Renew domain        →  $15/year recurring
Maintain website    →  $50/month recurring
```

### Payment Methods to Accept

| Method | Best For |
|---|---|
| Stripe | International cards |
| PayPal | International clients |
| MTN Mobile Money | South Sudan local clients |
| Airtel Money | South Sudan local clients |
| Bank Transfer | Large enterprise clients |

---

## Full Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                 sleeknexuscreative.com                      │
├─────────────────────────────────────────────────────────────┤
│  DOMAIN          name.com              $12.99/year          │
│  DNS             AWS Route 53          $0.50/month          │
│  SSL             AWS ACM               Free forever         │
├─────────────────────────────────────────────────────────────┤
│  FRONTEND        AWS S3 + CloudFront   Free tier / ~$0.05   │
│  BACKEND API     AWS EC2 t2.micro      Free tier / ~$8–10   │
│  DATABASE        MongoDB Atlas M0      Free forever         │
│  CONTACT FORMS   Lambda + API Gateway  Free forever         │
│  EMAIL SENDING   AWS SES               Free forever         │
├─────────────────────────────────────────────────────────────┤
│  TEAM EMAIL      Zoho Mail             Free up to 5 users   │
│                                        $1/user after that   │
├─────────────────────────────────────────────────────────────┤
│  TOTAL YEAR 1    ~$19/year + ~$6/month                      │
│  TOTAL YEAR 2+   ~$20/year + ~$10–12/month                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Reference — Useful Links

| Service | URL |
|---|---|
| AWS Console | console.aws.amazon.com |
| name.com domain purchase | name.com |
| Zoho Mail | zoho.com/mail |
| MongoDB Atlas | mongodb.com/atlas |
| WHMCS billing | whmcs.com |
| Stripe payments | stripe.com |
| Cloudflare | cloudflare.com |
| GitHub repository | github.com/solomon-211/Sleek_Nexus_Creative |

---

*Document prepared for Sleek Nexus Creative — Juba, South Sudan*  
*© 2024 Sleek Nexus Creative. All rights reserved.*
