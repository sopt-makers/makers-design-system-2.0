import { forwardRef } from "react";
import type { SVGProps } from "react";
const IconFacebook = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
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
        d="M13.884 23.9257C19.6164 23.0218 24 18.0592 24 12.0728C24 5.44534 18.6274 0.0727539 12 0.0727539C5.37258 0.0727539 0 5.44534 0 12.0728C0 18.0634 4.38971 23.0287 10.128 23.9276V15.5408H7.07997V12.0728H10.128V9.43281C10.128 6.42081 11.916 4.76481 14.664 4.76481C15.972 4.76481 17.352 5.00481 17.352 5.00481V7.95681H15.84C14.352 7.95681 13.884 8.88081 13.884 9.82881V12.0848H17.208L16.68 15.5528H13.884V23.9257Z"
        fill="currentColor"
      />
    </svg>
  ),
);
IconFacebook.displayName = "IconFacebook";
export default IconFacebook;
