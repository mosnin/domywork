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
    <div className="max-w-full mx-4 my-2 bg-card border rounded-md shadow-sm">
      <div className="h-24 overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXX" // Replace with actual AdSense publisher ID
          data-ad-slot={`banner-${index}`} // Unique ad slot for each instance
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
        />
      </div>
    </div>
  );
}