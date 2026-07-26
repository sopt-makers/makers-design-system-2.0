import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconChevronLeft = forwardRef<SVGSVGElement, IconProps>(
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
          d="M14.4697 5.46967C14.7626 5.17678 15.2373 5.17678 15.5302 5.46967C15.8231 5.76256 15.8231 6.23732 15.5302 6.53022L10.0605 11.9999L15.5302 17.4697C15.8231 17.7626 15.8231 18.2373 15.5302 18.5302C15.2373 18.8231 14.7626 18.8231 14.4697 18.5302L8.46967 12.5302C8.17678 12.2373 8.17678 11.7626 8.46967 11.4697L14.4697 5.46967Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconChevronLeft.displayName = "IconChevronLeft";
export default IconChevronLeft;
