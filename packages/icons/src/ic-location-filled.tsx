import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconLocationFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        d="M3.7373 9.91307C3.7373 5.34951 7.4368 1.65002 12.0003 1.65002C16.5639 1.65002 20.2634 5.34951 20.2634 9.91307C20.2634 11.163 19.8565 12.453 19.2697 13.674C18.6799 14.9012 17.886 16.1046 17.0595 17.1941C15.4068 19.3726 13.5758 21.1575 12.8399 21.8469C12.3665 22.2904 11.6342 22.2905 11.1608 21.8469C10.4249 21.1575 8.5939 19.3726 6.94123 17.1941C6.11471 16.1046 5.3208 14.9012 4.73104 13.674C4.14423 12.453 3.7373 11.163 3.7373 9.91307ZM8.85065 9.60019C8.85065 7.8605 10.261 6.4502 12.0006 6.4502C13.7403 6.4502 15.1506 7.8605 15.1506 9.60019C15.1506 11.3399 13.7403 12.7502 12.0006 12.7502C10.2609 12.7502 8.85065 11.3399 8.85065 9.60019Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconLocationFilled.displayName = "IconLocationFilled";
export default IconLocationFilled;
