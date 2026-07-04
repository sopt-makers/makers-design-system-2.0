import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconCheck = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        d="M19.5165 6.42673C19.833 6.15976 20.306 6.20004 20.5731 6.51657C20.8401 6.83315 20.7998 7.30614 20.4833 7.57321L9.81725 16.5732C9.51814 16.8256 9.07476 16.8056 8.79967 16.5273L3.46666 11.1269C3.17565 10.8323 3.17798 10.3575 3.47252 10.0664C3.7672 9.77533 4.24199 9.77857 4.53307 10.0732L9.37877 14.9785L19.5165 6.42673Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconCheck.displayName = "IconCheck";
export default IconCheck;
