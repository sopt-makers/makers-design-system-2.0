---
"@sopt-mds/ui": minor
---

add the `Select` component. compose `Select` > `Select.Trigger` + `Select.Menu` > `Select.Item`, and pick the item layout with `type` (`icon`, `text`, `userList`, `checkbox`). supports both controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) usage with `string` values, and `multiple` for `text`/`checkbox`. the menu flips above the trigger when there is no room below, and `Select.Trigger asChild` renders a custom trigger.
