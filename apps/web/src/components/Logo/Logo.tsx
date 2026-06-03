import * as styles from "./Logo.css";

/** Figma 심볼형 로고 마크. 색은 부모의 currentColor를 따른다. */
function LogoSymbol() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.37073 17.8757V14.4269C9.37073 13.9553 9.57905 13.5077 9.93992 13.204L20.8917 3.98743C21.3285 3.61983 21.9957 3.93035 21.9957 4.50126L21.9957 8.00105C21.9958 8.47424 21.7861 8.92311 21.4232 9.2268L10.4733 18.3907C10.0362 18.7566 9.37073 18.4458 9.37073 17.8757Z"
        fill="currentColor"
      />
      <rect
        x="17.7928"
        y="18.5459"
        width="4.20727"
        height="4.20723"
        rx="0.671573"
        transform="rotate(-90 17.7928 18.5459)"
        fill="currentColor"
      />
      <path
        d="M12.4743 3.9861C12.9111 3.6185 13.5778 3.92887 13.5778 4.49977V7.99977C13.5777 8.47288 13.3683 8.92172 13.0055 9.22536L5.16077 15.7908V17.8718C5.16068 18.2427 4.85974 18.5437 4.4889 18.5437H1.69886C1.36979 18.5792 1.03971 18.3615 0.968391 18.0144C0.967407 18.0099 0.966353 18.0053 0.965461 18.0008C0.958002 17.9602 0.952766 17.9176 0.952766 17.8738V14.4256C0.952766 13.9541 1.16146 13.5066 1.5221 13.2029L12.4743 3.9861Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 심볼 + 워드마크로 구성된 makers design system 로고. */
export function Logo() {
  return (
    <span className={styles.logo}>
      <LogoSymbol />
      <span className={styles.wordmark}>Makers design system</span>
    </span>
  );
}
