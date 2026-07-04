import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconHeartFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9932 6.50087C10.5 3.49977 6.65975 2.16965 4.15469 4.31002C1.64964 6.45039 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31002C17.2835 2.19216 13.5 3.49977 11.9932 6.50087Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconHeartFilled.displayName = "IconHeartFilled";
export default IconHeartFilled;
