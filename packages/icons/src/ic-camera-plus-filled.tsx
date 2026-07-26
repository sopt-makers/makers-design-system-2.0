import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconCameraPlusFilled = forwardRef<SVGSVGElement, IconProps>(
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
          d="M13.8429 3.90353C14.0046 3.13947 13.4969 2.25464 12.7159 2.25464H6.05488C3.40392 2.25464 1.25488 4.40367 1.25488 7.05464V17.0452C1.25488 19.6962 3.40391 21.8452 6.05488 21.8452H17.9517C20.6027 21.8452 22.7517 19.6962 22.7517 17.0452V11.1396C22.7517 10.2457 21.5535 9.69944 20.7076 9.98885C20.1721 10.1721 19.5978 10.2715 19.0002 10.2715C16.0889 10.2715 13.7288 7.91136 13.7288 5C13.7288 4.62402 13.7681 4.25723 13.8429 3.90353ZM12.0002 16C14.2094 16 16.0002 14.2091 16.0002 12C16.0002 9.79086 14.2094 8 12.0002 8C9.79111 8 8.00024 9.79086 8.00024 12C8.00024 14.2091 9.79111 16 12.0002 16Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.0002 1.99829C19.3318 1.99829 19.6006 2.26707 19.6006 2.59863V4.39966H21.4016C21.7332 4.39966 22.002 4.66844 22.002 5C22.002 5.33156 21.7332 5.60034 21.4016 5.60034H19.6006V7.40137C19.6006 7.73293 19.3318 8.00171 19.0002 8.00171C18.6687 8.00171 18.3999 7.73293 18.3999 7.40137V5.60034H16.5989C16.2673 5.60034 15.9985 5.33156 15.9985 5C15.9985 4.66844 16.2673 4.39966 16.5989 4.39966H18.3999V2.59863C18.3999 2.26707 18.6687 1.99829 19.0002 1.99829Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconCameraPlusFilled.displayName = "IconCameraPlusFilled";
export default IconCameraPlusFilled;
