import React, { ReactElement, CSSProperties, MouseEvent } from "react";
import { useImageOnLoad } from "usehooks-ts";
import { Box } from "@mui/material";

interface ImageProps {
  src: string;
  customStyle: CSSProperties;
  onMouseLeave?: () => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
}
export default function Image({
  src,
  customStyle = {},
  onMouseLeave,
  onMouseMove,
  onMouseEnter,
}: ImageProps): ReactElement {
  const { handleImageOnLoad, css } = useImageOnLoad();

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "145px", md: 400 },
        height: { xs: "145px", md: 400 },
        margin: { xs: "10px auto 0", md: "70px auto 0" },
      }}
    >
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`,
          ...(css.thumbnail as CSSProperties),
          ...customStyle,
        }}
        src={src}
        alt="thumbnail"
      />
      <img
        onLoad={handleImageOnLoad}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`,
          ...(css.fullSize as CSSProperties),
          ...customStyle,
        }}
        src={src}
        alt="fullImage"
      />
    </Box>
  );
}
