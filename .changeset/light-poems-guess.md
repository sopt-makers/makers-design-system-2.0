---
"@sopt-mds/ui": minor
---

dim the text field value when the input is disabled — `default` uses fg.neutral.ghostDisabled and `bold` uses fg.neutral.defaultDisabled. adds a `--mds-text-field-disabled-color` variable for overriding it; the value used to stay at full-strength fg.neutral.bold because `-webkit-text-fill-color` pinned it there.
