import { Component } from 'react';
import { reportError } from '../Utils/errors';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    reportError(`${error?.message || 'Render error'}\n${info?.componentStack || ''}`);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#231f10] dark:bg-[#0e0c07] text-white p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
            <p className="opacity-80">Please refresh the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
