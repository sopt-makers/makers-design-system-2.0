import { MDXProvider } from "@mdx-js/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { mdxComponents } from "./mdx";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("#root 엘리먼트를 찾을 수 없습니다.");
}

createRoot(rootElement).render(
  <StrictMode>
    <MDXProvider components={mdxComponents}>
      <RouterProvider router={router} />
    </MDXProvider>
  </StrictMode>,
);
