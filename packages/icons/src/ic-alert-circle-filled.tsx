import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconAlertCircleFilled = forwardRef<SVGSVGElement, IconProps>(
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
          d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12.875 8C12.875 7.51675 12.4832 7.125 12 7.125C11.5168 7.125 11.125 7.51675 11.125 8V12C11.125 12.4832 11.5168 12.875 12 12.875C12.4832 12.875 12.875 12.4832 12.875 12V8ZM12 15.125C11.5168 15.125 11.125 15.5168 11.125 16C11.125 16.4832 11.5168 16.875 12 16.875H12.01C12.4932 16.875 12.885 16.4832 12.885 16C12.885 15.5168 12.4932 15.125 12.01 15.125H12Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconAlertCircleFilled.displayName = "IconAlertCircleFilled";
export default IconAlertCircleFilled;
