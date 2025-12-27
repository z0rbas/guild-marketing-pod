import React, { useState, useEffect, useRef } from 'react';

const ProofOfWork = () => {
  const [activeTab, setActiveTab] = useState('stats');
  
  const results = [
    { metric: '127', label: 'Appointments Set', sublabel: 'This month (↑ from 89)', icon: '📅' },
    { metric: '34', label: 'Deals Closed', sublabel: 'This month (↑ from 22)', icon: '🤝' },
    { metric: '$89K', label: 'Revenue Generated', sublabel: 'For clients this month', icon: '💰' },
    { metric: '12', label: 'Active Campaigns', sublabel: 'Across 6 industries', icon: '📡' },
  ];

  const testimonials = [
    {
      quote: "I was bagging groceries at $15/hr, living at home, no idea what I wanted to do. Three months into the Pod, I closed my first $2,400 week—setting appointments for a roofing company in Texas. My manager at the store couldn't believe I quit.",
      name: "Marcus T.",
      age: 19,
      phase: "Phase 3 Setter",
      result: "$2,400/week"
    },
    {
      quote: "My parents were furious when I said no to university. They'd saved for years. Three months later, I showed them my first $5K month closing deals for a SaaS company. Now my dad asks ME for business advice.",
      name: "Sarah K.",
      age: 21,
      phase: "Phase 4 Closer",
      result: "$5,000/month"
    },
    {
      quote: "I was $12K into a business degree when I realized I was learning theory from professors who'd never run a business. Dropped out. Six months in the Pod and I've made $25K, learned more, and actually helped real companies grow.",
      name: "James R.",
      age: 20,
      phase: "Phase 4 Closer",
      result: "$4,200/month"
    },
  ];

  const campaigns = [
    { client: "HVAC Company (Texas)", type: "Cold Email", status: "Active", appointments: "23 this month" },
    { client: "Roofing Contractor (Florida)", type: "LinkedIn DM", status: "Active", appointments: "18 this month" },
    { client: "SaaS Startup (Remote)", type: "Multi-channel", status: "Active", appointments: "31 this month" },
    { client: "Coaching Business (CA)", type: "Cold Email", status: "Active", appointments: "15 this month" },
  ];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Proof of Work
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
        We don't just talk about results. We show them. Here's what the Pod is producing right now.
      </p>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {[
          { id: 'stats', label: 'Live Stats' },
          { id: 'testimonials', label: 'Member Wins' },
          { id: 'campaigns', label: 'Active Campaigns' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: activeTab === tab.id ? 'rgba(212,175,55,0.2)' : '#1a1a22',
              border: `1px solid ${activeTab === tab.id ? '#d4af37' : '#2a2a35'}`,
              borderRadius: 6,
              color: activeTab === tab.id ? '#d4af37' : '#6a6a7a',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === 'stats' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {results.map((item, i) => (
              <div key={i} style={{
                padding: 14,
                background: '#1a1a22',
                borderRadius: 8,
                border: '1px solid #2a2a35',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#d4af37', marginBottom: 2 }}>
                  {item.metric}
                </div>
                <div style={{ fontSize: 11, color: '#e0e0e0', marginBottom: 2 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 10, color: '#4a4a5a' }}>
                  {item.sublabel}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            padding: 14,
            background: 'rgba(212,175,55,0.05)',
            borderRadius: 8,
            border: '1px solid rgba(212,175,55,0.1)',
          }}>
            <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 6 }}>
              📊 What this means:
            </div>
            <p style={{ fontSize: 12, color: '#8a8a9a', margin: 0, lineHeight: 1.6 }}>
              These aren't vanity metrics. Every appointment is a real business owner sitting down for a sales call. 
              Every closed deal is real revenue for real clients. <strong style={{ color: '#e0e0e0' }}>This is what you'll be doing.</strong>
            </p>
          </div>
        </>
      )}
      
      {activeTab === 'testimonials' && (
        <div>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              padding: 16,
              background: '#1a1a22',
              borderRadius: 8,
              border: '1px solid #2a2a35',
              marginBottom: 12,
            }}>
              <p style={{ fontSize: 13, color: '#e0e0e0', fontStyle: 'italic', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#d4af37', fontWeight: 600 }}>
                    {t.name}, {t.age}
                  </div>
                  <div style={{ fontSize: 10, color: '#6a6a7a' }}>
                    {t.phase}
                  </div>
                </div>
                <div style={{
                  padding: '6px 10px',
                  background: 'rgba(212,175,55,0.1)',
                  borderRadius: 4,
                  fontSize: 11,
                  color: '#d4af37',
                  fontWeight: 600,
                }}>
                  {t.result}
                </div>
              </div>
            </div>
          ))}
          
          <div style={{
            padding: 12,
            background: 'rgba(212,175,55,0.05)',
            borderRadius: 8,
            fontSize: 11,
            color: '#6a6a7a',
            textAlign: 'center',
          }}>
            200+ members trained since 2024. These are real people. Real results. Your story could be next.
          </div>
        </div>
      )}
      
      {activeTab === 'campaigns' && (
        <div>
          <div style={{
            padding: 12,
            background: 'rgba(212,175,55,0.05)',
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 11,
            color: '#8a8a9a',
            lineHeight: 1.6,
          }}>
            🔴 <strong style={{ color: '#d4af37' }}>Live campaigns</strong> — These are real client campaigns running right now. 
            Pod members are actively working on these, booking appointments, and earning commissions.
          </div>
          
          {campaigns.map((c, i) => (
            <div key={i} style={{
              padding: 14,
              background: '#1a1a22',
              borderRadius: 8,
              border: '1px solid #2a2a35',
              marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, color: '#e0e0e0', fontWeight: 600 }}>
                    {c.client}
                  </div>
                  <div style={{ fontSize: 11, color: '#6a6a7a' }}>
                    {c.type}
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  background: 'rgba(80,200,120,0.1)',
                  border: '1px solid rgba(80,200,120,0.2)',
                  borderRadius: 4,
                  fontSize: 10,
                  color: '#50c878',
                }}>
                  {c.status}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#d4af37' }}>
                📅 {c.appointments}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProofOfWork;