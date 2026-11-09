import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react-dom";
import { Slot } from "@radix-ui/react-slot";
import { IconCheck, IconChevronDown, IconChevronUp } from "@sopt-mds/icons";
import clsx from "clsx";
import * as React from "react";
import { mergeRefs } from "../../utils/mergeRefs";
import { Avatar } from "../Avatar";
import { Checkbox } from "../Checkbox";
import { SELECT_MENU_TOKENS } from "./constant";
import { SelectContext, useSelectContext } from "./context";
import {
  chevron,
  count,
  itemCheck,
  itemCheckbox,
  itemDescription,
  itemIcon,
  itemLabel,
  itemText,
  itemTypeVariants,
  menu,
  menuTypeVariants,
  root,
  SELECT_TRIGGER_WIDTH_VARIABLE,
  triggerButton,
  valueText,
} from "./Select.css";
import type { SelectMultipleType, SelectSingleType } from "./types";

type SelectBaseProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
>;

export interface SelectSingleProps extends SelectBaseProps {
  /** 메뉴 아이템의 레이아웃입니다. 단일 선택은 `icon`·`text`·`userList`를 씁니다. */
  type: SelectSingleType;
  multiple?: false;
  /**
   * 선택된 값 (제어 컴포넌트). 선택이 없으면 `null`입니다.
   *
   * `Select.Item`에 없는 값이면 트리거가 비어 보입니다.
   */
  value?: string | null;
  /** 초기 선택값 (비제어 컴포넌트). */
  defaultValue?: string | null;
  /** 선택이 바뀔 때 호출됩니다. */
  onValueChange?: (value: string) => void;
}

export interface SelectMultipleProps extends SelectBaseProps {
  /** 메뉴 아이템의 레이아웃입니다. 다중 선택은 `text`(체크 표시)·`checkbox`를 씁니다. */
  type: SelectMultipleType;
  multiple: true;
  /** 선택된 값 (제어 컴포넌트). 선택이 없으면 빈 배열입니다. */
  value?: string[];
  /** 초기 선택값 (비제어 컴포넌트). */
  defaultValue?: string[];
  /** 선택이 바뀔 때 호출됩니다. */
  onValueChange?: (value: string[]) => void;
}

export type SelectProps = SelectSingleProps | SelectMultipleProps;

function toArray(value: string | string[] | null | undefined): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * 메뉴를 top layer(Popover API)에 올릴 수 있는지.
 * top layer에서는 absolute가 문서 기준이라 페이지 스크롤에 브라우저가 직접 같이 움직인다(흔들림 없음).
 * 미지원 브라우저는 overflow에 잘리지 않도록 fixed를 쓴다.
 */
const supportsPopover =
  typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype;

/** 서버 렌더링에서 useLayoutEffect 경고를 피한다. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/**
 * 여러 항목 중 하나(또는 여러 개)를 고르는 셀렉트입니다.
 * `Select` > `Select.Trigger` + `Select.Menu` > `Select.Item`으로 조합합니다.
 *
 * - `value`/`onValueChange`(제어) 또는 `defaultValue`(비제어)로 선택 상태를 관리합니다.
 * - `type`이 메뉴 아이템의 레이아웃을 정하고, `multiple`로 다중 선택을 켭니다.
 *   icon·userList는 단일만, checkbox는 다중만, text는 둘 다 가능합니다.
 * - 폭은 부모를 채웁니다. 너비는 `className`으로 정합니다.
 * - 메뉴는 트리거 아래에 뜨고, 공간이 부족하면 위로 뒤집힙니다.
 * - 트리거의 label은 `Select.Item`이 브라우저에서 등록한 값을 씁니다. 그래서 서버 렌더링 시점에
 *   이미 값이 있으면, 첫 화면의 트리거는 비어 있다가 hydration 후에 채워집니다.
 *
 * `ref`는 루트 `<div>`를 가리킵니다.
 */
