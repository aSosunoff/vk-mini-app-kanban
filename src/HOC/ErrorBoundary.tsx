import React, { ErrorInfo } from "react";

type ErrorBoundaryType = { children: (error: boolean) => React.ReactNode };

class ErrorBoundary extends React.Component<ErrorBoundaryType, { hasError: boolean }> {
  constructor(props: ErrorBoundaryType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    /* console.log(error); */
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    /* this.setState({ hasError: true }); */
  }

  render() {
    return this.props.children(this.state.hasError);
  }
}

export default ErrorBoundary;
