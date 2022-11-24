import React from "react";
import DelayedFallback from "./DelayedFallback";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // po przechwyceniu błędu aktualizujemy stan i wyświetlimy w przyszłości zastępcze UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // jeśli wystąpił błąd wyświetl zastępcze UI
      return <DelayedFallback />;
    }
    // w innym przypadku wyświetlaj komponenty w normalny sposób
    return this.props.children;
  }
}

export default ErrorBoundary;
