import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconChevronRight = forwardRef<SVGSVGElement, IconProps>(
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
          d="M8.46967 5.46967C8.76256 5.17678 9.23732 5.17678 9.53022 5.46967L15.5302 11.4697C15.8231 11.7626 15.8231 12.2373 15.5302 12.5302L9.53022 18.5302C9.23732 18.8231 8.76256 18.8231 8.46967 18.5302C8.17678 18.2373 8.17678 17.7626 8.46967 17.4697L13.9394 11.9999L8.46967 6.53022C8.17678 6.23732 8.17678 5.76256 8.46967 5.46967Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconChevronRight.displayName = "IconChevronRight";
export default IconChevronRight;
