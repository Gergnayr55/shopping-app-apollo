import React, { ReactElement, useState } from "react";
import { Box } from "@mui/material";
import Image from "../Image";
interface ZoomCursorProps {
  src: string;
  width?: string;
  height?: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

export default function ZoomCursor({
  src,
  width,
  height,
  magnifierHeight = 100,
  magnifierWidth = 100,
  zoomLevel = 1.75,
}: ZoomCursorProps): ReactElement {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <Box
      sx={{
        position: "relative",
        width: width,
      }}
    >
      <Image
        src={src}
        customStyle={{
          height: width,
          width: width,
          objectFit: "contain",
          borderStyle: "none",
          imageRendering: "auto",
        }}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
      />

      <Box
        sx={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          height: {
            xs: `${magnifierHeight * 3}px`,
            md: `${magnifierHeight * 6}px`,
          },
          width: {
            xs: `${magnifierWidth * 3}px`,
            md: `${magnifierWidth * 6}px`,
          },
          opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          top: {
            xs: `${y - magnifierHeight}px`,
            md: `${y - magnifierHeight / 2}px`,
          },
          left: {
            xs: `${x - magnifierWidth * -0.5}px`,
            md: `${x - magnifierWidth * -2}px`,
          },
          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          zIndex: 1000,
          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </Box>
  );
}
