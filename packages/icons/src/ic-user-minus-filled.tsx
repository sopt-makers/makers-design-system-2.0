import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconUserMinusFilled = forwardRef<SVGSVGElement, IconProps>(
  ({ size, ...rest }, ref) => {
    const props = {
      ...resolveIconSize(size),
      ...rest,
    };
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
          d="M12.7224 14.7407C13.1034 14.7407 13.3434 15.1544 13.2027 15.5085C12.9303 16.1938 12.7805 16.9412 12.7805 17.7236C12.7805 18.8652 13.0993 19.9322 13.6527 20.8407C13.878 21.2106 13.6326 21.7408 13.1994 21.7408H2.00004C1.58583 21.7408 1.25004 21.405 1.25004 20.9908L1.25002 20.8478C1.24974 19.5896 1.24956 18.7877 1.45458 18.1119C1.91509 16.5938 3.10308 15.4058 4.62119 14.9453C5.29702 14.7403 6.09892 14.7405 7.35703 14.7407L12.7224 14.7407Z"
          fill="currentColor"
        />
        <path
          d="M16.0002 17.25C15.586 17.25 15.2502 17.5858 15.2502 18C15.2502 18.4142 15.586 18.75 16.0002 18.75H22.0002C22.4145 18.75 22.7502 18.4142 22.7502 18C22.7502 17.5858 22.4145 17.25 22.0002 17.25H16.0002Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconUserMinusFilled.displayName = "IconUserMinusFilled";
export default IconUserMinusFilled;
