import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface FullscreenAdProps {
  onClose: () => void;
}

export default function FullscreenAd({ onClose }: FullscreenAdProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; 
    const interval = 100;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        onClose();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-card w-full max-w-lg rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Advertisement</h2>
            <div className="aspect-video bg-muted rounded-md mb-4" />
            <Progress value={progress} className="mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              Please wait {Math.ceil((100 - progress) / 20)} seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}