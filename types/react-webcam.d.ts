declare module "react-webcam" {
  import * as React from "react";

  export interface WebcamProps {
    audio?: boolean;
    screenshotFormat?: string;
    className?: string;
    style?: React.CSSProperties;
    videoConstraints?: MediaTrackConstraints;
    mirrored?: boolean;
    width?: number | string;
    height?: number | string;
    onUserMedia?: () => void;
  }

  export interface WebcamHandle {
    getScreenshot(): string | null;
    video?: HTMLVideoElement;
    stream?: MediaStream;
  }

  const Webcam: React.ForwardRefExoticComponent<
    WebcamProps & React.RefAttributes<WebcamHandle>
  >;

  export default Webcam;
}
