# @sopt-mds/icons

## 0.2.0

### Minor Changes

- ab95a1a: add a `size` prop to every icon so `small` renders 12x12 and `medium` renders 14x14, and export `ICON_SIZES` / `IconSize` / `IconProps`. omitting `size` keeps the original 24x24, and an explicit `width`/`height` still wins over `size`.

  this scale is separate from the icon sizes `@sopt-mds/ui` components apply to their own addon slots — the names overlap but the values do not, and inside a component the component's size wins.

## 0.1.0

### Minor Changes

- e1b2461: Add IconDotsHorizontal and sync icons with Figma (bellActive redesigned with orange badge).

## 0.0.2

### Patch Changes

- 6af37d7: fix(icons): 배포 진입점이 dist를 가리키도록 재배포

  배포된 `@sopt-mds/icons@0.0.1`은 package.json의 `exports`/`main`/`types`가
  개발용 `./src/index.ts`를 가리켰으나, 실제 npm 패키지에는 `dist`만 포함되어
  (`files: ["dist"]`) 모듈/타입 해석에 실패했다 (TS2307).

  소스의 `publishConfig`는 이미 `dist`를 가리키도록 올바르게 설정되어 있으며
  (`pnpm pack`으로 검증 완료), 0.0.1만 정상 배포 경로를 우회해 override가
  적용되지 않은 채 배포된 것이다. npm 버전은 불변이므로 0.0.1을 덮어쓸 수 없어,
  publishConfig override가 적용된 새 버전으로 재배포한다.

## 0.0.1

### Patch Changes

- e1fb484: @sopt-mds/icons 패키지 빌드/배포 설정 추가 (vite + vite-plugin-dts).
  release 워크플로우의 `pnpm -r build`로 자동 빌드되며 changesets로 npm publish 대상에 포함된다.
