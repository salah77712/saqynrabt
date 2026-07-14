import LegalPage from '../../components/LegalPage';

const content = `# Privacy Policy

**Last Updated:** July 7, 2026

---

## 1. Introduction and Scope

SAQYN RABT ("**Company**," "**We**," "**Us**," or "**Our**") is a company registered in the **State of Qatar** and operates as the data controller for the personal information collected through our platform. We are committed to protecting your privacy and ensuring transparency in how we handle your data.

**This Privacy Policy is prepared in compliance with Law No. 13 of 2016 on the Protection of Personal Data and its executive regulations, as well as the Qatari Civil Code (Law No. 22 of 2004).** For international clients, this policy also respects the principles of the EU General Data Protection Regulation (GDPR) where applicable.

This Privacy Policy applies to:
- Our public website at **saqynrabt.com**
- Our proprietary SaaS dashboard at **/dashboard**
- All related services, tools, and communications

**This policy does not apply to the practices of third parties that we do not own or control.**

If you have any questions about this policy, you may contact us at **saqynrabt@gmail.com**.

---

## 2. Information We Collect

### 2.1 Information You Provide

When you create an account, use our services, or communicate with us, we collect:
- **Account Information:** Full name, email address, phone number, company name, physical address, and employee names.
- **Business Content:** Company policies, standard operating procedures (SOPs), HR documents, and uploaded PDF files that you choose to ingest into our RAG system.
- **Payment Information:** We process payments through Stripe. We do not store full credit card numbers.

### 2.2 Automatically Collected Information

When you visit our website or use our dashboard, we automatically collect:
- IP address
- Browser type and version
- Device type and operating system
- Usage data (pages visited, time spent on each page, feature interactions)

### 2.3 Chat Data

We collect the full text of messages sent to our AI-powered chat interface, as well as the AI-generated responses. This data is used to improve the accuracy and relevance of our RAG pipeline.

---

## 3. Legal Basis for Processing

Under **Law No. 13 of 2016**, processing of personal data must have a lawful basis. We process your data under the following bases:
- **Contractual Necessity:** To provide, maintain, and deliver the services you have subscribed to.
- **Legitimate Interest:** To improve our platform, monitor usage, detect security threats, and generate aggregate analytics.
- **Legal Obligation:** To comply with applicable Qatari laws.
- **Consent:** Where required for marketing communications or processing of special categories of data.

---

## 4. Data Retention and Deletion

| Data Category | Retention Period |
|---|---|
| **Documents / PDFs** | Duration of your subscription plus 30 days |
| **Chat / Usage Logs** | Maximum of 3 years |
| **Financial Data** | 7 years to comply with Qatari tax regulations |
| **Access Logs** | 12 months for security auditing |

---

## 5. Data Subject Rights

Under **Law No. 13 of 2016 on the Protection of Personal Data**, you have the following rights:
- **Right to Access:** Request a copy of the personal data we hold about you.
- **Right to Rectification:** Request correction of inaccurate or incomplete data.
- **Right to Erasure:** Request deletion of your personal data, subject to legal retention obligations.
- **Right to Restriction of Processing:** Request that we limit the processing of your data.
- **Right to Data Portability:** Request a copy of your data in a structured, machine-readable format.
- **Right to Object:** Object to the processing of your data for direct marketing purposes.

To exercise any of these rights, contact us at **saqynrabt@gmail.com**.

---

## 6. Contact Information

- **General Inquiries:** saqynrabt@gmail.com
- **Registered Address:** State of Qatar (available upon request)`;

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" content={content} />;
}