import React, { useState } from 'react'
import { AlertTriangle, Clock, Phone, CheckCircle, XCircle, Bell, ChevronRight } from 'lucide-react'

const ALERTS = [
  {
    id: 1, severity: 'critical', medicine: 'Vitamin D3 60K IU', expiry: '2025-03-28',
    daysLeft: 4, stock: 48, smsStatus: 'sent', location: 'Rack C-1',
    message: 'Medicine expires in 4 days. Immediate action required.',
    timestamp: '2025-03-24 09:15 AM',
  },
  {
    id: 2, severity: 'critical', medicine: 'Azithromycin 500mg', expiry: '2025-03-31',
    daysLeft: 7, stock: 60, smsStatus: 'sent', location: 'Rack A-2',
    message: 'Medicine expires in 7 days. Review stock levels.',
    timestamp: '2025-03-24 09:15 AM',
  },
  {
    id: 3, severity: 'critical', medicine: 'Dolo 650mg', expiry: '2025-03-30',
    daysLeft: 6, stock: 22, smsStatus: 'pending', location: 'Rack B-4',
    message: 'Critical expiry approaching. Low stock detected.',
    timestamp: '2025-03-24 09:15 AM',
  },
  {
    id: 4, severity: 'warning', medicine: 'Paracetamol 650mg', expiry: '2025-04-07',
    daysLeft: 14, stock: 85, smsStatus: 'sent', location: 'Rack B-3',
    message: 'Medicine expires in 14 days.',
    timestamp: '2025-03-23 06:00 AM',
  },
  {
    id: 5, severity: 'warning', medicine: 'Metformin 500mg', expiry: '2025-04-20',
    daysLeft: 27, stock: 30, smsStatus: 'scheduled', location: 'Rack E-1',
    message: 'Medicine expires within 30 days. Schedule reorder.',
    timestamp: '2025-03-22 06:00 AM',
  },
]

const SEV_STYLE = {
  critical: { color: 'var(--red)', bg: 'var(--red-dim)', border: 'rgba(255,78,106,0.25)', label: 'CRITICAL', Icon: XCircle },
  warning: { color: 'var(--amber)', bg: 'var(--amber-dim)', border: 'rgba(245,166,35,0.25)', label: 'WARNING', Icon: AlertTriangle },
}

const SMS_STYLE = {
  sent: { color: 'var(--mint)', label: '✓ SMS SENT' },
  pending: { color: 'var(--amber)', label: '⌛ PENDING' },
  scheduled: { color: 'var(--blue)', label: '⏰ SCHEDULED' },
}

export default function Alerts() {
  const [dismissed, setDismissed] = useState([])

  const visible = ALERTS.filter(a => !dismissed.includes(a.id))
  const critical = visible.filter(a => a.severity === 'critical')
  const warnings = visible.filter(a => a.severity === 'warning')

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.4s ease both' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Expiry Alerts
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>
          Automated monitoring · SMS notifications via Twilio
        </p>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px', animation: 'fadeUp 0.4s ease 80ms both' }}>
        {[
          { label: 'Critical (≤7 days)', value: critical.length, color: 'var(--red)', bg: 'var(--red-dim)' },
          { label: 'Warnings (≤30 days)', value: warnings.length, color: 'var(--amber)', bg: 'var(--amber-dim)' },
          { label: 'SMS Alerts Sent', value: ALERTS.filter(a => a.smsStatus === 'sent').length, color: 'var(--mint)', bg: 'var(--mint-dim)' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: '20px',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 800,
              color: s.color, letterSpacing: '-2px', lineHeight: 1,
              textShadow: `0 0 30px ${s.color}66`,
            }}>
              {s.value}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
              <div style={{
                marginTop: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)',
                color: s.color, background: s.bg, padding: '2px 8px',
                borderRadius: '10px', display: 'inline-block',
              }}>
                ACTIVE
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Twilio status bar */}
      <div style={{
        background: 'var(--mint-dim)', border: '1px solid var(--border-accent)',
        borderRadius: 'var(--radius-md)', padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '24px',
        animation: 'fadeUp 0.4s ease 160ms both',
      }}>
        <Phone size={15} color="var(--mint)" />
        <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--mint)' }}>
          TWILIO SMS ACTIVE
        </span>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '4px' }}>
          · Auto-alerts configured for 7-day and 30-day expiry thresholds
        </span>
        <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Last triggered: Today 09:15 AM
        </div>
      </div>

      {/* Alert list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {visible.map((alert, i) => {
          const sev = SEV_STYLE[alert.severity]
          const SevIcon = sev.Icon
          const sms = SMS_STYLE[alert.smsStatus]

          return (
            <div key={alert.id} style={{
              background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
              border: `1px solid ${sev.border}`,
              overflow: 'hidden',
              animation: `fadeUp 0.4s ease ${240 + i * 80}ms both`,
              boxShadow: alert.severity === 'critical' ? 'var(--shadow-red)' : 'none',
            }}>
              {/* Left accent bar */}
              <div style={{ display: 'flex' }}>
                <div style={{ width: 4, background: sev.color, flexShrink: 0 }} />
                <div style={{ flex: 1, padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* Days countdown */}
                      <div style={{
                        width: 64, height: 64, borderRadius: 'var(--radius-md)',
                        background: sev.bg, border: `1px solid ${sev.border}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: sev.color, lineHeight: 1 }}>
                          {alert.daysLeft}
                        </div>
                        <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: sev.color, letterSpacing: '0.5px', marginTop: '2px' }}>
                          DAYS
                        </div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                          <span style={{
                            fontSize: '10px', fontFamily: 'var(--font-mono)', color: sev.color,
                            background: sev.bg, padding: '2px 8px', borderRadius: '10px',
                            letterSpacing: '0.5px', border: `1px solid ${sev.border}`,
                            animation: alert.severity === 'critical' ? 'blinkAlert 2s infinite' : 'none',
                          }}>
                            {sev.label}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {alert.timestamp}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {alert.medicine}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          {alert.message}
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                          {[
                            { label: 'EXPIRY', val: alert.expiry },
                            { label: 'STOCK', val: `${alert.stock} units` },
                            { label: 'LOCATION', val: alert.location },
                          ].map(d => (
                            <div key={d.label} style={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                              <span style={{ color: 'var(--text-muted)' }}>{d.label}: </span>
                              <span style={{ color: 'var(--text-secondary)' }}>{d.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: sms.color }}>
                        {sms.label}
                      </span>
                      <button
                        onClick={() => setDismissed(d => [...d, alert.id])}
                        style={{
                          padding: '8px 14px', borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border)', background: 'transparent',
                          color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--mint)'; e.currentTarget.style.color = 'var(--mint)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                      >
                        DISMISS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {visible.length === 0 && (
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '64px',
            textAlign: 'center', animation: 'fadeUp 0.4s ease both',
          }}>
            <CheckCircle size={40} color="var(--mint)" style={{ margin: '0 auto 16px' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
              All Clear!
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              No active expiry alerts at this time.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
