import { IconMenu } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import { Avatar } from "../Avatar";
import LogoPlayground from "./LogoPlayground";
import {
  avatarButton,
  base,
  leftLayout,
  logo as logoClass,
  menuButton,
  profileButton,
  profileName,
  rightSlotVariants,
  sizeVariants,
  titleSlotVariants,
} from "./TopNavigation.css";
import type { TopNavigationSize, TopNavigationVariant } from "./types";

export interface TopNavigationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /**
   * 타이틀 정렬입니다. sm 사이즈에서는 left여도 center로 렌더링됩니다.
   * @default "center"
   */
  variant?: TopNavigationVariant;
  /**
   * 높이 단계입니다. sm은 56px, md는 64px입니다.
   * @default "sm"
   */
  size?: TopNavigationSize;
  /**
   * TitleSlot에 표시할 로고입니다.
   * @default SOPT playground 로고
   */
  logo?: React.ReactNode;
  /** TitleSlot에서 로고 오른쪽에 표시할 요소입니다. 스타일을 입히지 않으니 모양과 내부 간격은 사용처에서 정합니다. */
  children?: React.ReactNode;
  /**
   * 프로필 노출 여부입니다. 비로그인 상태에서만 `false`를 넘깁니다.
   * `false`여도 같은 너비의 빈 영역이 남아 로고 정렬을 유지합니다.
   * @default true
   */
  profile?: boolean;
  /** 프로필 이미지 URL입니다. 없으면 기본 아바타(fallback 아이콘)를 보여줍니다. */
  profileSrc?: string;
  /** 프로필 이름입니다. md left에서는 아바타 옆에 표시되고, 그 외에는 접근 가능한 이름으로 쓰입니다. */
  profileName?: string;
  /** 프로필 클릭 핸들러입니다. */
  onProfileClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 프로필 버튼이 드롭다운 등을 열 때 열림 상태를 넘깁니다. `aria-expanded`로 전달되고, 생략하면 속성을 붙이지 않습니다. */
  profileExpanded?: boolean;
  /** 좌측 메뉴 아이콘 클릭 핸들러입니다. sm 전체와 md center에서 렌더링되고, md left에는 없습니다. */
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 메뉴 버튼이 내비게이션을 열 때 열림 상태를 넘깁니다. `aria-expanded`로 전달되고, 생략하면 속성을 붙이지 않습니다. */
  menuExpanded?: boolean;
}

const PROFILE_FALLBACK_LABEL = "프로필";

const TopNavigation = React.forwardRef<HTMLElement, TopNavigationProps>(
  (
    {
      variant = "center",
      size = "sm",
      logo,
      children,
      profile = true,
      profileSrc,
      profileName: name,
      onProfileClick,
      profileExpanded,
      onMenuClick,
      menuExpanded,
      className,
      ...rest
    },
    ref,
  ) => {
    // sm은 left여도 center로 정렬
    const layout = size === "md" ? variant : "center";
    const isLeft = layout === "left";
    const avatar = (
      <Avatar
        src={profileSrc}
        size={32}
        type="ghost"
        strokeColor="neutralGhost"
      />
    );

    return (
      <header
        {...rest}
        ref={ref}
        className={clsx(
          base,
          sizeVariants[size],
          isLeft && leftLayout,
          className,
        )}
      >
        {!isLeft && (
          <button
            type="button"
            aria-label="메뉴"
            aria-expanded={menuExpanded}
            className={menuButton}
            onClick={onMenuClick}
          >
            <IconMenu aria-hidden="true" />
          </button>
        )}
        <div className={titleSlotVariants[layout]}>
          <span className={logoClass}>{logo ?? <LogoPlayground />}</span>
          {children}
        </div>
        <div className={rightSlotVariants[layout]}>
          {profile &&
            (isLeft ? (
              <button
                type="button"
                aria-label={name ? undefined : PROFILE_FALLBACK_LABEL}
                aria-expanded={profileExpanded}
                className={profileButton}
                onClick={onProfileClick}
              >
                {avatar}
                <span className={profileName}>{name}</span>
              </button>
            ) : (
              <button
                type="button"
                aria-label={name || PROFILE_FALLBACK_LABEL}
                aria-expanded={profileExpanded}
                className={avatarButton}
                onClick={onProfileClick}
              >
                {avatar}
              </button>
            ))}
        </div>
      </header>
    );
  },
);

TopNavigation.displayName = "TopNavigation";

export { TopNavigation };
