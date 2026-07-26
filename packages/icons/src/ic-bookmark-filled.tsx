import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconBookmarkFilled = forwardRef<SVGSVGElement, IconProps>(
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
          d="M14.2321 2.25H9.7679C8.95506 2.24999 8.29944 2.24999 7.76853 2.29336C7.2219 2.33803 6.74176 2.43239 6.29754 2.65873C5.59193 3.01825 5.01825 3.59193 4.65873 4.29754C4.43239 4.74175 4.33803 5.2219 4.29336 5.76853C4.24999 6.29944 4.24999 6.95505 4.25 7.76788V21C4.25 21.2674 4.39232 21.5145 4.62356 21.6487C4.85479 21.7829 5.13998 21.7838 5.37211 21.6512L12 17.8638L18.6279 21.6512C18.86 21.7838 19.1452 21.7829 19.3764 21.6487C19.6077 21.5145 19.75 21.2674 19.75 21V7.76788C19.75 6.95505 19.75 6.29944 19.7066 5.76853C19.662 5.2219 19.5676 4.74175 19.3413 4.29754C18.9817 3.59193 18.4081 3.01825 17.7025 2.65873C17.2582 2.43239 16.7781 2.33803 16.2315 2.29336C15.7006 2.24999 15.0449 2.24999 14.2321 2.25Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconBookmarkFilled.displayName = "IconBookmarkFilled";
export default IconBookmarkFilled;
