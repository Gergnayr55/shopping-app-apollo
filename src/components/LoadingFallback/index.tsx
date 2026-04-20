import { ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingFallback.css";

function LoadingFallback(): ReactElement {
  return (
    <div className="loading-fallback">
      <CircularProgress />
    </div>
  );
}

export default LoadingFallback;
