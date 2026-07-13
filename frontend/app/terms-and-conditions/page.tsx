import LegalPage from '../../components/LegalPage';

const content = `# Terms of Service

**Last Updated:** July 7, 2026

---

## 1. Acceptance of Terms

By creating an account, clicking "Sign Up," accessing, or using the SAQYN RABT platform ("**Service**"), you ("**Subscriber**," "**Client**," or "**You**") agree to be bound by these Terms of Service ("**Terms**"), our Privacy Policy, and our Data Processing Agreement (DPA).

**If you do not agree to these terms, you must immediately cease use of the service.**

These Terms constitute a legally binding agreement between you and SAQYN RABT. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.

---

## 2. Description of Service

SAQYN RABT provides an AI-powered business automation platform consisting of two distinct product lines:

### 2.1 Business Automation
An intelligent system designed to handle customer requests, phone calls, bookings, and complaints through AI-powered voice and chat interfaces.

### 2.2 Internal Company Chatbot (RAG)
A Retrieval-Augmented Generation (RAG) based query engine trained on documents you upload. This AI assistant answers internal queries based on your company policies, SOPs, HR documents, and other uploaded materials.

**AS-IS and AS-AVAILABLE:** The Service is provided on an "AS IS" and "AS AVAILABLE" basis. SAQYN RABT does not warrant that the Service will be uninterrupted, error-free, or free of harmful components. AI responses may not be fully accurate and the Client acknowledges the non-deterministic nature of AI-generated content.

---

## 3. User Obligations and Restrictions

### 3.1 Prohibited Conduct

You are strictly prohibited from:
- **Illegal Content:** Uploading illegal content, including content that violates Qatari public order or morality.
- **Reverse Engineering:** Attempting to reverse engineer, decompile, or derive the source code of the platform.
- **Data Scraping:** Scraping, crawling, or extracting data without our express written permission.
- **Fraud and Money Laundering:** Using the platform to commit fraud or finance illegal activities.
- **Prompt Injection:** Attempting to override or manipulate the AI's system instructions. **Any attempt at prompt injection is a material violation resulting in immediate suspension.**

### 3.2 Client Responsibility

- The Client is **solely responsible** for the accuracy, legality, and completeness of all documents uploaded.
- SAQYN RABT is **not liable** for decisions made based on AI-generated answers derived from uploaded content.

---

## 4. Fees, Setup Fees, and Refunds

### 4.1 Setup Fees
A one-time setup fee is charged upon onboarding. This covers data ingestion, configuration, AI prompt engineering, phone number procurement, and branding setup.

**Setup fees are non-refundable after the initial onboarding call.**

### 4.2 Monthly Subscriptions
- Subscriptions are billed **monthly in advance**.
- Payment is due at the start of each billing cycle.
- All fees are quoted in **Qatari Riyal (QAR)** unless otherwise specified.

### 4.3 Refund Policy
> **NO REFUNDS WILL BE ISSUED FOR PARTIAL MONTHS OF SERVICE OR UNUSED TIME.**

---

## 5. Limitation of Liability

> **SAQYN RABT provides an AI-generated knowledge retrieval service. AI models are non-deterministic and may occasionally produce inaccurate or misleading results.**
>
> **The Client acknowledges that they are using the service at their own risk and must verify critical business decisions against original documentation before acting on AI-generated output.**
>
> **IN NO EVENT SHALL SAQYN RABT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.**
>
> **SAQYN RABT'S TOTAL LIABILITY FOR ANY CLAIMS SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU DURING THE TWELVE MONTHS PRECEDING THE CLAIM.**

---

## 6. Term and Termination

You may cancel your subscription at any time through your dashboard settings. Service remains active until the end of the current billing period. SAQYN RABT reserves the right to **suspend or terminate your account immediately** for violation of these Terms.

---

## 7. Governing Law

**These Terms shall be governed by the laws of the State of Qatar.** All disputes shall be resolved exclusively in the competent courts of Doha, Qatar.

---

## 8. Contact

For questions about these Terms, please contact us at **saqynrabt@gmail.com**.`;

export default function TermsPage() {
  return <LegalPage title="Terms of Service" content={content} />;
}
