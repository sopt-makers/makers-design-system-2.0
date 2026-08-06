import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import * as styles from "./Tabs.css";

export interface TabProps {
  /** 탭 버튼에 보이는 이름. */
  label: string;
  children?: ReactNode;
}

/**
 * 탭 하나의 내용. `Tabs`의 자식으로만 쓰며, 이 컴포넌트 자체는 아무것도 렌더하지 않는다.
 * (`Tabs`가 label을 읽어 버튼을 만들고 선택된 것의 children만 그린다.)
 */
export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

/** 자식 중 `Tab` 요소만 추려낸다. MDX는 요소 사이 공백을 텍스트 노드로 넘긴다. */
function collectTabs(children: ReactNode): ReactElement<TabProps>[] {
  return Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> =>
      isValidElement(child) && child.type === Tab,
  );
}

export interface TabsProps {
  /** `Tab` 요소들. */
  children?: ReactNode;
  /** 처음 열릴 탭의 label. 생략하면 첫 번째 탭이다. */
  defaultLabel?: string;
}

/**
 * 문서 본문에서 내용을 탭으로 가른다.
 *
 * ```mdx
 * <Tabs>
 *   <Tab label="Base token">...</Tab>
 *   <Tab label="Semantic token">...</Tab>
 * </Tabs>
 * ```
 *
 * 선택되지 않은 탭의 내용은 렌더하지 않는다 — 레퍼런스 문서의 표가 길어서 숨겨만 두면
 * 목차·검색이 보이지 않는 내용까지 훑게 된다.
 */
export function Tabs({ children, defaultLabel }: TabsProps) {
  const id = useId();
  const items = collectTabs(children);
  const [selected, setSelected] = useState(defaultLabel);

  if (items.length === 0) return null;

  // 지정된 label이 없거나 사라졌으면 첫 탭으로 떨어진다.
  const active =
    items.find((item) => item.props.label === selected) ?? items[0];
  if (active == null) return null;

  const activeIndex = items.indexOf(active);

  /** ←/→로 탭을 옮긴다(WAI-ARIA tabs 패턴). 끝에서는 반대편으로 감는다. */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;

    event.preventDefault();
    const next = items[(activeIndex + step + items.length) % items.length];
    if (next == null) return;

    setSelected(next.props.label);
    document.getElementById(`${id}${next.props.label}`)?.focus();
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        {items.map((item) => {
          const { label } = item.props;
          const isActive = item === active;

          return (
            <button
              key={label}
              type="button"
              id={`${id}${label}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${id}${label}panel`}
              // 선택된 탭만 Tab 키 순서에 남기고 나머지는 방향키로 옮긴다.
              tabIndex={isActive ? 0 : -1}
              className={
                isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
              }
              onClick={() => setSelected(label)}
              onKeyDown={handleKeyDown}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        className={styles.panel}
        id={`${id}${active.props.label}panel`}
        role="tabpanel"
        aria-labelledby={`${id}${active.props.label}`}
      >
        {active}
      </div>
    </div>
  );
}
