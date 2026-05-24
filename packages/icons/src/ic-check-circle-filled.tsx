import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconCheckCircleFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM17.0303 9.53033C17.3232 9.23744 17.3232 8.76256 17.0303 8.46967C16.7374 8.17678 16.2626 8.17678 15.9697 8.46967L10.5 13.9393L8.03033 11.4697C7.73744 11.1768 7.26256 11.1768 6.96967 11.4697C6.67678 11.7626 6.67678 12.2374 6.96967 12.5303L9.96967 15.5303C10.2626 15.8232 10.7374 15.8232 11.0303 15.5303L17.0303 9.53033Z"
      fill="currentColor"
    />
  </svg>
));
IconCheckCircleFilled.displayName = "IconCheckCircleFilled";
export default IconCheckCircleFilled;
