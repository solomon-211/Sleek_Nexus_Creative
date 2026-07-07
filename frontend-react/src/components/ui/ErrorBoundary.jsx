import { Component } from 'react'

/**
 * ErrorBoundary — catches unhandled React render errors and shows a
 * user-friendly fallback instead of a blank white screen.
 *
 * Usage: wrap around <Layout> or individual route groups in App.jsx.
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '', stack: '' }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || 'An unexpected error occurred.',
      stack:   import.meta.env.DEV ? (error?.stack || '') : '',
    }
  }

  componentDidCatch(error, info) {
    // In production you'd send this to an error monitoring service (e.g. Sentry)
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '', stack: '' })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16">
        <div className="text-center max-w-lg w-full">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-triangle-exclamation text-primary text-3xl" aria-hidden="true" />
          </div>

          {/* SNC badge */}
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary bg-primary/8 border border-primary/15 px-3 py-1.5 rounded-full mb-4">
            <span className="text-primary">S</span><span className="text-accent">N</span><span className="text-primary">C</span>
            <span className="text-gray-400 font-normal ml-1">Error</span>
          </div>

          <h1 className="text-2xl font-heading font-bold text-dark mb-3">Something went wrong</h1>
          <p className="text-muted text-sm leading-relaxed mb-2">
            An unexpected error occurred on this page. We've been notified and will fix it shortly.
          </p>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Try refreshing the page, or head back to the homepage.
          </p>

          {/* Dev-only stack trace */}
          {this.state.stack && (
            <details className="text-left mb-6 bg-gray-100 rounded-xl p-4 border border-gray-200">
              <summary className="text-xs font-semibold text-muted cursor-pointer mb-2">
                Error details (dev only)
              </summary>
              <pre className="text-xs text-red-600 overflow-auto whitespace-pre-wrap leading-relaxed">
                {this.state.message}{'\n\n'}{this.state.stack}
              </pre>
            </details>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { this.handleReset(); window.location.reload() }}
              className="btn-primary"
            >
              <i className="fas fa-rotate-right" /> Refresh Page
            </button>
            <a href="/" className="btn-secondary">
              <i className="fas fa-home" /> Go Home
            </a>
            <a href="mailto:info@sleeknexuscreative.com" className="btn-secondary">
              <i className="fas fa-envelope" /> Report Issue
            </a>
          </div>
        </div>
      </div>
    )
  }
}
