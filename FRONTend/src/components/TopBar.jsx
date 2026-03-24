import React from 'react'
import { useLocation } from 'react-router-dom'
import { BellRing } from 'lucide-react'
import { NAV_ITEMS } from './Sidebar'

export default function TopBar({ onMenuClick }) {
  const location = useLocation()
  const current = NAV_ITEMS.find(n =>
    n.to === '/' ? location.pathname === '/' : location.pathname.startsWith(n.to)
  )

  return (
    <header style={{
      position: 'fixed', top: 0, left: '240px', right: 0,
      height: '64px',
      background: 'rgba(8,13,20,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 32px',
      zIndex: 50,
      gap: '16px',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, letterSpacing: '-0.3px' }}>
          {current?.label || 'MedGuardian'}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Alert banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'var(--red-dim)', border: '1px solid rgba(255,78,106,0.3)',
        borderRadius: 'var(--radius-sm)', padding: '6px 14px',
      }}>
        <BellRing size={13} color="var(--red)" />
        <span style={{ fontSize: '12px', color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>
          3 EXPIRY ALERTS
        </span>
      </div>

      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1a2a3a, #0d1520)',
        border: '1px solid var(--border-accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 700, color: 'var(--mint)',
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
      }}>
        MG
      </div>
    </header>
  )
}
