import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconArrowDown = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.2499 5C11.2499 4.58579 11.5857 4.25 11.9999 4.25C12.4142 4.25 12.7499 4.58579 12.7499 5V17.1895L18.4697 11.4697C18.7626 11.1768 19.2373 11.1768 19.5302 11.4697C19.8231 11.7626 19.8231 12.2374 19.5302 12.5303L12.5302 19.5303C12.2373 19.8232 11.7626 19.8232 11.4697 19.5303L4.46967 12.5303C4.17678 12.2374 4.17678 11.7626 4.46967 11.4697C4.76256 11.1768 5.23732 11.1768 5.53022 11.4697L11.2499 17.1895V5Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconArrowDown.displayName = "IconArrowDown";
export default IconArrowDown;
