# SAQYN RABT — Global Industry Support & Bias Corrections

## 1. Problem Assessment
Previously, the model output default states assumed client industries were limited to hospitality/hotels. This created a biased user experience for clinics, stores, and service desks.

## 2. Refactoring Actions Completed
- Updated [page.tsx](file:///c:/Users/salah/saqyn-rabt/frontend/app/page.tsx) to default the state to a generic business layout.
- Created [industryCopy.ts](file:///c:/Users/salah/saqyn-rabt/frontend/lib/industryCopy.ts) providing unique copies for Healthcare, Law, Hospitality, and Retail.
- Implemented [IndustrySwitcher.tsx](file:///c:/Users/salah/saqyn-rabt/frontend/components/IndustrySwitcher.tsx) component to dynamically switch headlines.
