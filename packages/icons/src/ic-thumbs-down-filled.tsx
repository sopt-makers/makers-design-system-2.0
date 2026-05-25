import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconThumbsDownFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
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
        d="M10.0977 2.18352C10.35 1.61585 10.9129 1.25 11.5342 1.25C13.3102 1.25 14.75 2.68978 14.75 4.46584V8C14.75 8.13807 14.8619 8.25 15 8.25H18.5032C20.8015 8.25 22.559 10.2986 22.2096 12.5702L21.1326 19.5702C20.8512 21.3996 19.2771 22.75 17.4262 22.75H6.5929L6.5929 10.0693L10.0977 2.18352ZM5.0929 10.25H4C2.48122 10.25 1.25 11.4812 1.25 13V20C1.25 21.5188 2.48122 22.75 4 22.75H5.0929L5.0929 10.25Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconThumbsDownFilled.displayName = "IconThumbsDownFilled";
export default IconThumbsDownFilled;
