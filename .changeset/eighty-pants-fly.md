---
"@sopt-mds/ui": minor
---

add the `TopNavigation` component for web. pick `size` (`sm` / `md`) and `variant` (`center` / `left`); `sm` always renders the center layout. on `md` + `left`, put menu tabs next to the logo with `TopNavigation.Menu`, `TopNavigation.MenuItem` (`asChild` for router links, `active` sets `aria-current="page"`) and `TopNavigation.MenuDivider`, or pass any other UI as `children`. the profile shows an avatar by default (`profile={false}` for signed-out users), with the name next to it on `md` + `left`. `menuExpanded` exposes the menu button's open state as `aria-expanded`.
