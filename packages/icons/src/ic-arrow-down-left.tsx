import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconArrowDownLeft = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        d="M16.4697 6.46973C16.7626 6.17683 17.2374 6.17683 17.5303 6.46973C17.8232 6.76262 17.8232 7.23738 17.5303 7.53027L8.81055 16.25H17C17.4142 16.25 17.75 16.5858 17.75 17C17.75 17.4142 17.4142 17.75 17 17.75H7C6.58579 17.75 6.25 17.4142 6.25 17V7C6.25 6.58579 6.58579 6.25 7 6.25C7.41421 6.25 7.75 6.58579 7.75 7V15.1895L16.4697 6.46973Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconArrowDownLeft.displayName = "IconArrowDownLeft";
export default IconArrowDownLeft;
