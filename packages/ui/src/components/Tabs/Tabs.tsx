import { Slot, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";
import * as React from "react";
import { mergeRefs } from "../../utils/mergeRefs";
import { Tag } from "../Tag";
import { TabsContext, useTabsContext } from "./context";
import {
  divider as dividerStyle,
  list,
  listVariants,
  root,
  tag as tagStyle,
  trigger,
  triggerSizeVariants,
  triggerVariants,
} from "./Tabs.css";
import type { TabsSize, TabsVariant } from "./types";

const isDev = process.env.NODE_ENV !== "production";

export interface TabsRootProps<T extends string = string>
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "defaultValue" | "onChange"
  > {
  /** 선택된 탭의 value입니다. 넘기면 제어 컴포넌트로 동작합니다. */
  value?: T;
  /** 비제어 모드의 초기 선택 value입니다. */
  defaultValue?: T;
  /** 선택이 바뀔 때 호출됩니다. 제어 모드에서는 이 콜백으로 `value`를 갱신해야 선택이 바뀝니다. */
  onValueChange?: (value: T) => void;
  /**
   * 탭의 크기를 결정합니다.
   * @default "large"
   */
  size?: TabsSize;
  /**
   * `fill`: Fixed Tabs + Fill Tab. 탭이 영역 너비를 균등 분할합니다.
   * `hug`: Scrollable Tabs + Hug Tab. 탭이 내용 폭을 갖고, 넘치면 가로 스크롤됩니다.
   * @default "fill"
   */
  variant?: TabsVariant;
}

/**
 * 관련된 콘텐츠를 분류해 그중 하나를 고르는 탭입니다. 단일 선택만 가능합니다.
 *
 * - 화면에 탭이 모두 노출되면 `variant="fill"`(Fixed), 탭이 많아지면 `variant="hug"`(Scrollable)를 씁니다.
 * - 탭은 2개 이상, 최대 5개를 권장합니다.
 * - 탭 패널(Content)은 제공하지 않습니다. 선택 value에 따라 본문을 직접 렌더하세요.
 */
const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      size = "large",
      variant = "fill",
      className,
      ...rest
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : uncontrolledValue;

    const select = React.useCallback(
      (next: string) => {
        if (next === value) return;
        if (!isControlled) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [value, isControlled, onValueChange],
    );

    const contextValue = React.useMemo(
      () => ({ value, select, size, variant }),
      [value, select, size, variant],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div {...rest} ref={ref} className={clsx(root, className)} />
      </TabsContext.Provider>
    );
  },
);

/** 이 tablist에 직접 속한 탭만 모은다. 중첩된 Tabs의 탭은 제외한다. */
function getTabs(listNode: HTMLElement): HTMLElement[] {
  return Array.from(
    listNode.querySelectorAll<HTMLElement>('[role="tab"]'),
  ).filter((tab) => tab.closest('[role="tablist"]') === listNode);
}

function isEnabledTab(tab: HTMLElement) {
  return (
    !tab.hasAttribute("disabled") &&
    tab.getAttribute("aria-disabled") !== "true"
  );
}

/**
 * 잘린 탭이 보이도록 목록의 scrollLeft만 조정한다. 이미 보이면 움직이지 않는다.
 * scrollIntoView는 페이지까지 세로로 스크롤하므로 쓰지 않는다.
 */
function scrollTabIntoView(
  listNode: HTMLElement,
  tab: HTMLElement,
  behavior: ScrollBehavior,
) {
  const listRect = listNode.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const delta =
    tabRect.left < listRect.left
      ? tabRect.left - listRect.left
      : Math.max(tabRect.right - listRect.right, 0);
  if (delta !== 0) {
    listNode.scrollTo({ left: listNode.scrollLeft + delta, behavior });
  }
}

export interface TabsListProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * 목록 하단 전체 폭에 divider를 그립니다. 선택 인디케이터가 그 위에 겹칩니다.
   * @default true
   */
  divider?: boolean;
}

