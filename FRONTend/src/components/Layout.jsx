import React from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '240px' }}>
        <TopBar />
        <main style={{
          marginTop: '64px',
          padding: '32px',
          minHeight: 'calc(100vh - 64px)',
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
