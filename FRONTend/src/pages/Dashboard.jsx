import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Package2, AlertTriangle, CheckCircle2, TrendingDown, ArrowUpRight, ArrowDownRight, Pill, Thermometer, Stethoscope, Syringe } from 'lucide-react'

const areaData = [
  { month: 'Oct', total: 420, expiring: 18, added: 45 },
  { month: 'Nov', total: 398, expiring: 24, added: 32 },
  { month: 'Dec', total: 445, expiring: 31, added: 67 },
  { month: 'Jan', total: 467, expiring: 15, added: 54 },
  { month: 'Feb', total: 452, expiring: 22, added: 38 },
  { month: 'Mar', total: 481, expiring: 28, added: 51 },
]

const categoryData = [
  { name: 'Analgesics', value: 28, color: '#00e6b4' },
  { name: 'Antibiotics', value: 22, color: '#4d9fff' },
  { name: 'Vitamins', value: 18, color: '#f5a623' },
  { name: 'Antivirals', value: 15, color: '#ff4e6a' },
  { name: 'Other', value: 17, color: '#445566' },
]

const recentActivity = [
  { action: 'Added', item: 'Amoxicillin 500mg', qty: '+120 units', time: '2h ago', type: 'add' },
  { action: 'Alert', item: 'Paracetamol 650mg', qty: 'Exp. in 7 days', time: '4h ago', type: 'alert' },
  { action: 'Removed', item: 'Cough Syrup 100ml', qty: '−24 units', time: '6h ago', type: 'remove' },
  { action: 'Alert', item: 'Vitamin D3 60K', qty: 'Exp. in 3 days', time: '8h ago', type: 'alert' },
  { action: 'Added', item: 'Ibuprofen 400mg', qty: '+60 units', time: '1d ago', type: 'add' },
]

const STAT_CARDS = [
  {
    label: 'Total Medicines',
    value: '481',
    sub: '+12 this week',
    trend: 'up',
    icon: Package2,
    color: 'var(--mint)',
    bg: 'var(--mint-dim)',
  },
  {
    label: 'Expiring Soon',
    value: '28',
    sub: 'Within 30 days',
    trend: 'down',
    icon: AlertTriangle,
    color: 'var(--amber)',
    bg: 'var(--amber-dim)',
  },
  {
    label: 'Critical Alerts',
    value: '3',
    sub: 'Within 7 days',
    trend: 'down',
    icon: Thermometer,
    color: 'var(--red)',
    bg: 'var(--red-dim)',
  },
  {
    label: 'In Good Stock',
    value: '443',
    sub: '92% of inventory',
    trend: 'up',
    icon: CheckCircle2,
    color: 'var(--blue)',
    bg: 'var(--blue-dim)',
  },
]

function StatCard({ card, delay }) {
  const Icon = card.icon
  const TrendIcon = card.trend === 'up' ? ArrowUpRight : ArrowDownRight

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      animation: `fadeUp 0.5s ease ${delay}ms both`,
      transition: 'border-color 0.2s, transform 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = card.color + '44'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100, borderRadius: '50%',
        background: card.bg,
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '11px',
          background: card.bg, border: `1px solid ${card.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={20} color={card.color} strokeWidth={1.8} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          fontSize: '11px', fontFamily: 'var(--font-mono)',
          color: card.trend === 'up' ? 'var(--mint)' : 'var(--red)',
        }}>
          <TrendIcon size={13} />
        </div>
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-primary)', lineHeight: 1 }}>
        {card.value}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
        {card.label}
      </div>
      <div style={{
        marginTop: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)',
        color: card.color, letterSpacing: '0.3px',
      }}>
        {card.sub}
      </div>
    </div>
  )
}

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
        <div key={p.name} style={{ color: p.color, marginBottom: '2px' }}>
          {p.name}: <span style={{ color: 'var(--text-primary)' }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.4s ease both' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Inventory Overview
          </h1>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--mint)',
            background: 'var(--mint-dim)', padding: '3px 10px', borderRadius: '20px',
            border: '1px solid var(--border-accent)',
          }}>LIVE</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>
          Real-time medicine stock and expiry monitoring
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        {STAT_CARDS.map((card, i) => (
          <StatCard key={card.label} card={card} delay={i * 80} />
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', marginBottom: '28px' }}>
        {/* Area Chart */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '24px',
          animation: 'fadeUp 0.5s ease 320ms both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>Stock Trend</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>Oct 2024 — Mar 2025</div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[{ color: 'var(--mint)', label: 'Total' }, { color: 'var(--red)', label: 'Expiring' }].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '2px', background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={areaData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradMint" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e6b4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00e6b4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4e6a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ff4e6a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#445566', fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#445566', fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" name="Total" stroke="#00e6b4" strokeWidth={2} fill="url(#gradMint)" dot={false} />
              <Area type="monotone" dataKey="expiring" name="Expiring" stroke="#ff4e6a" strokeWidth={2} fill="url(#gradRed)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '24px',
          animation: 'fadeUp 0.5s ease 400ms both',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
            By Category
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '20px' }}>
            Distribution
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                dataKey="value" stroke="none" paddingAngle={3}>
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} opacity={0.9} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            {categoryData.map(cat => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '2px', background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{cat.name}</span>
                </div>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        animation: 'fadeUp 0.5s ease 480ms both',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>Recent Activity</div>
          <span style={{ fontSize: '12px', color: 'var(--mint)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>VIEW ALL →</span>
        </div>
        <div>
          {recentActivity.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '14px 24px',
              borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none',
              animation: `slideIn 0.4s ease ${500 + i * 60}ms both`,
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: item.type === 'add' ? 'var(--mint)' : item.type === 'alert' ? 'var(--amber)' : 'var(--red)',
              }} />
              <div style={{
                fontSize: '11px', fontFamily: 'var(--font-mono)',
                color: item.type === 'add' ? 'var(--mint)' : item.type === 'alert' ? 'var(--amber)' : 'var(--red)',
                minWidth: '60px',
              }}>
                {item.action.toUpperCase()}
              </div>
              <div style={{ flex: 1, fontSize: '14px', color: 'var(--text-primary)' }}>{item.item}</div>
              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{item.qty}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: '50px', textAlign: 'right' }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
