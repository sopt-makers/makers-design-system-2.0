import type { MDXComponents } from "mdx/types";
import { Tab, Tabs } from "../components/Tabs";
import * as styles from "./mdx.css";

/**
 * MDX 본문 요소 → 디자인 타이포그래피 매핑.
 * MDXProvider에 한 번 등록하면 모든 .mdx 문서가 이 스타일로 렌더된다.
 * (렌더마다 재생성되지 않도록 모듈 레벨 상수로 둔다.)
 *
 * HTML 요소 매핑 외에 문서에서 바로 쓰는 컴포넌트(Tabs/Tab)도 함께 싣는다 —
 * 문서마다 import를 적지 않아도 되도록.
 */
export const mdxComponents: MDXComponents = {
  Tabs,
  Tab,
  h1: (props) => <h1 className={styles.h1} {...props} />,
  h2: (props) => <h2 className={styles.h2} {...props} />,
  h3: (props) => <h3 className={styles.h3} {...props} />,
  h4: (props) => <h4 className={styles.h4} {...props} />,
  p: (props) => <p className={styles.paragraph} {...props} />,
  a: (props) => <a className={styles.link} {...props} />,
  ul: (props) => <ul className={styles.list} {...props} />,
  ol: (props) => <ol className={styles.list} {...props} />,
  li: (props) => <li className={styles.listItem} {...props} />,
  // 코드블록(```) 내부 code는 language-* className을 가짐 → 인라인 code와 구분
  code: ({ className, ...props }) =>
    className ? (
      <code className={className} {...props} />
    ) : (
      <code className={styles.inlineCode} {...props} />
    ),
  pre: (props) => <pre className={styles.codeBlock} {...props} />,
  img: (props) => <img alt="" className={styles.image} {...props} />,
  blockquote: (props) => (
    <blockquote className={styles.blockquote} {...props} />
  ),
  hr: () => <hr className={styles.divider} />,
  strong: (props) => <strong className={styles.strong} {...props} />,
};
