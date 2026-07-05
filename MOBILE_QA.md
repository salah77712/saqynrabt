# Mobile QA Checklist

## Header & Navigation
- [x] Header fits without horizontal scrolling (max-width containers, responsive padding)
- [x] Hamburger menu fully accessible (aria-expanded, aria-controls, keyboard navigable)
- [x] Hamburger menu slides in from left with backdrop blur
- [x] Logo lockup shows only "SAQYN" on mobile (compact branding)
- [x] EN/AR language switcher accessible inside hamburger menu

## Bottom Navigation Bar
- [x] Bottom navigation bar present on screens < 768px (md:hidden)
- [x] 5 items: Home, Automation, Chat, Team, Settings
- [x] Active state with indicator dot above icon
- [x] Safe area inset padding for iPhone home indicator (padding-bottom: env(safe-area-inset-bottom))

## Touch Targets (Apple HIG)
- [x] All interactive elements have `min-height: 44px` and `min-width: 44px`
- [x] Consistent `gap-3` or `gap-4` spacing to prevent accidental touches
- [x] Active state feedback: `active:scale-95` or `active:scale-[0.98]`

## Page Layouts
- [x] All pages readable without zoom (responsive font sizes, clamp, text-xs on mobile)
- [x] Dashboard overview: metrics stack vertically on mobile, side-by-side on desktop
- [x] Automation page: request queue renders as card list on mobile, table on desktop
- [x] Chat page: full-screen chat, knowledge gaps in collapsible bottom sheet on mobile
- [x] Documents page: upload area reduced on mobile, single-column grid
- [x] Team page: table transforms to card list on mobile with large action buttons
- [x] Settings page: tabs replaced with select dropdown on mobile

## Pull-to-Refresh
- [x] Pull-to-refresh implemented on Chat and Automation pages
- [x] Visual spinner and "Refreshing..." text shown during refresh
- [x] "Pull to refresh" / "Release to refresh" hint text

## Touch Gestures
- [x] Swipe gestures on sidebar (swipe right to open, swipe left to close)
- [x] Long press on chat messages copies text to clipboard (500ms)
- [x] Double tap on automation queue items assigns to default department (300ms)

## Safe Area Insets
- [x] `env(safe-area-inset-top)` applied to header elements
- [x] `env(safe-area-inset-bottom)` applied to bottom navigation bar
- [x] Dashboard content area avoids bottom nav overlap

## Accessibility
- [x] aria-label on bottom nav items
- [x] aria-expanded and aria-controls on hamburger menu
- [x] aria-label on close buttons
- [x] Focus-visible replaced with active states on mobile
- [x] Screen reader friendly icon-only buttons

## Performance
- [x] Touch scrolling enabled with `WebkitOverflowScrolling: 'touch'`
- [x] Reduced motion support via prefers-reduced-motion hook (existing)
- [x] Content area properly scrollable with overflow-y-auto

## Responsive Images & Media
- [x] Font sizes use clamp pattern (responsive text-xs to text-sm/md)
- [x] All grid layouts adapt: grid-cols-1 on mobile, multi-column on desktop

## Keyboard & Mobile
- [x] Search accessible via dedicated icon (no Ctrl+K requirement on mobile)
- [x] All form inputs have 44px minimum height
