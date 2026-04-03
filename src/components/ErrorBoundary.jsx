import * as THREE from 'three'
import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#050510',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'monospace', color: '#ff4444', padding: 32, zIndex: 9999
        }}>
          <h2 style={{ color: '#ff44aa', marginBottom: 16 }}>SYSTEM ERROR</h2>
          <pre style={{ background: '#0a0a1a', padding: 16, borderRadius: 8, maxWidth: 600, overflow: 'auto', fontSize: '0.85rem', color: '#cc88ff' }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <p style={{ marginTop: 16, color: '#666', fontSize: '0.8rem' }}>Check console for details</p>
        </div>
      )
    }
    return this.props.children
  }
}