/**
 * 탭 묶음입니다. ←/→로 이동(끝에서 반대편으로 순환), Home/End로 처음/끝 탭으로 이동하며,
 * 이동한 탭이 바로 선택됩니다. disabled 탭은 건너뜁니다.
 */
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ divider = true, className, onKeyDown, ...rest }, ref) => {
    const { value, variant } = useTabsContext("Tabs.List");
    const listRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = React.useMemo(() => mergeRefs(ref, listRef), [ref]);
    const mountedRef = React.useRef(false);

    // hug는 가로 스크롤되므로 선택 탭을 보이게 한다. 마운트 시에는 애니메이션 없이 즉시 이동한다.
    // biome-ignore lint/correctness/useExhaustiveDependencies: value는 선택이 바뀔 때 다시 실행하기 위한 트리거다.
    React.useEffect(() => {
      const listNode = listRef.current;
      const selectedTab =
        listNode &&
        getTabs(listNode).find(
          (tab) => tab.getAttribute("aria-selected") === "true",
        );
      if (variant === "hug" && listNode && selectedTab) {
        scrollTabIntoView(
          listNode,
          selectedTab,
          mountedRef.current ? "auto" : "instant",
        );
      }
      mountedRef.current = true;
    }, [value, variant]);

    // roving tabindex: Tab 키로 들어오면 선택된 탭(없거나 disabled면 첫 활성 탭)에 포커스된다.
    // 선택된 탭이 없는 경우까지 목록 단위로 판단해야 해서, tabIndex는 Trigger가 아닌 여기서만 정한다.
    React.useLayoutEffect(() => {
      const listNode = listRef.current;
      if (listNode == null) return;

      const tabs = getTabs(listNode);
      const enabledTabs = tabs.filter(isEnabledTab);
      const entry =
        enabledTabs.find(
          (tab) => tab.getAttribute("aria-selected") === "true",
        ) ?? enabledTabs[0];
      for (const tab of tabs) {
        tab.tabIndex = tab === entry ? 0 : -1;
      }
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      const listNode = listRef.current;
      if (event.defaultPrevented || listNode == null) return;

      const current = (event.target as HTMLElement).closest<HTMLElement>(
        '[role="tab"]',
      );
      const tabs = getTabs(listNode).filter(isEnabledTab);
      const index = current == null ? -1 : tabs.indexOf(current);
      if (index === -1) return;

      let next: HTMLElement | undefined;
      switch (event.key) {
        case "ArrowRight":
          next = tabs[(index + 1) % tabs.length];
          break;
        case "ArrowLeft":
          next = tabs[(index - 1 + tabs.length) % tabs.length];
          break;
        case "Home":
          next = tabs[0];
          break;
        case "End":
          next = tabs[tabs.length - 1];
          break;
        default:
          return;
      }

      event.preventDefault();
      // 포커스를 받은 Trigger가 스스로 선택된다(automatic activation).
      // asChild 링크 탭에서 onValueChange로 바로 라우팅하면 화살표 이동마다 페이지가 이동한다.
      next?.focus();
    };

    return (
      <div
        {...rest}
        ref={mergedRef}
        role="tablist"
        aria-orientation="horizontal"
        className={clsx(
          list,
          listVariants[variant],
          divider && dividerStyle,
          className,
        )}
        onKeyDown={handleKeyDown}
      />
    );
  },
);

export interface TabsTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "value" | "children"> {
  /** 이 탭을 식별하는 값입니다. Tabs의 `value`와 비교해 선택 여부를 정합니다. */
  value: string;
  /**
   * 탭 라벨입니다. 문장이 아닌 단어로만 씁니다.
   * `asChild`면 라벨을 담은 요소(예: Link)를 넘깁니다.
   */
  children: string | React.ReactElement;
  /** 라벨 뒤에 붙는 Tag 텍스트입니다. Tag는 pill / primary / small / subtle로 고정됩니다. */
  tag?: string;
  /** 탭을 비활성화합니다. 키보드 이동에서 건너뜁니다. */
  disabled?: boolean;
  /**
   * true면 Trigger를 자식 요소로 렌더링합니다. 예: `<Tabs.Trigger asChild><a href="...">홈</a></Tabs.Trigger>`
   * @default false
   */
  asChild?: boolean;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      value,
      children,
      tag,
      disabled = false,
      asChild = false,
      className,
      onClick,
      onClickCapture,
      onFocus,
      ...rest
    },
    ref,
  ) => {
    const context = useTabsContext("Tabs.Trigger");
    const selected = context.value === value;
    React.useEffect(() => {
      if (isDev && !asChild && typeof children !== "string") {
        console.warn(
          "[mds] Tabs.Trigger의 children은 문자열 라벨이어야 합니다. 요소를 넘기려면 asChild를 쓰세요.",
        );
      }
    }, [asChild, children]);

    // asChild(링크 등)는 네이티브 disabled가 없다. Slot은 자식의 onClick을 먼저 실행하므로
    // 라우터 Link가 이동하기 전에 capture 단계에서 막는다.
    const handleClickCapture = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClickCapture?.(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // 라우터 Link 같은 자식이 이미 preventDefault한 클릭은 선택으로 인정한다.
      // 이 onClick이 새로 preventDefault했다면 선택을 취소한 것이다.
      const wasPrevented = event.defaultPrevented;
      onClick?.(event);
      if (!wasPrevented && event.defaultPrevented) return;
      context.select(value);
    };

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);
      if (!disabled) context.select(value);
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        {...rest}
        {...(asChild
          ? { "aria-disabled": disabled || undefined }
          : { type: "button" as const, disabled })}
        ref={ref}
        role="tab"
        aria-selected={selected}
        data-state={selected ? "active" : "inactive"}
        className={clsx(
          trigger,
          triggerSizeVariants[context.size],
          triggerVariants[context.variant],
          className,
        )}
        onClickCapture={handleClickCapture}
        onClick={handleClick}
        onFocus={handleFocus}
      >
        {asChild ? <Slottable>{children}</Slottable> : children}
        {tag != null ? (
          <Tag
            shape="pill"
            variant="primary"
            size="small"
            type="subtle"
            className={tagStyle}
          >
            {tag}
          </Tag>
        ) : null}
      </Comp>
    );
  },
);

TabsRoot.displayName = "Tabs";
TabsList.displayName = "Tabs.List";
TabsTrigger.displayName = "Tabs.Trigger";

type TabsComponent = (<T extends string = string>(
  props: TabsRootProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null) & {
  displayName?: string;
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
};

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
}) as unknown as TabsComponent;

Tabs.displayName = "Tabs";
