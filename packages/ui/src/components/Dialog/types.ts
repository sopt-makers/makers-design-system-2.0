/**
 * Dialog.Action의 시각 위계를 결정합니다.
 *
 * 되돌릴 수 없는 동작에는 `danger`를 사용합니다.
 * `secondary`는 Dialog.Cancel 전용이라 노출하지 않습니다.
 */
export type DialogActionVariant = "primary" | "danger";
