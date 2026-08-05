/**
 * Dialog.Action의 시각 위계를 결정합니다.
 *
 * 되돌릴 수 없는 동작에는 `danger`를 사용합니다.
 * `secondary`는 Dialog.Cancel 전용이라 노출하지 않습니다.
 */
export type DialogActionVariant = "primary" | "danger";

/**
 * Dialog의 폭과 그에 딸린 내부 치수를 결정합니다. (Figma의 Device 축)
 *
 * 폭은 device마다 고정이며 뷰포트나 컨테이너 폭에 반응하지 않습니다.
 * 화면 크기에 따라 다른 폭을 쓰려면 앱이 직접 device를 골라 넘깁니다.
 */
export type DialogDevice = "mobile" | "pc";
