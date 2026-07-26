import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconUsersMinusFilled = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9.5 2.25C6.87665 2.25 4.75 4.37665 4.75 7C4.75 9.62335 6.87665 11.75 9.5 11.75C12.1234 11.75 14.25 9.62335 14.25 7C14.25 4.37665 12.1234 2.25 9.5 2.25Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.2729 11.0353C14.0396 11.3109 14.1746 11.75 14.5356 11.75C17.159 11.75 19.2856 9.62335 19.2856 7C19.2856 4.37665 17.159 2.25 14.5356 2.25C14.1746 2.25 14.0396 2.68909 14.2729 2.96472C15.1944 4.05354 15.75 5.46188 15.75 7C15.75 8.53811 15.1944 9.94646 14.2729 11.0353Z"
          fill="currentColor"
        />
        <path
          d="M15.5588 18C15.5588 17.5858 15.8946 17.25 16.3088 17.25H22.3088C22.7231 17.25 23.0588 17.5858 23.0588 18C23.0588 18.4142 22.7231 18.75 22.3088 18.75H16.3088C15.8946 18.75 15.5588 18.4142 15.5588 18Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.8635 15.608C14.1165 15.033 13.8664 14.3326 13.2397 14.2898C12.6563 14.25 11.936 14.25 11.0274 14.25H7.97262C7.06395 14.25 6.34374 14.25 5.76032 14.2898C5.16431 14.3305 4.65641 14.4152 4.18225 14.6116C3.01837 15.0937 2.09367 16.0184 1.61157 17.1823C1.41517 17.6564 1.33047 18.1643 1.2898 18.7603C1.24999 19.3438 1.25 20.0639 1.25 20.9726V21C1.25 21.4142 1.58579 21.75 2 21.75H12.5914C13.4337 21.75 13.9517 20.7178 13.6798 19.9206C13.4743 19.3181 13.3628 18.6721 13.3628 18C13.3628 17.1491 13.5415 16.3399 13.8635 15.608Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconUsersMinusFilled.displayName = "IconUsersMinusFilled";
export default IconUsersMinusFilled;
