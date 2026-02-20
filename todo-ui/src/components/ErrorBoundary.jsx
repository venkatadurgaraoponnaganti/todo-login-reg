import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('UI runtime error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='container mt-4'>
          <div className='alert alert-danger'>
            Something went wrong while rendering this page. Please refresh and try again.
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
