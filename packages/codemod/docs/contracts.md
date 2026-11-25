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

`status`는 한 지점을 어떻게 처리했는지를 나타내고, 각 규칙이 변환 지점마다 하나씩 기록합니다. `auto`와 `decision`만 소스를 바꿉니다. `blocked`와 `unresolved`는 "어떤 v1 토큰을 어떤 용도로 쓰는지 알아냈는가"로 나눕니다.

| status | 뜻 | 예 |
|---|---|---|
| `auto` | 값이 같다고 증명되어 자동으로 바꿉니다 | 용도에 맞고 값이 같은 semantic 토큰이 하나뿐인 경우 |
| `decision` | 디자이너가 정한 대로 바꿉니다. 값이 같은 후보 중 선택하거나, 값이 달라지는 것을 디자이너가 승인한 경우입니다 | gray400 글자 → `fg.neutral.subtle` (디자이너 승인) |
| `blocked` | 토큰과 용도는 알아냈지만 바꿀 값이 정해지지 않았습니다. 디자이너 결정이나 v2 토큰이 필요합니다 | v2에 같은 값이 없는 `orangeAlpha200` |
| `unresolved` | 토큰이나 용도를 알아내지 못했습니다. 사람이 코드를 확인해야 합니다 | 동적 키 `colors[key]` |


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
