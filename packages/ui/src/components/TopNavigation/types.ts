import type * as React from "react";

/**
 * 타이틀 정렬.
 * - center: 좌측 메뉴 아이콘 + 중앙 로고 + 우측 아바타.
 * - left: 좌측 로고 + 메뉴 탭(children) + 우측 프로필 버튼(아바타 + 이름).
 *
 * sm 사이즈는 left여도 center 레이아웃으로 렌더링됩니다.
 */
export type TopNavigationVariant = "center" | "left";
export type TopNavigationSize = "sm" | "md";

/** 로그인 사용자의 프로필 정보입니다. */
export interface TopNavigationProfile {
  /** 프로필 이미지 URL입니다. 없으면 기본 아바타(fallback 아이콘)를 보여줍니다. */
  src?: string;
  /** 프로필 이름입니다. md left에서는 아바타 옆에 표시되고, 그 외에는 접근 가능한 이름으로 쓰입니다. */
  name: string;
  /** 프로필 클릭 핸들러입니다. */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
