import { ReactElement, CSSProperties, MouseEvent, useState } from "react";
import Box from "@mui/material/Box";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageOnLoad = () => setIsLoaded(true);
  const css = {
    thumbnail: {
      visibility: isLoaded ? "hidden" : "visible",
      filter: "blur(8px)",
      transition: "visibility 0ms ease-out 500ms",
    },
    fullSize: {
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 500ms ease-in 0ms",
    },
  };

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
