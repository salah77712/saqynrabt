## Description
<!-- Briefly describe what this PR changes -->

## Design Compliance Checklist
- [ ] All components use `rounded-xl` (40px) and `rounded-full` for pills/buttons.
- [ ] No hardcoded hex colors – CSS variables (`bg-primary`, `text-accent`) are used.
- [ ] `shadow-card` is applied to all cards.
- [ ] SVGs have `aria-hidden="true"` or `aria-label` and use `stroke="currentColor"`.
- [ ] Dark mode (`dark:` variants) is correctly implemented.

## Testing
- [ ] `npm run build` passes locally.
- [ ] No regression in RTL or i18n.
