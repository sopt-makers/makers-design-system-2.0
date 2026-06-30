---
"@sopt-mds/icons": patch
---

fix(icons): 배포 진입점이 dist를 가리키도록 재배포

배포된 `@sopt-mds/icons@0.0.1`은 package.json의 `exports`/`main`/`types`가
개발용 `./src/index.ts`를 가리켰으나, 실제 npm 패키지에는 `dist`만 포함되어
(`files: ["dist"]`) 모듈/타입 해석에 실패했다 (TS2307).

소스의 `publishConfig`는 이미 `dist`를 가리키도록 올바르게 설정되어 있으며
(`pnpm pack`으로 검증 완료), 0.0.1만 정상 배포 경로를 우회해 override가
적용되지 않은 채 배포된 것이다. npm 버전은 불변이므로 0.0.1을 덮어쓸 수 없어,
publishConfig override가 적용된 새 버전으로 재배포한다.
