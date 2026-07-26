---
"@sopt-mds/icons": minor
---

add a `size` prop to every icon so `small` renders 12x12 and `medium` renders 14x14, and export `ICON_SIZES` / `IconSize` / `IconProps`. omitting `size` keeps the original 24x24, and an explicit `width`/`height` still wins over `size`.

this scale is separate from the icon sizes `@sopt-mds/ui` components apply to their own addon slots — the names overlap but the values do not, and inside a component the component's size wins.
