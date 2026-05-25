import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconThumbsUpFilled = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        d="M13.9248 21.8165C13.6725 22.3842 13.1096 22.75 12.4884 22.75C10.7123 22.75 9.27253 21.3102 9.27253 19.5342V16C9.27253 15.8619 9.1606 15.75 9.02253 15.75H5.51936C3.22104 15.75 1.46349 13.7014 1.81297 11.4298L2.88989 4.42978C3.17133 2.60041 4.74539 1.25 6.59628 1.25H17.4296L17.4296 13.9307L13.9248 21.8165ZM18.9296 13.75H20.0225C21.5413 13.75 22.7725 12.5188 22.7725 11V4C22.7725 2.48122 21.5413 1.25 20.0225 1.25H18.9296V13.75Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconThumbsUpFilled.displayName = "IconThumbsUpFilled";
export default IconThumbsUpFilled;
