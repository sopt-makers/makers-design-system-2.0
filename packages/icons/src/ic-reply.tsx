import { forwardRef } from "react";
import { type IconProps, resolveIconSize } from "./icon-size";

const IconReply = forwardRef<SVGSVGElement, IconProps>(
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
          d="M2.25 10.5001C2.25 13.3996 4.6005 15.7501 7.5 15.7501L19.1895 15.7501L16.4697 18.4698C16.1768 18.7627 16.1768 19.2374 16.4697 19.5303C16.7626 19.8232 17.2374 19.8232 17.5303 19.5303L21.5303 15.5303C21.8232 15.2374 21.8232 14.7627 21.5303 14.4698L17.5303 10.4698C17.2374 10.1769 16.7626 10.1769 16.4697 10.4698C16.1768 10.7627 16.1768 11.2374 16.4697 11.5303L19.1895 14.2501L7.5 14.2501C5.42893 14.2501 3.75 12.5711 3.75 10.5001C3.75 8.42899 5.42893 6.75006 7.5 6.75006L12 6.75006C12.4142 6.75006 12.75 6.41427 12.75 6.00006C12.75 5.58584 12.4142 5.25006 12 5.25006L7.5 5.25006C4.60051 5.25006 2.25 7.60056 2.25 10.5001Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
IconReply.displayName = "IconReply";
export default IconReply;
