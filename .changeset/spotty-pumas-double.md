---
"@sopt-mds/ui": minor
---

fix the dialog width to the two values the design defines and add a `device` prop to pick between them: `mobile` 303px (default) and `pc` 400px. padding, the title-to-description gap, the description typography, and the checkbox size all derive from the same prop.

the container query that derived those from the dialog's own width is gone, and so is the `--mds-dialog-width` override that apps used to drive it from their breakpoints — set `device` instead. the dialog also no longer shrinks below its width on narrow viewports, since the user-agent `max-width` on `<dialog>` is now cleared.
