import React from "react";
import DelayedFallback from "./DelayedFallback";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <DelayedFallback />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
