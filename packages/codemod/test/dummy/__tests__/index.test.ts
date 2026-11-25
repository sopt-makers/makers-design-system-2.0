import { defineTest } from "jscodeshift/src/testUtils.js";

// defineTest는 transform을 Node의 require로 로드한다. 확장자(.ts)를 생략하면 찾지 못한다.
defineTest(import.meta.dirname, "index.ts", null, "basic", { parser: "tsx" });