const SelectRoot = React.forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => {
    const {
      type,
      multiple = false,
      value,
      defaultValue,
      onValueChange: _onValueChange,
      className,
      children,
      ...rest
    } = props;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const menuId = React.useId();

    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
      toArray(defaultValue),
    );
    const selected = isControlled ? toArray(value) : uncontrolledValue;

    const [open, setOpenState] = React.useState(false);
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const [labels, setLabels] = React.useState<
      ReadonlyMap<string, React.ReactNode>
    >(() => new Map());

    const setOpen = React.useCallback((next: boolean) => {
      setOpenState(next);
      if (!next) setActiveId(null);
    }, []);

    const select = (next: string) => {
      if (props.multiple) {
        const nextValues = selected.includes(next)
          ? selected.filter((entry) => entry !== next)
          : [...selected, next];
        if (!isControlled) setUncontrolledValue(nextValues);
        props.onValueChange?.(nextValues);
        return;
      }

      setOpen(false);
      if (selected[0] === next) return;
      if (!isControlled) setUncontrolledValue([next]);
      props.onValueChange?.(next);
    };

    const registerLabel = React.useCallback(
      (itemValue: string, label: React.ReactNode) => {
        setLabels((prev) =>
          prev.has(itemValue) && prev.get(itemValue) === label
            ? prev
            : new Map(prev).set(itemValue, label),
        );
        return () =>
          setLabels((prev) => {
            if (!prev.has(itemValue)) return prev;
            const next = new Map(prev);
            next.delete(itemValue);
            return next;
          });
      },
      [],
    );

    const { refs, floatingStyles, isPositioned, update } = useFloating({
      open,
      strategy: supportsPopover ? "absolute" : "fixed",
      placement: "bottom-start",
      middleware: [
        offset(SELECT_MENU_TOKENS.offset),
        flip(),
        size({
          apply({ rects, elements }) {
            elements.floating.style.setProperty(
              SELECT_TRIGGER_WIDTH_VARIABLE,
              `${rects.reference.width}px`,
            );
          },
        }),
      ],
    });

    // 메뉴는 닫혀도 DOM에 남으므로, 열려 있을 때만 위치를 추적한다.
    React.useEffect(() => {
      const reference = refs.reference.current;
      const floating = refs.floating.current;
      if (!open || reference == null || floating == null) return;
      return autoUpdate(reference, floating, update);
    }, [open, refs, update]);

    // 바깥을 누르면 닫는다. 메뉴는 portal 없이 루트 안에 있으므로 루트 하나로 판별한다.
    React.useEffect(() => {
      if (!open) return;
      const handlePointerDown = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () =>
        document.removeEventListener("pointerdown", handlePointerDown);
    }, [open, setOpen]);

    const contextValue = {
      type,
      multiple,
      selected,
      select,
      open,
      setOpen,
      registerLabel,
      labels,
      activeId,
      setActiveId,
      menuId,
      menuRef: refs.floating,
      setTriggerElement: refs.setReference,
      setMenuElement: refs.setFloating,
      // 위치가 계산되기 전 한 프레임 동안 (0, 0)에 보이지 않도록 숨긴다.
      menuStyles: isPositioned
        ? floatingStyles
        : { ...floatingStyles, visibility: "hidden" as const },
    };

    return (
      <SelectContext.Provider value={contextValue}>
        <div
          {...rest}
          ref={mergeRefs(ref, rootRef)}
          className={clsx(root, className)}
        >
          {children}
        </div>
      </SelectContext.Provider>
    );
  },
);

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택된 값이 없을 때 보여줄 문구입니다. */
  placeholder?: string;
  /**
   * 다중 선택에서 2개 이상 골랐을 때 보여줄 고정 문구입니다. (예: "파트")
   *
   * 1개만 골랐으면 그 항목 이름이 보이고, 2개 이상이면 이 문구 옆에 개수가 붙습니다.
   * 없으면 처음 고른 항목 이름이 보입니다.
   */
  label?: React.ReactNode;
  /**
   * 자식 요소를 트리거로 렌더합니다. 기본 트리거 UI 대신 버튼 등을 직접 넣을 때 씁니다.
   *
   * 자식은 포커스 가능한 요소(버튼 등)여야 합니다.
   */
  asChild?: boolean;
}

