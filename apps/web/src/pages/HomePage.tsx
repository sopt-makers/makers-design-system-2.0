import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <article>
      <h1>Makers Design System</h1>
      <p>전용 문서 사이트(system web) 스캐폴딩이 동작 중입니다.</p>
      <p>
        문서 둘러보기: <Link to="/foundations/color-system">Foundations →</Link>
      </p>
    </article>
  );
}
