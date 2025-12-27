import React, { useState, useEffect, useRef } from 'react';

const TheCode = () => {
  const values = [
    { 
      title: 'Honour', 
      desc: 'If you say 9am, you\'re there at 8:55.',
      expanded: 'In a world of broken promises and ghosted commitments, we do what we say. Every time. No exceptions. This is the foundation everything else is built on.',
      examples: ['Meeting at 9am? Be there at 8:55.', 'Said you\'d send it today? It\'s in their inbox by 5pm.', 'Made a mistake? Own it within the hour, not the week.']
    },
    { 
      title: 'Sovereignty', 
      desc: 'Lost a deal? It\'s on you. Won a deal? Also you.',
      expanded: 'You are 100% responsible for your results. Not your circumstances, not your past, not the market. You. This is terrifying and liberating at the same time.',
      examples: ['Lead didn\'t respond? Test a new approach.', 'Campaign underperforming? Find the fix.', 'Need something done? Don\'t wait to be asked.']
    },
    { 
      title: 'Service', 
      desc: 'Would you sell this to your mom?',
      expanded: 'We\'re not here to extract value — we\'re here to create it. Every appointment we book, every deal we close, should leave the client better off than before.',
      examples: ['If it won\'t help them, don\'t pitch it.', 'Overdeliver on every promise.', 'Their success is your success.']
    },
    { 
      title: 'Presence', 
      desc: 'Phone off. Tabs closed. Do the work.',
      expanded: 'Half-effort gets zero results. When you\'re working, work. When you\'re on a call, be fully there. Distraction is the enemy of mastery.',
      examples: ['On a call? Be 100% there.', 'Working hours? No Instagram.', 'Said 4 hours today? Do 4 real hours.']
    },
  ];

  const [expandedValue, setExpandedValue] = useState(null);

  const expectations = [
    'Minimum 20 hours/week commitment',
    'Daily check-ins with your team',
    'Weekly skill development sessions',
    'Coachability — you must be willing to learn',
    'Integrity in all client interactions',
    'Support and uplift other Pod members',
  ];

  const notForYou = [
    'You want to "get rich quick" with no effort',
    'You can\'t handle direct feedback',
    'You\'re not willing to do outreach',
    'You think you already know everything',
    'You\'re looking for a passive income scheme',
  ];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        The Code We Live By
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
        This isn't just a program. It's a way of being. These four values guide everything we do. 
        If they don't resonate with you, this probably isn't the right fit.
      </p>
      
      {values.map((value, i) => (
        <div 
          key={i} 
          style={{
            padding: 14,
            marginBottom: 10,
            background: '#1a1a22',
            borderRadius: 8,
            border: '1px solid #2a2a35',
            borderLeft: '3px solid #d4af37',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onClick={() => setExpandedValue(expandedValue === i ? null : i)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#d4af37', marginBottom: 4 }}>
                {value.title}
              </div>
              <div style={{ fontSize: 12, color: '#8a8a9a' }}>
                {value.desc}
              </div>
            </div>
            <span style={{ fontSize: 10, color: '#4a4a5a' }}>
              {expandedValue === i ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedValue === i && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #2a2a35' }}>
              <p style={{ fontSize: 12, color: '#8a8a9a', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                {value.expanded}
              </p>
              <div style={{ fontSize: 10, color: '#6a6a7a', marginBottom: 6 }}>What this looks like:</div>
              {value.examples.map((ex, j) => (
                <div key={j} style={{ fontSize: 11, color: '#e0e0e0', marginBottom: 4, display: 'flex', gap: 6 }}>
                  <span style={{ color: '#d4af37' }}>→</span> {ex}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* What we expect */}
      <div style={{
        marginTop: 20,
        padding: 16,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 12, fontWeight: 600 }}>
          ✓ What We Expect From You:
        </div>
        {expectations.map((exp, i) => (
          <div key={i} style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: '#50c878' }}>✓</span> {exp}
          </div>
        ))}
      </div>
      
      {/* Not for you if */}
      <div style={{
        marginTop: 12,
        padding: 16,
        background: 'rgba(255,50,50,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(255,50,50,0.1)',
      }}>
        <div style={{ fontSize: 12, color: '#ff6b6b', marginBottom: 12, fontWeight: 600 }}>
          ✗ This Is NOT For You If:
        </div>
        {notForYou.map((item, i) => (
          <div key={i} style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: '#ff6b6b' }}>✗</span> {item}
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: 16,
        padding: 14,
        background: '#1a1a22',
        borderRadius: 8,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, color: '#e0e0e0', fontStyle: 'italic', margin: 0 }}>
          "We don't just teach marketing. We build honorable entrepreneurs who change the world."
        </p>
        <div style={{ fontSize: 11, color: '#6a6a7a', marginTop: 8 }}>
          — Stephan S., Co-Founder
        </div>
      </div>
    </div>
  );
};

export default TheCode;