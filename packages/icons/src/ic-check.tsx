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
        d="M19.5165 6.42685C19.833 6.15988 20.306 6.20016 20.5731 6.51669C20.8401 6.83327 20.7998 7.30626 20.4833 7.57333L9.81725 16.5733C9.51814 16.8257 9.07476 16.8058 8.79967 16.5274L3.46666 11.127C3.17565 10.8324 3.17798 10.3576 3.47252 10.0665C3.7672 9.77545 4.24199 9.77869 4.53307 10.0733L9.37877 14.9786L19.5165 6.42685Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconCheck.displayName = "IconCheck";
export default IconCheck;
