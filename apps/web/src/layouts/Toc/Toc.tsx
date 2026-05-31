import * as styles from "./Toc.css";
import { useTableOfContents } from "./useTableOfContents";

/**
 * "On this page" 목차. 본문 헤딩을 앵커 링크로 나열하고,
 * 스크롤 위치에 맞춰 현재 섹션을 강조한다(스크롤 스파이).
 */
export function Toc() {
  const { items, activeId } = useTableOfContents();

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.toc} aria-label="목차">
      <p className={styles.title}>On this page</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={
                item.id === activeId
                  ? `${styles.link} ${styles.linkActive}`
                  : styles.link
              }
              aria-current={item.id === activeId ? "location" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
