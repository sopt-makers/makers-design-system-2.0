---
"@sopt-mds/ui": minor
---

add the `SnackBar` component. wrap the app root in `SnackBarProvider` once and call `useSnackBar().show({ message, variant, action, duration })` to display one. snack bars show one at a time and queue in order, each appearing right after the previous one finishes exiting. messages clamp to two lines, with a dev-only console warning when they overflow.
