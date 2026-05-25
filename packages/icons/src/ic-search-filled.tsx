import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconSearchFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1197 16.1196C16.4126 15.8267 16.8875 15.8267 17.1804 16.1196L21.5304 20.4696C21.8232 20.7625 21.8232 21.2373 21.5304 21.5302C21.2375 21.8231 20.7626 21.8231 20.4697 21.5302L16.1197 17.1802C15.8268 16.8873 15.8268 16.4125 16.1197 16.1196Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconSearchFilled.displayName = "IconSearchFilled";
export default IconSearchFilled;
