import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconMenu = forwardRef<SVGSVGElement, IconProps>(
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
          d="M15 17.25C15.4142 17.25 15.75 17.5858 15.75 18C15.75 18.4142 15.4142 18.75 15 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H15ZM21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H21ZM21 5.25C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconMenu.displayName = "IconMenu";
export default IconMenu;
