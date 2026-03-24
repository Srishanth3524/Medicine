import React, { useState } from 'react'
import { Search, Plus, Filter, ChevronDown, Edit2, Trash2, Eye } from 'lucide-react'

const MEDICINES = [
  { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 240, expiry: '2025-12-15', manufacturer: 'Cipla', location: 'Rack A-1', status: 'good' },
  { id: 2, name: 'Paracetamol 650mg', category: 'Analgesic', stock: 85, expiry: '2025-04-07', manufacturer: 'Sun Pharma', location: 'Rack B-3', status: 'warning' },
  { id: 3, name: 'Vitamin D3 60K IU', category: 'Vitamin', stock: 48, expiry: '2025-03-28', manufacturer: 'Abbott', location: 'Rack C-1', status: 'critical' },
  { id: 4, name: 'Ibuprofen 400mg', category: 'Analgesic', stock: 180, expiry: '2026-06-30', manufacturer: 'Lupin', location: 'Rack A-3', status: 'good' },
  { id: 5, name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 120, expiry: '2026-01-10', manufacturer: 'Dr. Reddy', location: 'Rack D-2', status: 'good' },
  { id: 6, name: 'Metformin 500mg', category: 'Antidiabetic', stock: 30, expiry: '2025-04-20', manufacturer: 'USV', location: 'Rack E-1', status: 'warning' },
  { id: 7, name: 'Omeprazole 20mg', category: 'Antacid', stock: 96, expiry: '2026-09-15', manufacturer: 'Torrent', location: 'Rack B-1', status: 'good' },
  { id: 8, name: 'Azithromycin 500mg', category: 'Antibiotic', stock: 60, expiry: '2025-03-31', manufacturer: 'Cipla', location: 'Rack A-2', status: 'critical' },
]

const STATUS_STYLE = {
  good: { color: 'var(--mint)', bg: 'var(--mint-dim)', label: 'GOOD' },
  warning: { color: 'var(--amber)', bg: 'var(--amber-dim)', label: 'EXPIRING' },
  critical: { color: 'var(--red)', bg: 'var(--red-dim)', label: 'CRITICAL' },
}

function AddModal({ onClose }) {
  const [form, setForm] = useState({ name: '', category: '', stock: '', expiry: '', manufacturer: '', location: '' })
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)', padding: '32px', width: '520px',
        animation: 'fadeUp 0.3s ease both',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
          Add Medicine
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { label: 'Medicine Name', key: 'name', placeholder: 'e.g. Amoxicillin 500mg' },
            { label: 'Category', key: 'category', placeholder: 'e.g. Antibiotic' },
            { label: 'Stock (units)', key: 'stock', placeholder: '0', type: 'number' },
            { label: 'Expiry Date', key: 'expiry', placeholder: '', type: 'date' },
            { label: 'Manufacturer', key: 'manufacturer', placeholder: 'e.g. Cipla' },
            { label: 'Storage Location', key: 'location', placeholder: 'e.g. Rack A-1' },
          ].map(field => (
            <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                {field.label.toUpperCase()}
              </label>
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                style={{
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '10px 12px',
                  color: 'var(--text-primary)', fontSize: '14px',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--mint)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '10px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--text-secondary)', fontSize: '14px',
          }}>Cancel</button>
          <button onClick={onClose} style={{
            padding: '10px 24px', borderRadius: 'var(--radius-md)', border: 'none',
            background: 'var(--mint)', color: '#080d14', fontSize: '14px', fontWeight: 700,
            fontFamily: 'var(--font-display)',
          }}>Add Medicine</button>
        </div>
      </div>
    </div>
  )
}

export default function Inventory() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState('all')

  const filtered = MEDICINES.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || m.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ maxWidth: 1400 }}>
      {showAdd && <AddModal onClose={() => setShowAdd(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', animation: 'fadeUp 0.4s ease both' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Medicine Inventory
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>
            {MEDICINES.length} medicines tracked
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--mint)', color: '#080d14',
          border: 'none', borderRadius: 'var(--radius-md)',
          padding: '12px 20px', fontFamily: 'var(--font-display)',
          fontSize: '14px', fontWeight: 700,
          boxShadow: '0 4px 20px var(--mint-glow)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 28px var(--mint-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px var(--mint-glow)' }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Medicine
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', animation: 'fadeUp 0.4s ease 80ms both' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            placeholder="Search medicines, categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '11px 14px 11px 40px',
              color: 'var(--text-primary)', fontSize: '14px', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--mint)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        {['all', 'good', 'warning', 'critical'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '10px 18px', borderRadius: 'var(--radius-md)', fontSize: '12px',
            fontFamily: 'var(--font-mono)', border: '1px solid',
            cursor: 'pointer', transition: 'all 0.15s',
            background: filter === f
              ? (f === 'all' ? 'var(--mint-dim)' : f === 'good' ? 'var(--mint-dim)' : f === 'warning' ? 'var(--amber-dim)' : 'var(--red-dim)')
              : 'var(--bg-card)',
            borderColor: filter === f
              ? (f === 'all' ? 'var(--mint)' : f === 'good' ? 'var(--mint)' : f === 'warning' ? 'var(--amber)' : 'var(--red)')
              : 'var(--border)',
            color: filter === f
              ? (f === 'all' ? 'var(--mint)' : f === 'good' ? 'var(--mint)' : f === 'warning' ? 'var(--amber)' : 'var(--red)')
              : 'var(--text-secondary)',
          }}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        animation: 'fadeUp 0.4s ease 160ms both',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 80px 110px 1fr 1fr 90px',
          gap: '0', padding: '14px 24px',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {['Medicine', 'Category', 'Stock', 'Status', 'Expiry Date', 'Location', 'Actions'].map(h => (
            <div key={h} style={{
              fontSize: '10px', fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)', letterSpacing: '1px',
            }}>{h.toUpperCase()}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((med, i) => {
          const st = STATUS_STYLE[med.status]
          return (
            <div key={med.id} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 80px 110px 1fr 1fr 90px',
              gap: '0', padding: '16px 24px',
              borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
              animation: `slideIn 0.35s ease ${i * 50}ms both`,
              transition: 'background 0.15s',
              alignItems: 'center',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>{med.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{med.manufacturer}</div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{med.category}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: med.stock < 50 ? 'var(--amber)' : 'var(--text-primary)' }}>
                {med.stock}
              </div>
              <div>
                <span style={{
                  fontSize: '10px', fontFamily: 'var(--font-mono)',
                  color: st.color, background: st.bg,
                  padding: '4px 10px', borderRadius: '20px',
                  border: `1px solid ${st.color}44`,
                  letterSpacing: '0.5px',
                }}>
                  {st.label}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: med.status === 'critical' ? 'var(--red)' : 'var(--text-secondary)' }}>
                {med.expiry}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{med.location}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[Edit2, Eye, Trash2].map((Icon, j) => (
                  <button key={j} style={{
                    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'transparent', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.15s',
                    color: 'var(--text-muted)',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = j === 2 ? 'var(--red)' : 'var(--mint)'
                      e.currentTarget.style.color = j === 2 ? 'var(--red)' : 'var(--mint)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                  >
                    <Icon size={12} />
                  </button>
                ))}
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
            No medicines found
          </div>
        )}
      </div>
    </div>
  )
}
