import { Slot } from "@radix-ui/react-slot";
import { IconMenu } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import { Avatar } from "../Avatar";
import LogoPlayground from "./LogoPlayground";
import {
  avatarButton,
  base,
  leftLayout,
  logo,
  menu,
  menuButton,
  menuDivider,
  menuItem,
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
  /** TitleSlot에서 로고 오른쪽에 표시할 요소입니다. md left에서만 렌더링됩니다. 메뉴 탭은 `TopNavigation.Menu`로 만들고, 다른 UI를 넣으면 모양과 내부 간격은 사용처에서 정합니다. */
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
  /** 좌측 메뉴 아이콘 클릭 핸들러입니다. sm 전체와 md center에서 렌더링되고, md left에는 없습니다. */
  onMenuClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 메뉴 버튼이 내비게이션을 열 때 열림 상태를 넘깁니다. `aria-expanded`로 전달되고, 생략하면 속성을 붙이지 않습니다. */
  menuExpanded?: boolean;
}

const PROFILE_FALLBACK_LABEL = "프로필";

const TopNavigationRoot = React.forwardRef<HTMLElement, TopNavigationProps>(
  (
    {
      variant = "center",
      size = "sm",
      children,
      profile = true,
      profileSrc,
      profileName: name,
      onProfileClick,
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
          <span className={logo}>
            <LogoPlayground />
          </span>
          {isLeft && children}
        </div>
        <div className={rightSlotVariants[layout]}>
          {profile &&
            (isLeft ? (
              <button
                type="button"
                aria-label={name ? undefined : PROFILE_FALLBACK_LABEL}
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

const TopNavigationMenu = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...rest }, ref) => (
  <nav {...rest} ref={ref} className={clsx(menu, className)} />
));

export interface TopNavigationMenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** true면 자식 요소(Next.js `Link` 등)에 스타일과 속성을 입혀 렌더링합니다. */
  asChild?: boolean;
  /** 현재 페이지의 메뉴입니다. 강조 색과 `aria-current="page"`가 붙습니다. */
  active?: boolean;
}

const TopNavigationMenuItem = React.forwardRef<
  HTMLAnchorElement,
  TopNavigationMenuItemProps
>(({ asChild = false, active = false, className, ...rest }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      {...rest}
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={clsx(menuItem, className)}
    />
  );
});

const TopNavigationMenuDivider = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }, ref) => (
  <span
    aria-hidden="true"
    {...rest}
    ref={ref}
    className={clsx(menuDivider, className)}
  />
));

TopNavigationRoot.displayName = "TopNavigation";
TopNavigationMenu.displayName = "TopNavigation.Menu";
TopNavigationMenuItem.displayName = "TopNavigation.MenuItem";
TopNavigationMenuDivider.displayName = "TopNavigation.MenuDivider";

export const TopNavigation = Object.assign(TopNavigationRoot, {
  Menu: TopNavigationMenu,
  MenuItem: TopNavigationMenuItem,
  MenuDivider: TopNavigationMenuDivider,
});

TopNavigation.displayName = "TopNavigation";
