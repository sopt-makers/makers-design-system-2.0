# codemod 계약 (초안)

토큰 명령과 나중에 추가될 수 있는 컴포넌트 명령이 함께 지킬 약속입니다. 아직 구현하지 않았고, **미결**로 표시한 항목은 바뀔 수 있습니다.

## 1. 마커 주석 (선택 기능)

기본은 꺼짐이고 아직 구현하지 않았습니다. **미결이고, 필요가 생기면 추가**합니다. 형식 후보는 다음과 같습니다.

```
mds-migrate(<rule>): <사유 코드> [<결정 id>]
```

- 템플릿 CSS 안에서는 `/* */`, JS에서는 `//`를 씁니다.
- JSX 자식 위치의 `{/* */}`와 "같은 마커"의 기준은 추가할 때 정합니다.

## 2. 리포트 JSON v0

`--report <경로>`를 줬을 때만 씁니다. 기본으로는 파일을 만들지 않습니다. 경로는 변환 대상 레포 밖으로 지정해 주세요. 최소 필드만 정합니다.

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

- **미결**: `repo`는 git remote origin의 `owner/name`을 쓰고, remote가 없으면 폴더 이름을 씁니다. worktree로 돌리면 폴더 이름이 임의라서, 리포트를 합칠 때 레포를 구분할 수 없기 때문입니다.

## 3. CLI

```
mds-migrate <scan|token> <경로> [--dry] [--print] [--report <파일>] [--only <규칙>] [--list]
```

예시

```
mds-migrate scan ./src --report ~/mds-report/scan.json
mds-migrate token ./src --dry --report ~/mds-report/token.json
```

터미널 요약은 옵션과 관계없이 항상 출력합니다.

| 옵션 | 동작 | 상태 |
|---|---|---|
| `--dry` | 소스 파일을 쓰지 않습니다. `--report` 파일은 씁니다 | |
| `--print` | 소스 파일을 쓰지 않고 변환 결과를 출력합니다 | 미결 |
| `--report <파일>` | 리포트 JSON을 저장합니다 | |
| `--only <규칙>` | 지정한 규칙만 실행합니다 | |
| `--list` | 규칙 목록을 출력합니다 | 구현됨 |
