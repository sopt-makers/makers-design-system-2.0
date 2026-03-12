---
name: create-pr
description: 현재 레포지토리에서 PR을 생성하는 스킬. PR 제목을 feat/chore/refactor/fix/docs 등의 prefix와 함께 수정된 영역명을 [scope] 형식으로 명시하고, description에는 상세 작업 목록을 bullet point로 작성. PR 작성, PR 생성, 풀 리퀘스트 만들기, GitHub PR, gh pr create 관련 요청 시 반드시 이 스킬을 활성화.
---

# create-pr

현재 레포지토리에서 일관된 형식의 PR을 생성한다.

## PR 제목 형식

```bash
<type> [<scope>]: <description>
```

### type (변경 성격)

| type       | 설명                                        |
| ---------- | ------------------------------------------- |
| `feat`     | 새로운 기능 추가                            |
| `fix`      | 버그 수정                                   |
| `chore`    | 빌드/설정/의존성 등 코드 기능과 무관한 작업 |
| `refactor` | 기능 변경 없이 코드 구조 개선               |
| `docs`     | 문서 작성/수정                              |
| `test`     | 테스트 추가/수정                            |
| `ci`       | CI/CD 파이프라인 변경                       |

### scope (수정된 영역)

scope는 변경된 파일이 속한 루트 하위 디렉토리명을 그대로 사용한다. 현재 레포지토리는 `packages/`, `apps/`, `configs/`를 중심으로 구성되어 있다.

| 변경 경로 예시                                         | scope    |
| ------------------------------------------------------ | -------- |
| `packages/ui/...`                                      | `ui`     |
| `packages/design-tokens/...`                           | `design-tokens` |
| `configs/tsconfig/...`                                 | `tsconfig` |
| `apps/storybook/...`                                   | `storybook` |
| 루트 파일(`package.json`, `.github/`, `biome.json` 등) | `root`   |

- 루트 디렉토리가 `packages`, `apps`, `configs` 같은 그룹 디렉토리인 경우, 그 안의 실제 패키지명을 scope로 쓴다. 예: `packages/ui` → `ui`
- 그룹 디렉토리 자체가 무엇인지 불분명한 경우에만 사용자에게 확인한다.
- 여러 영역을 동시에 수정한 경우 쉼표로 구분한다. 예: `[ui, design-tokens]`

### 예시 제목

```bash
feat [ui]: 컴포넌트 배포 스크립트 추가
fix [design-tokens]: 토큰 생성 오류 수정
chore [root]: .gitignore 업데이트
refactor [ui, tsconfig]: 공통 설정 정리
feat [storybook]: 스토리북 초기 구성 추가
```

## PR Description 형식

```markdown
## 작업 내용

- <상세 작업 1>
- <상세 작업 2>
- <상세 작업 3>
```

각 bullet point는:

- 무엇을 했는지 간결하게 서술한다. 완료형 동사로 시작한다.
- 파일/모듈 단위가 아니라 의도와 변경 결과 위주로 기술한다.
- 너무 사소한 변경은 묶어서 하나로 처리한다.

## PR 생성 절차

### Step 1: 변경 사항 파악

```bash
git diff main...HEAD --stat
git log main...HEAD --oneline
```

위 명령으로 어떤 파일이 변경되었는지, 커밋 히스토리가 어떤지 파악한다.

### Step 2: scope 결정

변경된 파일 경로를 보고 scope를 결정한다.

1. 변경 파일의 루트 하위 첫 번째 디렉토리가 무엇인지 확인한다.
2. `packages`, `apps`, `configs`처럼 하위 패키지를 묶는 그룹 디렉토리라면 그 안의 패키지명을 scope로 사용한다.
3. 루트 파일(`package.json`, `biome.json`, `.github/` 등) 변경은 `root`로 처리한다.
4. 여러 scope에 걸쳐 변경된 경우 `[scope1, scope2]` 형식을 쓴다.

### Step 3: type 결정

변경의 성격을 파악해 type을 결정한다. 변경 내용이 명확하다면 바로 결정하고 진행한다. 여러 type에 해당할 수 있어 진짜 모호한 경우에만 사용자에게 묻는다.

### Step 4: PR 제목과 description 작성 후 즉시 생성

변경 내용을 분석하여 제목과 description을 결정하고, 사용자에게 따로 확인을 구하지 않고 바로 Step 5로 진행한다. 사용자가 명시적으로 초안을 먼저 보여 달라고 한 경우에만 먼저 보여준다.

### Step 5: PR 생성

`gh` CLI로 PR을 생성한다.

```bash
gh pr create \
  --title "<type> [<scope>]: <description>" \
  --body "$(cat <<'EOF'
## 작업 내용

- <작업 1>
- <작업 2>
EOF
)"
```

base branch가 `main`이 아닌 경우 `--base <branch>` 옵션을 추가한다.

## 주의 사항

- PR 생성 전 `gh auth status`를 실행해 로그인 상태를 확인한다. 이 환경은 `GITHUB_TOKEN` 환경변수로 인증되므로 `gh auth login`을 실행하면 오히려 에러가 발생한다. 인증이 안 된 경우 `GITHUB_TOKEN` 환경변수 설정 여부를 먼저 안내한다.
- PR 생성 전에 현재 브랜치가 remote에 push되어 있는지 확인한다. 안 되어 있으면 `git push -u origin HEAD`를 먼저 실행한다.
- 이미 열려 있는 PR이 있는지 `gh pr list`로 확인하여 중복 생성을 방지한다.
- 사용자가 제목이나 description을 직접 수정하길 원하면 즉시 반영한다.
