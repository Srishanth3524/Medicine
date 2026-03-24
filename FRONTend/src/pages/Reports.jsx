import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { Download, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const monthlyExpiry = [
  { month: 'Apr', expiring: 12, added: 45, removed: 18 },
  { month: 'May', expiring: 8, added: 52, removed: 22 },
  { month: 'Jun', expiring: 20, added: 38, removed: 31 },
  { month: 'Jul', expiring: 5, added: 61, removed: 14 },
  { month: 'Aug', expiring: 15, added: 44, removed: 20 },
  { month: 'Sep', expiring: 9, added: 57, removed: 25 },
  { month: 'Oct', expiring: 18, added: 49, removed: 28 },
  { month: 'Nov', expiring: 24, added: 36, removed: 35 },
  { month: 'Dec', expiring: 31, added: 68, removed: 42 },
  { month: 'Jan', expiring: 15, added: 54, removed: 19 },
  { month: 'Feb', expiring: 22, added: 38, removed: 27 },
  { month: 'Mar', expiring: 28, added: 51, removed: 33 },
]

const categoryStock = [
  { category: 'Analgesics', stock: 325, ideal: 400 },
  { category: 'Antibiotics', stock: 300, ideal: 350 },
  { category: 'Vitamins', stock: 180, ideal: 200 },
  { category: 'Antivirals', stock: 95, ideal: 150 },
  { category: 'Antacids', stock: 210, ideal: 220 },
  { category: 'Antidiabetic', stock: 80, ideal: 120 },
]

const METRICS = [
  { label: 'Total Medicines Tracked', value: '481', change: '+12', trend: 'up', period: 'vs last month' },
  { label: 'Expired & Removed', value: '33', change: '+6', trend: 'down', period: 'this month' },
  { label: 'SMS Alerts Sent', value: '47', change: '+8', trend: 'up', period: 'this month' },
  { label: 'Reorders Triggered', value: '9', change: '-2', trend: 'up', period: 'vs last month' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', padding: '12px 16px',
      fontFamily: 'var(--font-mono)', fontSize: '12px',
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, marginBottom: '3px' }}>
          {p.name}: <span style={{ color: 'var(--text-primary)' }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Reports() {
  return (
    <div style={{ maxWidth: 1400 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', animation: 'fadeUp 0.4s ease both' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Analytics & Reports
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>
            12-month inventory performance overview
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)', padding: '11px 18px',
          color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer',
          transition: 'all 0.15s',
          fontFamily: 'var(--font-mono)',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--mint)'; e.currentTarget.style.color = 'var(--mint)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          <Download size={14} /> EXPORT PDF
        </button>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {METRICS.map((m, i) => {
          const TIcon = m.trend === 'up' ? TrendingUp : m.trend === 'down' ? TrendingDown : Minus
          const isGood = (m.label.includes('Tracked') || m.label.includes('SMS') || m.label.includes('Reorder')) ? m.trend === 'up' : m.trend === 'up'
          return (
            <div key={m.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '22px',
              animation: `fadeUp 0.4s ease ${i * 80}ms both`,
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '12px', letterSpacing: '0.5px' }}>
                {m.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1 }}>
                {m.value}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                <TIcon size={13} color={m.trend === 'up' ? 'var(--mint)' : 'var(--red)'} />
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: m.trend === 'up' ? 'var(--mint)' : 'var(--red)' }}>
                  {m.change}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{m.period}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Monthly trend chart */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '28px',
        marginBottom: '24px',
        animation: 'fadeUp 0.4s ease 320ms both',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>
          Monthly Movement
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>
          Added vs Removed vs Expiring · Apr 2024 – Mar 2025
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyExpiry} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#445566', fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#445566', fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="added" name="Added" stroke="#00e6b4" strokeWidth={2} dot={{ fill: '#00e6b4', r: 3 }} />
            <Line type="monotone" dataKey="removed" name="Removed" stroke="#4d9fff" strokeWidth={2} dot={{ fill: '#4d9fff', r: 3 }} />
            <Line type="monotone" dataKey="expiring" name="Expiring" stroke="#ff4e6a" strokeWidth={2} dot={{ fill: '#ff4e6a', r: 3 }} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
          {[{ color: '#00e6b4', label: 'Added' }, { color: '#4d9fff', label: 'Removed' }, { color: '#ff4e6a', label: 'Expiring' }].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ width: 20, height: 2, background: l.color, borderRadius: 1 }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Category stock bar chart */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '28px',
        animation: 'fadeUp 0.4s ease 400ms both',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>
          Stock vs Ideal by Category
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>
          Current stock levels against recommended inventory targets
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={categoryStock} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#445566', fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#445566', fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="ideal" name="Ideal" fill="rgba(77,159,255,0.2)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="stock" name="Current" fill="#00e6b4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
