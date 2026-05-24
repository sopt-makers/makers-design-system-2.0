import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconHeartFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
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
      d="M11.9932 6.50075C10.5 3.49965 6.65975 2.16952 4.15469 4.3099C1.64964 6.45027 1.29697 10.0289 3.2642 12.5603C4.89982 14.665 9.84977 19.104 11.4721 20.5407C11.6536 20.7015 11.7444 20.7818 11.8502 20.8134C11.9426 20.841 12.0437 20.841 12.1361 20.8134C12.2419 20.7818 12.3327 20.7015 12.5142 20.5407C14.1365 19.104 19.0865 14.665 20.7221 12.5603C22.6893 10.0289 22.3797 6.42775 19.8316 4.3099C17.2835 2.19204 13.5 3.49965 11.9932 6.50075Z"
      fill="currentColor"
    />
  </svg>
));
IconHeartFilled.displayName = "IconHeartFilled";
export default IconHeartFilled;