/**
 * 메뉴를 여닫는 트리거입니다. children 없이 쓰면 Figma의 기본 트리거를 렌더합니다.
 *
 * - 포커스는 트리거에 머물고, 방향키로 메뉴의 항목을 이동합니다.
 * - 스크린리더가 읽을 이름이 필요하므로 `aria-label` 또는 `aria-labelledby`를 넘겨야 합니다.
 *   (트리거 안의 선택값·placeholder는 이름이 되지 않습니다.)
 */
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      placeholder,
      label,
      asChild = false,
      className,
      children,
      onClick,
      onKeyDown,
      onKeyUp,
      ...rest
    },
    ref,
  ) => {
    const {
      multiple,
      selected,
      select,
      open,
      setOpen,
      labels,
      activeId,
      setActiveId,
      menuId,
      menuRef,
      setTriggerElement,
    } = useSelectContext("Select.Trigger");

    const getOptions = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
      );

    const openMenu = (focus: "selected" | "last") => {
      const options = getOptions();
      const target =
        focus === "last"
          ? options[options.length - 1]
          : (options.find(
              (option) => option.getAttribute("aria-selected") === "true",
            ) ?? options[0]);
      setOpen(true);
      setActiveId(target?.id ?? null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (open) setOpen(false);
      else openMenu("selected");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      // 꾹 누르면 선택·열기가 번갈아 반복되므로 반복 입력은 무시한다.
      if (event.repeat && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        return;
      }

      if (!open) {
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          openMenu(event.key === "ArrowUp" ? "last" : "selected");
        }
        return;
      }

      const options = getOptions();
      const index = options.findIndex((option) => option.id === activeId);
      const moveTo = (next: HTMLElement | undefined) => {
        event.preventDefault();
        if (next == null) return;
        setActiveId(next.id);
        // 방향키로 이동한 항목이 스크롤 영역 밖이면 메뉴만 스크롤한다. (hover로는 스크롤하지 않는다)
        const menu = menuRef.current;
        if (menu == null) return;
        // 첫·마지막 항목에서 메뉴 padding까지 보이도록 padding을 포함한다.
        const padding =
          Number.parseFloat(getComputedStyle(menu).paddingTop) || 0;
        const top = next.offsetTop - padding;
        const bottom = next.offsetTop + next.offsetHeight + padding;
        if (top < menu.scrollTop) menu.scrollTop = top;
        else if (bottom > menu.scrollTop + menu.clientHeight)
          menu.scrollTop = bottom - menu.clientHeight;
      };

      switch (event.key) {
        case "ArrowDown":
          moveTo(options[Math.min(index + 1, options.length - 1)]);
          break;
        case "ArrowUp":
          moveTo(options[Math.max(index - 1, 0)]);
          break;
        case "Home":
          moveTo(options[0]);
          break;
        case "End":
          moveTo(options[options.length - 1]);
          break;
        case "Enter":
        case " ": {
          event.preventDefault();
          const value = options[index]?.dataset.value;
          if (value != null) select(value);
          break;
        }
        case "Escape":
          event.preventDefault();
          setOpen(false);
          break;
        case "Tab":
          setOpen(false);
          break;
      }
    };

    // Space는 keyup에서 click을 일으킨다. keydown에서 이미 처리했으므로 막는다.
    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyUp?.(event);
      if (event.key === " ") event.preventDefault();
    };

    const triggerProps = {
      ...rest,
      ref: mergeRefs(ref, setTriggerElement),
      role: "combobox",
      "aria-haspopup": "listbox" as const,
      "aria-expanded": open,
      "aria-controls": menuId,
      "aria-activedescendant": activeId ?? undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    };

    if (asChild) {
      return (
        <Slot {...triggerProps} className={className}>
          {children}
        </Slot>
      );
    }

    const first = selected[0];
    const isEmpty = first == null;
    const valueLabel = isEmpty
      ? placeholder
      : multiple && label != null && selected.length > 1
        ? label
        : labels.get(first);
    const Chevron = open ? IconChevronUp : IconChevronDown;

    return (
      <button
        type="button"
        {...triggerProps}
        className={clsx(triggerButton, className)}
      >
        <span className={valueText} data-placeholder={isEmpty ? "" : undefined}>
          {valueLabel}
        </span>
        {multiple && selected.length > 1 ? (
          <span className={count}>{selected.length}</span>
        ) : null}
        <Chevron className={chevron} aria-hidden />
      </button>
    );
  },
);

export interface SelectMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 메뉴의 최대 높이입니다. 넘치면 스크롤됩니다.
   *
   * 스크롤 기준은 각 팀이 정합니다. (예: 아이템 5개 높이)
   */
  maxHeight?: React.CSSProperties["maxHeight"];
}

/**
 * 항목 목록입니다. 트리거 아래에 트리거 폭 이상으로 뜨고, 아래 공간이 부족하면 위로 뒤집힙니다.
 *
 * - 열리면 화면 맨 앞(top layer)에 떠서, 조상의 `overflow`·`transform`·`z-index`에 잘리지 않습니다.
 * - 닫혀 있어도 DOM에 남아(`hidden`) 트리거가 선택된 항목의 label을 보여줄 수 있습니다.
 */
