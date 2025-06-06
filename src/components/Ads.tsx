import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdComponentProps {
  className?: string;
  adType?: string;
  ariaLabel?: string;
}

export const AdComponent = ({
  className,
  adType,
  ariaLabel,
}: AdComponentProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      aria-label={ariaLabel}
      data-ad-type={adType}
      className={`adsbygoogle${className ? ` ${className}` : ""}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-8842891399372573"
      data-ad-format="auto"
    ></ins>
  );
};
