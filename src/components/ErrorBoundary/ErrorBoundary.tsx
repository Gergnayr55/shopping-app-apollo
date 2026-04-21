import { Component, ReactNode, ErrorInfo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Typography variant="h6">
              Something went wrong. Please try again.
            </Typography>
          </Box>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
