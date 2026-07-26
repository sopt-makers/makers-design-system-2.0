import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconClockCheckFilled = forwardRef<SVGSVGElement, IconProps>(
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.2846 22.75 12.4268 22.7242 12.5382C22.6028 13.062 22.1877 13.3601 21.6526 13.3077C21.5388 13.2966 21.3023 13.2168 20.8292 13.0573C20.1763 12.8371 19.4771 12.7178 18.75 12.7178C17.8347 12.7178 16.9635 12.9069 16.1735 13.2482L12.75 11.5365V6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6V12C11.25 12.2841 11.4105 12.5438 11.6646 12.6708L14.6572 14.1671C13.1871 15.3593 12.2476 17.18 12.2476 19.2202C12.2476 20.048 12.4022 20.8397 12.6843 21.5679C12.8927 22.1061 12.5772 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
          fill="currentColor"
        />
        <path
          d="M22.5303 16.44C22.8232 16.7329 22.8232 17.2078 22.5303 17.5007L18.0303 22.0007C17.7374 22.2936 17.2626 22.2936 16.9697 22.0007L14.9697 20.0007C14.6768 19.7078 14.6768 19.2329 14.9697 18.94C15.2626 18.6471 15.7374 18.6471 16.0303 18.94L17.5 20.4097L21.4697 16.44C21.7626 16.1471 22.2374 16.1471 22.5303 16.44Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconClockCheckFilled.displayName = "IconClockCheckFilled";
export default IconClockCheckFilled;
