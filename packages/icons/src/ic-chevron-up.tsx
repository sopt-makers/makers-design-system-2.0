import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconChevronUp = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.5263 8.41796C11.8209 8.17765 12.2556 8.19512 12.5302 8.46972L18.5302 14.4697C18.8231 14.7626 18.8231 15.2374 18.5302 15.5303C18.2373 15.8232 17.7626 15.8232 17.4697 15.5303L11.9999 10.0605L6.53022 15.5303C6.23732 15.8232 5.76256 15.8232 5.46967 15.5303C5.17678 15.2374 5.17678 14.7626 5.46967 14.4697L11.4697 8.46972L11.5263 8.41796Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconChevronUp.displayName = "IconChevronUp";
export default IconChevronUp;
