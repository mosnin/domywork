import { useEffect } from "react";

interface AdSenseBannerProps {
  index: number;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseBanner({ index }: AdSenseBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="w-full py-4 bg-card">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXX" // Replace with actual AdSense publisher ID
        data-ad-slot={`banner-${index}`} // Unique ad slot for each instance
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
