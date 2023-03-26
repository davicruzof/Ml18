import React from "react";

import { Container } from "./styles";

const VideoComponent: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  return videoUrl.length > 0 ? <Container controls src={videoUrl} /> : null;
};

export default VideoComponent;
