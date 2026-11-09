/**
 * 메뉴 아이템의 레이아웃입니다. (Figma Select / Menu의 Type)
 * - icon: 아이콘 + 텍스트 (단일 선택만)
 * - text: 텍스트 + description, 선택 시 체크 표시 (단일·다중)
 * - userList: 프로필 + 텍스트 + description (단일 선택만)
 * - checkbox: 체크박스 + 텍스트 (다중 선택만)
 */
export type SelectType = "icon" | "text" | "userList" | "checkbox";

export type SelectSingleType = Exclude<SelectType, "checkbox">;
export type SelectMultipleType = Extract<SelectType, "text" | "checkbox">;
