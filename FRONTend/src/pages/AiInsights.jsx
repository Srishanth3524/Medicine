import React, { useState, useEffect } from 'react'
import { Sparkles, BrainCircuit, TrendingUp, AlertTriangle, PackageSearch, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'

const AiInsights = () => {
  const [analyzing, setAnalyzing] = useState(true)
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am GuardianAI. I monitor your inventory 24/7. How can I assist you today?' }
  ])

  useEffect(() => {
    // Simulate initial analysis
    const timer = setTimeout(() => {
      setAnalyzing(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleAsk = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: query }])
    const q = query
    setQuery('')
    setAnalyzing(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I've analyzed the inventory data. Based on the current consumption rate, you have adequate stock for the next 30 days."
      
      if (q.toLowerCase().includes('expir')) {
        aiResponse = "I detected 28 items expiring within the next 30 days. Priority: Amoxicillin 500mg (180 units) expires in 12 days. I recommend planning a restock soon."
      } else if (q.toLowerCase().includes('stock') || q.toLowerCase().includes('shortage')) {
        aiResponse = "Current stock trends indicate Paracetamol 650mg is depleting 15% faster than last month. You might face a shortage in approximately 8 days."
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div style={{ maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeUp 0.4s ease both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--mint), #0088cc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0,230,180,0.3)'
          }}>
            <Sparkles size={24} color="#080d14" />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #fff, var(--mint))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GuardianAI
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '14px' }}>
              Predictive analytics and smart inventory assistant
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Chat Interface */}
        <div style={{
          background: 'var(--bg-card)', 
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', 
          display: 'flex', 
          flexDirection: 'column',
          height: '600px',
          overflow: 'hidden',
          position: 'relative',
          animation: 'fadeUp 0.5s ease 100ms both'
        }}>
          {/* Chat header */}
          <div style={{ 
            padding: '20px 24px', 
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BrainCircuit size={18} color="var(--mint)" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px' }}>AI Assistant</span>
            </div>
            {analyzing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--mint)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                <Loader2 size={14} className="animate-spin" style={{ animation: 'spin 2s linear infinite' }} />
                ANALYZING
              </div>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '16px',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                animation: `fadeUp 0.4s ease both`
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: msg.role === 'user' ? 'var(--blue)' : 'linear-gradient(135deg, var(--mint), #080d14)',
                  border: msg.role === 'ai' ? '1px solid var(--mint)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {msg.role === 'ai' ? <Sparkles size={16} color="var(--mint)" /> : <span style={{ fontSize: '12px', fontWeight: 'bold' }}>MG</span>}
                </div>
                <div style={{
                  background: msg.role === 'user' ? 'var(--blue-dim)' : 'rgba(0,230,180,0.05)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(77,159,255,0.3)' : 'rgba(0,230,180,0.2)'}`,
                  padding: '16px 20px',
                  borderRadius: '16px',
                  borderTopLeftRadius: msg.role === 'ai' ? '4px' : '16px',
                  borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                  maxWidth: '80%',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  lineHeight: 1.6
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {analyzing && messages.length > 1 && (
              <div style={{ display: 'flex', gap: '16px', animation: 'fadeUp 0.4s ease' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--mint), #080d14)',
                  border: '1px solid var(--mint)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Sparkles size={16} color="var(--mint)" style={{ animation: 'pulse-mint 2s infinite' }} />
                </div>
                <div style={{
                  background: 'rgba(0,230,180,0.05)',
                  border: '1px solid rgba(0,230,180,0.2)',
                  padding: '16px 20px',
                  borderRadius: '16px', borderTopLeftRadius: '4px',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', animation: 'pulse 1s infinite 0ms' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', animation: 'pulse 1s infinite 200ms' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', animation: 'pulse 1s infinite 400ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)' }}>
            <form onSubmit={handleAsk} style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask about expiring items, stock trends..."
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border)',
                  borderRadius: '100px',
                  padding: '16px 60px 16px 24px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--mint)'
                  e.target.style.boxShadow = '0 0 0 2px rgba(0,230,180,0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button type="submit" style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--mint)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
              >
                <ArrowRight size={18} color="#080d14" />
              </button>
            </form>
          </div>
        </div>

        {/* AI Recommendations Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '24px',
            animation: 'fadeUp 0.5s ease 200ms both'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} color="var(--mint)" />
              Smart Insights
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', marginTop: '6px', flexShrink: 0, boxShadow: '0 0 10px var(--amber)' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Demand Spike Predicted</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Analysis shows a 30% increase in Antivirals required next week based on historical data.</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', marginTop: '6px', flexShrink: 0, boxShadow: '0 0 10px var(--red)' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Wastage Warning</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>180 units of Amoxicillin will expire before projected usage. Consider redistribution.</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--mint)', marginTop: '6px', flexShrink: 0, boxShadow: '0 0 10px var(--mint)' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Optimal Restock</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Supplier prices for Ibuprofen are 5% lower this week. Good time to restock.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '24px',
            animation: 'fadeUp 0.5s ease 300ms both'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PackageSearch size={16} color="var(--blue)" />
              Auto-Generated Order
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              AI has compiled a draft purchase order based on critical low stock and expiry replacements.
            </p>
            <button style={{
              width: '100%', background: 'var(--blue-dim)',
              border: '1px solid var(--blue)', color: 'var(--blue)',
              padding: '12px', borderRadius: '8px',
              fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-display)',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--blue)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--blue-dim)'
              e.currentTarget.style.color = 'var(--blue)'
            }}
            >
              REVIEW AI DRAFT ORDER
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-mint {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default AiInsights
