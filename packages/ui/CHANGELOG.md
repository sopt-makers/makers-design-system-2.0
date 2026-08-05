# @sopt-mds/ui

## 1.10.0

### Minor Changes

- 5dc3703: fix the dialog width to the two values the design defines and add a `device` prop to pick between them: `mobile` 303px (default) and `pc` 400px. padding, the title-to-description gap, the description typography, and the checkbox size all derive from the same prop.

  the container query that derived those from the dialog's own width is gone, and so is the `--mds-dialog-width` override that apps used to drive it from their breakpoints — set `device` instead. the dialog also no longer shrinks below its width on narrow viewports, since the user-agent `max-width` on `<dialog>` is now cleared.

## 1.9.0

### Minor Changes

- ab95a1a: dim the text field value when the input is disabled — `default` uses fg.neutral.ghostDisabled and `bold` uses fg.neutral.defaultDisabled. adds a `--mds-text-field-disabled-color` variable for overriding it; the value used to stay at full-strength fg.neutral.bold because `-webkit-text-fill-color` pinned it there.

### Patch Changes

- ab95a1a: set the callout gap between the body text and the action button to the s16 spacing token, replacing the raw 18px value.
- ab95a1a: drop the text button underline on hover and press, along with the transparent border that reserved its space. the rendered height shrinks by 1px in both sizes.
- ab95a1a: adjust action button metrics to the reviewed design: small height 36px to 38px, and horizontal padding small 14px to 12px, medium 20px to 16px, large 24px to 20px.
- Updated dependencies [ab95a1a]
  - @sopt-mds/icons@0.2.0

## 1.8.0

### Minor Changes

- 1170bc8: adjust UI layout and spacing based on design QA

## 1.7.0

### Minor Changes

- f966640: add type prop to Chip component

## 1.6.0

### Minor Changes

- 60ef994: add text area component

## 1.5.1

### Patch Changes

- 94dc217: derive floating button label from rendered content so empty, whitespace-only, and array children fall back to the icon-only form
- 94dc217: make dialog action buttons always fill the actions row regardless of button count and container width

## 1.5.0

### Minor Changes

- c03db71: add Dialog compound component built on the native dialog element

## 1.4.0

### Minor Changes

- 3db2ca5: Add TextField component.

## 1.3.0

### Minor Changes

- ee4a51c: expose checkbox dimensions as --mds-checkbox-\* variables so ancestors can inject size

## 1.2.0

### Minor Changes

- 80b21d4: Rename SearchField `variant="ghost"` to `variant="bold"` and change the caret color from brand orange to `fg.neutral.bold`.

## 1.1.1

### Patch Changes

- 945dd5c: fix toggle story missing accessible name

## 1.1.0

### Minor Changes

- 0620cf4: Add SearchField component.

## 1.0.14

### Patch Changes

- 92c7bdf: fix chip mobile sticky hover problem

## 1.0.13

### Patch Changes

- Updated dependencies [e1b2461]
  - @sopt-mds/icons@0.1.0

## 1.0.12

### Patch Changes

- Updated dependencies [6af37d7]
  - @sopt-mds/icons@0.0.2

## 1.0.11

### Patch Changes

- Updated dependencies [6c23137]
  - @sopt-mds/design-tokens@1.0.7

## 1.0.10

### Patch Changes

- 2e621f7: Export bundled component styles as index.css.

## 1.0.9

### Patch Changes

- Updated dependencies [6d78418]
  - @sopt-mds/design-tokens@1.0.6

## 1.0.8

### Patch Changes

- bef0ec2: add avatar component

## 1.0.7

### Patch Changes

- f884af9: add toggle component

## 1.0.6

### Patch Changes

- 1a8f276: register radio component (Radio, RadioGroup) and add fg.neutral.ghostDisabled token
- Updated dependencies [1a8f276]
  - @sopt-mds/design-tokens@1.0.5

## 1.0.5

### Patch Changes

- 3caf2a1: register checkbox component and add fg.neutral.ghostDisabled token
- Updated dependencies [3caf2a1]
  - @sopt-mds/design-tokens@1.0.4

## 1.0.4

### Patch Changes

- 0b287ce: register action button component
- 0b287ce: register floating button component
- 0b287ce: register reaction button component
- 0b287ce: register text button component

## 1.0.3

### Patch Changes

- c1aca84: register chip component

## 1.0.2

### Patch Changes

- 99b1018: register tag component

## 1.0.1

### Patch Changes

- Updated dependencies [4dbada6]
  - @sopt-mds/design-tokens@1.0.3

## 1.0.0

### Major Changes

- 9c6987d: sopt-mds/ui vite rolldown build

### Patch Changes

- Updated dependencies [9c6987d]
  - @sopt-mds/design-tokens@1.0.2

## 0.0.2

### Patch Changes

- Updated dependencies [d326abf]
  - @sopt-mds/design-tokens@1.0.1

## 0.0.1

### Patch Changes

- Updated dependencies [215cba9]
  - @sopt-mds/design-tokens@1.0.0
