import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconUserCheckFilled = forwardRef<SVGSVGElement, IconProps>(
  ({ size, ...rest }, ref) => {
    const props = { ...resolveIconSize(size), ...rest };
    return (
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
          d="M10.0002 2.25C7.10075 2.25 4.75024 4.6005 4.75024 7.5C4.75024 10.3995 7.10075 12.75 10.0002 12.75C12.8997 12.75 15.2502 10.3995 15.2502 7.5C15.2502 4.6005 12.8997 2.25 10.0002 2.25Z"
          fill="currentColor"
        />
        <path
          d="M22.5306 15.4697C22.8235 15.7626 22.8235 16.2374 22.5306 16.5303L18.5306 20.5303C18.2377 20.8232 17.7628 20.8232 17.4699 20.5303L15.4699 18.5303C15.177 18.2374 15.177 17.7626 15.4699 17.4697C15.7628 17.1768 16.2377 17.1768 16.5306 17.4697L18.0002 18.9393L21.4699 15.4697C21.7628 15.1768 22.2377 15.1768 22.5306 15.4697Z"
          fill="currentColor"
        />
        <path
          d="M13.2027 15.5085C13.3434 15.1544 13.1034 14.7407 12.7224 14.7407L7.35703 14.7407C6.09892 14.7405 5.29702 14.7403 4.62119 14.9453C3.10308 15.4058 1.91509 16.5938 1.45458 18.1119C1.24956 18.7877 1.24974 19.5896 1.25002 20.8478L1.25004 20.9908C1.25004 21.405 1.58583 21.7408 2.00004 21.7408H13.1994C13.6326 21.7408 13.878 21.2106 13.6527 20.8407C13.0993 19.9322 12.7805 18.8652 12.7805 17.7236C12.7805 16.9412 12.9303 16.1938 13.2027 15.5085Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconUserCheckFilled.displayName = "IconUserCheckFilled";
export default IconUserCheckFilled;
