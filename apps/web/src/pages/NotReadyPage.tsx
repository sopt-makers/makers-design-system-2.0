import { useLocation } from "react-router-dom";

/** 아직 페이지가 준비되지 않은 경로를 위한 placeholder. 이후 문서 페이지로 교체된다. */
export function NotReadyPage() {
  const { pathname } = useLocation();

  return (
    <article>
      <h1>준비 중</h1>
      <p>
        <code>{pathname}</code> 페이지는 아직 준비 중입니다.
      </p>
    </article>
  );
}
