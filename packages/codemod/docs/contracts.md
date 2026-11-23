# codemod 계약 (초안)

토큰 명령과 나중에 추가될 수 있는 컴포넌트 명령이 함께 지키는 약속이다. 아직 구현하지 않았다. **미결**로 표시한 항목은 바뀔 수 있다.

## 1. 마커 주석

자동으로 바꾸지 않은 자리에 남긴다.

```
mds-migrate(<rule>): <사유 코드> [<결정 id>]
```

| 위치 | 형식 | 상태 |
|---|---|---|
| 템플릿 CSS 안 | `/* mds-migrate(...): ... */` | |
| JS | `// mds-migrate(...): ...` | |
| JSX 자식 위치 | `{/* mds-migrate(...): ... */}` | T-004 더미로 확인 후 확정 |

- 결정 id는 있을 때만 붙인다.
- 같은 마커가 이미 있으면 다시 넣지 않는다.
- **미결**: "같은 마커"를 판단하는 기준(rule, 사유, 결정 id 중 무엇이 같아야 하는지)과 결정 id가 바뀐 옛 마커의 처리.

## 2. 리포트 JSON v0

최소 필드만 정한다.

```json
{
  "tool": "mds-migrate",
  "version": "0.0.0",
  "repo": "owner/name",
  "commit": "<sha>",
  "generatedAt": "<ISO 8601>",
  "summary": { "auto": 0, "decision": 0, "blocked": 0, "unresolved": 0 },
  "items": [
    {
      "file": "src/Box.tsx",
      "line": 1,
      "rule": "<rule>",
      "status": "auto | decision | blocked | unresolved",
      "reason": "<사유 코드>",
      "v1": "<v1 토큰>",
      "v2": "<v2 토큰, 있을 때만>",
      "decisionId": "<있을 때만>"
    }
  ]
}
```

- **미결**: `repo`는 git remote origin의 `owner/name`을 쓰고, remote가 없으면 폴더 이름을 쓴다. worktree로 돌리면 폴더 이름이 임의라서 리포트를 합칠 때 레포를 구분할 수 없기 때문이다.

## 3. CLI

```
mds-migrate <scan|token> <경로> [--dry] [--print] [--report <파일>] [--only <규칙>] [--list]
```

| 옵션 | 동작 | 상태 |
|---|---|---|
| `--dry` | 소스 파일을 쓰지 않고 요약만 출력한다. `--report` 파일은 쓴다 | 미결 |
| `--print` | 소스 파일을 쓰지 않고 변환 결과를 출력한다 | 미결 |
| `--report <파일>` | 리포트 JSON을 저장한다 | |
| `--only <규칙>` | 지정한 규칙만 실행한다 | |
| `--list` | 규칙 목록을 출력한다 | 구현됨 |
