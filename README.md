# 🚀 NoticeSync Pro

**NoticeSync Pro** is a unified, automated tax notice tracking system designed specifically for modern Chartered Accountants and tax professionals. Centralize, monitor, and download notices from both Income Tax and GST portals in a single, high-performance dashboard.

Built by **P.S. Jajodia & Associates (CA Pranay S. Jajodia)**.

---

## ✨ Key Features

- **🛡️ Secure Credential Management**: AES-256 encryption for portal passwords.
- **🤖 Automated Notice Fetching**: Playwright-powered bots log in and fetch notices from IT & GST portals.
- **📊 Unified Dashboard**: Track multiple clients, status of syncs, and notice deadlines.
- **🔔 Proactive Alerts**: Email notifications for upcoming response due dates.
- **💳 SaaS-Ready Monetization**: Credit-based sync system with Razorpay integration.
- **🌙 Premium UI**: Modern glassmorphic interface with Dark/Light mode support.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TailwindCSS, Framer Motion, Lucide Icons.
- **Backend**: Next.js API Routes, NextAuth.js (Authentication).
- **Database**: MongoDB (Mongoose ODM).
- **Automation**: Playwright (Headless Chromium).
- **Payments**: Razorpay Gateway.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/notice-sync-pro.git
cd notice-sync-pro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_gmail
EMAIL_PASS=your_gmail_app_password
```

### 4. Run Development Server
```bash
npm run dev
```

---

## ⚖️ License
Internal Use & Commercial SaaS - Property of **P.S. Jajodia & Associates**.