const SelectMenu = React.forwardRef<HTMLDivElement, SelectMenuProps>(
  ({ maxHeight, className, style, onMouseDown, ...rest }, ref) => {
    const { type, multiple, open, menuId, setMenuElement, menuStyles } =
      useSelectContext("Select.Menu");
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Popover API로 top layer에 올린다. portal 없이 DOM 위치를 유지하므로
    // native Dialog 안에서도 inert가 되지 않는다. 미지원 브라우저는 fixed 위치로만 뜬다.
    useIsomorphicLayoutEffect(() => {
      const element = menuRef.current;
      if (!open || element == null || !("showPopover" in element)) return;
      element.setAttribute("popover", "manual");
      element.showPopover();
      return () => {
        if (element.matches(":popover-open")) element.hidePopover();
      };
    }, [open]);

    return (
      <div
        {...rest}
        ref={mergeRefs(ref, menuRef, setMenuElement)}
        id={menuId}
        role="listbox"
        aria-multiselectable={multiple || undefined}
        hidden={!open}
        className={clsx(menu, menuTypeVariants[type], className)}
        style={{ ...menuStyles, maxHeight, ...style }}
        onMouseDown={(event) => {
          onMouseDown?.(event);
          // 항목을 눌러도 포커스가 트리거에 머물게 한다.
          event.preventDefault();
        }}
      />
    );
  },
);

export interface SelectItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value"> {
  /** 항목의 값입니다. Select의 `value`와 비교됩니다. */
  value: string;
  /** 항목의 라벨입니다. 선택되면 트리거에도 표시됩니다. */
  children: React.ReactNode;
  /** 라벨 아래 설명입니다. (`text`·`userList`) */
  description?: React.ReactNode;
  /** 라벨 앞 16px 아이콘입니다. (`icon`) description과 함께 쓰지 않습니다. */
  icon?: React.ReactNode;
  /** 프로필 이미지 URL입니다. 없으면 기본 아이콘이 보입니다. (`userList`) */
  profileUrl?: string;
}

/** 메뉴의 항목 하나입니다. 레이아웃은 Select의 `type`을 따릅니다. */
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  (
    {
      value,
      children,
      description,
      icon,
      profileUrl,
      className,
      onClick,
      onPointerMove,
      onPointerLeave,
      ...rest
    },
    ref,
  ) => {
    const { type, selected, select, registerLabel, activeId, setActiveId } =
      useSelectContext("Select.Item");
    const id = React.useId();
    const isSelected = selected.includes(value);

    useIsomorphicLayoutEffect(
      () => registerLabel(value, children),
      [registerLabel, value, children],
    );

    const descriptionNode =
      description != null ? (
        <span className={itemDescription}>{description}</span>
      ) : null;

    return (
      // biome-ignore lint/a11y/useFocusableInteractive: 포커스는 트리거(combobox)에 머물고 option은 aria-activedescendant로 가리킨다.
      // biome-ignore lint/a11y/useKeyWithClickEvents: 키보드 선택은 트리거의 keydown이 담당한다.
      <div
        {...rest}
        ref={ref}
        id={id}
        role="option"
        aria-selected={isSelected}
        data-value={value}
        data-highlighted={activeId === id ? "" : undefined}
        className={clsx(itemTypeVariants[type], className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) select(value);
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (activeId !== id) setActiveId(id);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          setActiveId(null);
        }}
      >
        {type === "icon" ? (
          <>
            <span className={itemIcon} aria-hidden>
              {icon}
            </span>
            <span className={itemLabel}>{children}</span>
          </>
        ) : null}

        {type === "text" ? (
          <>
            <span className={itemText}>
              <span className={itemLabel}>{children}</span>
              {descriptionNode}
            </span>
            {isSelected ? (
              <IconCheck className={itemCheck} aria-hidden />
            ) : null}
          </>
        ) : null}

        {type === "userList" ? (
          <>
            <Avatar
              src={profileUrl}
              size={32}
              type="subtle"
              strokeColor="neutralSubtle"
              aria-hidden
            />
            <span className={itemText}>
              <span className={itemLabel}>{children}</span>
              {descriptionNode}
            </span>
          </>
        ) : null}

        {type === "checkbox" ? (
          <>
            <span className={itemCheckbox} aria-hidden>
              <Checkbox size="large" checked={isSelected} tabIndex={-1} />
            </span>
            <span className={itemLabel}>{children}</span>
          </>
        ) : null}
      </div>
    );
  },
);

SelectRoot.displayName = "Select";
SelectTrigger.displayName = "Select.Trigger";
SelectMenu.displayName = "Select.Menu";
SelectItem.displayName = "Select.Item";

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Menu: SelectMenu,
  Item: SelectItem,
});

Select.displayName = "Select";
