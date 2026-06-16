import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '' }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown error' }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-triangle-exclamation text-primary text-3xl" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-dark mb-3">Something went wrong</h1>
            <p className="text-muted text-sm mb-6">An unexpected error occurred. Please try refreshing the page or go back to home.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => window.location.reload()}
                className="btn-primary">
                <i className="fas fa-rotate-right" /> Refresh Page
              </button>
              <a href="/" className="btn-secondary">Go Home</a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
