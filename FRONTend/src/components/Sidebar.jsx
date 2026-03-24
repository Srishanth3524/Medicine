import React from 'react'
import { NavLink } from 'react-router-dom'
import { Shield, LayoutDashboard, Package2, BellRing, BarChart3, Sparkles } from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory', icon: Package2, label: 'Inventory' },
  { to: '/alerts', icon: BellRing, label: 'Alerts', badge: 3 },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/ai-insights', icon: Sparkles, label: 'GuardianAI', badge: 'NEW' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 99, backdropFilter: 'blur(2px)',
            display: 'none'
          }}
        />
      )}
      <aside className="sidebar" style={{
        position: 'fixed', left: 0, top: 0, bottom: 0,
        width: '240px',
        background: 'linear-gradient(180deg, #0d1520 0%, #080d14 100%)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        zIndex: 100,
        padding: '0',
      }}>
        {/* Logo */}
        <div style={{
          padding: '28px 24px 24px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, var(--mint) 0%, #00b894 100%)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px var(--mint-glow)',
              flexShrink: 0,
            }}>
              <Shield size={18} color="#080d14" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                MedGuardian
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
                v1.0 · INVENTORY
              </div>
            </div>
          </div>
        </div>

        {/* Live status */}
        <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,230,180,0.06)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 12px',
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--mint)',
              animation: 'pulse-mint 2s infinite',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mint)', letterSpacing: '0.5px' }}>
              SYSTEM ONLINE
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', padding: '0 10px', marginBottom: '8px' }}>
            NAVIGATION
          </div>
          {NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: isActive ? 'var(--mint)' : 'var(--text-secondary)',
                background: isActive ? 'var(--mint-dim)' : 'transparent',
                border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                fontSize: '14px', fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease',
                position: 'relative',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} strokeWidth={isActive ? 2 : 1.5} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {badge && (
                    <span style={{
                      background: 'var(--red)', color: '#fff',
                      fontSize: '10px', fontWeight: 700,
                      borderRadius: '10px', padding: '1px 7px',
                      fontFamily: 'var(--font-mono)',
                      animation: 'blinkAlert 2.5s infinite',
                    }}>{badge}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom info */}
        <div style={{
          padding: '16px 24px 24px',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <div>LAST SYNC</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '3px' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
