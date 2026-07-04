# SAQYN RABT — Component Design System & Storybook

Welcome to the central design system registry for SAQYN RABT.

## 1. Structure
All core UI primitives are defined in [frontend/components/ui/](file:///c:/Users/salah/saqyn-rabt/frontend/components/ui):
- **Button:** Themed action selector handles active scales and load triggers.
- **Card:** Premium container layout wrapper supporting hover transforms and shadow uplifts.
- **Input:** Standardized form fields displaying type validations.
- **ProgressBar:** Accessibility compliance ARIA tracker.
- **Badge:** Status tags matching success/warning/primary states.
- **Toast:** Sliding alerts dismissing after 5 seconds.
- **Skeleton:** Loading skeleton masks.
- **Avatar:** Initials profile wrapper with image load error triggers.

## 2. Tokens & Themes
Custom colors, sizes, and animations are managed in [design-tokens.ts](file:///c:/Users/salah/saqyn-rabt/frontend/lib/design-tokens.ts). Themes adapt dynamically to dark mode variables class toggles.

## 3. Storybook Preview
Storybook configuration settings are housed in [frontend/.storybook/](file:///c:/Users/salah/saqyn-rabt/frontend/.storybook):
Run local development preview using:
```bash
npm run storybook
```
