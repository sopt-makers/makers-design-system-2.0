import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconArrowUp = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M11.2499 19V6.81054L5.53022 12.5303C5.23732 12.8232 4.76256 12.8232 4.46967 12.5303C4.17678 12.2374 4.17678 11.7626 4.46967 11.4697L11.4697 4.46972L11.5263 4.41796C11.8209 4.17765 12.2556 4.19512 12.5302 4.46972L19.5302 11.4697C19.8231 11.7626 19.8231 12.2374 19.5302 12.5303C19.2373 12.8232 18.7626 12.8232 18.4697 12.5303L12.7499 6.81054V19C12.7499 19.4142 12.4142 19.75 11.9999 19.75C11.5857 19.75 11.2499 19.4142 11.2499 19Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconArrowUp.displayName = "IconArrowUp";
export default IconArrowUp;
