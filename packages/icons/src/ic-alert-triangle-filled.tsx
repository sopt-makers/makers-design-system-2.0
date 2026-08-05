import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconAlertTriangleFilled = forwardRef<SVGSVGElement, IconProps>(
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5812 2.6584C12.8779 1.4446 11.1219 1.44459 10.4186 2.6584L1.23179 18.5129C0.525324 19.7321 1.41116 21.248 2.81311 21.248H21.1866C22.5886 21.248 23.4744 19.7322 22.768 18.5129L13.5812 2.6584ZM11.9996 8.12524C12.4829 8.12524 12.8746 8.51699 12.8746 9.00024V13.0002C12.8746 13.4835 12.4829 13.8752 11.9996 13.8752C11.5164 13.8752 11.1246 13.4835 11.1246 13.0002V9.00024C11.1246 8.51699 11.5164 8.12524 11.9996 8.12524ZM11.1246 17.0002C11.1246 16.517 11.5164 16.1252 11.9996 16.1252H12.0096C12.4929 16.1252 12.8846 16.517 12.8846 17.0002C12.8846 17.4835 12.4929 17.8752 12.0096 17.8752H11.9996C11.5164 17.8752 11.1246 17.4835 11.1246 17.0002Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconAlertTriangleFilled.displayName = "IconAlertTriangleFilled";
export default IconAlertTriangleFilled;
