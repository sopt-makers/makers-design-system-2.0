import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconUserFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        d="M6.75004 7.5C6.75004 4.6005 9.10055 2.25 12 2.25C14.8995 2.25 17.25 4.6005 17.25 7.5C17.25 10.3995 14.8995 12.75 12 12.75C9.10055 12.75 6.75004 10.3995 6.75004 7.5ZM9.35703 14.75H14.643C15.9012 14.7497 16.7031 14.7495 17.3789 14.9545C18.897 15.415 20.085 16.603 20.5455 18.1211C20.7505 18.797 20.7503 19.5989 20.7501 20.857L20.75 21C20.75 21.4142 20.4143 21.75 20 21.75H4.00004C3.58583 21.75 3.25004 21.4142 3.25004 21L3.25002 20.857C3.24974 19.5989 3.24956 18.797 3.45458 18.1211C3.91509 16.603 5.10308 15.415 6.62119 14.9545C7.29702 14.7495 8.09892 14.7497 9.35703 14.75Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconUserFilled.displayName = "IconUserFilled";
export default IconUserFilled;
