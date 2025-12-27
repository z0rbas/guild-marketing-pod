import React, { useState, useEffect, useRef } from 'react';

const EarningsSimulator = () => {
  const [month, setMonth] = useState(6);
  
  const earnings = {
    3: { min: 500, max: 1500, phase: 'Setter', activities: 'Booking 10-20 appointments/month', note: 'You\'re just getting started. First commission checks coming in.' },
    6: { min: 2000, max: 4000, phase: 'Closer', activities: 'Closing 2-5 deals/month', note: 'You\'re now running sales calls and closing your own deals.' },
    9: { min: 4000, max: 8000, phase: 'Business Coach', activities: 'Managing campaigns + closing', note: 'Leading a small team while still closing. Multiple income streams.' },
    12: { min: 6000, max: 12000, phase: 'Strategist', activities: 'Strategy + team + closing', note: 'You\'re operating at a senior level. Some members hit $15K+ here.' },
  };
  
  const closest = Object.keys(earnings).reduce((prev, curr) => 
    Math.abs(curr - month) < Math.abs(prev - month) ? curr : prev
  );
  const data = earnings[closest];

  // Calculate cumulative earnings
  const cumulativeEarnings = {
    3: { min: 1500, max: 4500 },
    6: { min: 7500, max: 18000 },
    9: { min: 19500, max: 42000 },
    12: { min: 37500, max: 78000 },
  };
  const cumulative = cumulativeEarnings[closest];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Earnings Simulator
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
        See your potential income as you progress through the phases. 
        These numbers are based on actual Pod member performance.
      </p>
      
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#6a6a7a' }}>Time in the Pod:</span>
          <span style={{ fontSize: 14, color: '#d4af37', fontWeight: 600 }}>{month} months</span>
        </div>
        <input
          type="range"
          min="3"
          max="12"
          step="3"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: '#d4af37',
            cursor: 'pointer',
            height: 8,
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          color: '#4a4a5a',
          marginTop: 8,
        }}>
          <span>3 mo</span>
          <span>6 mo</span>
          <span>9 mo</span>
          <span>12 mo</span>
        </div>
      </div>
      
      {/* Monthly earnings */}
      <div style={{
        padding: 20,
        background: 'rgba(212,175,55,0.1)',
        borderRadius: 12,
        border: '1px solid rgba(212,175,55,0.2)',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 4 }}>
          MONTHLY INCOME AT {month} MONTHS
        </div>
        <div style={{ fontSize: 11, color: '#d4af37', marginBottom: 8 }}>
          Phase: {data.phase}
        </div>
        <div style={{ fontSize: 42, fontWeight: 700, color: '#d4af37', marginBottom: 4 }}>
          ${data.min.toLocaleString()} - ${data.max.toLocaleString()}
        </div>
        <div style={{ fontSize: 12, color: '#6a6a7a' }}>
          per month
        </div>
      </div>
      
      {/* Cumulative earnings */}
      <div style={{
        padding: 16,
        background: '#1a1a22',
        borderRadius: 8,
        border: '1px solid #2a2a35',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: '#6a6a7a' }}>Total earned by month {month}:</span>
          <span style={{ fontSize: 16, color: '#e0e0e0', fontWeight: 600 }}>
            ${cumulative.min.toLocaleString()} - ${cumulative.max.toLocaleString()}
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#4a4a5a', marginBottom: 8 }}>
          What you'll be doing: <span style={{ color: '#8a8a9a' }}>{data.activities}</span>
        </div>
        <div style={{ fontSize: 11, color: '#6a6a7a', fontStyle: 'italic' }}>
          {data.note}
        </div>
      </div>
      
      {/* Comparison */}
      <div style={{
        padding: 16,
        background: 'rgba(255,50,50,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(255,50,50,0.1)',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color: '#ff6b6b', marginBottom: 8, fontWeight: 600 }}>
          Meanwhile, a university student at {month} months:
        </div>
        <div style={{ fontSize: 12, color: '#8a8a9a', lineHeight: 1.6 }}>
          {month <= 6 
            ? `Still in their first semester. $${(month * 4000).toLocaleString()} deeper in debt. Zero income. Zero real skills yet.`
            : `One semester down. $${(month * 4000).toLocaleString()} in debt. Maybe got a minimum wage part-time job.`
          }
        </div>
      </div>
      
      {/* How it works */}
      <div style={{
        padding: 14,
        background: '#1a1a22',
        borderRadius: 8,
        border: '1px solid #2a2a35',
      }}>
        <div style={{ fontSize: 11, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>
          💰 How You Earn:
        </div>
        <div style={{ fontSize: 11, color: '#8a8a9a', lineHeight: 1.7 }}>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Setters:</strong> Commission per qualified appointment booked</div>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Closers:</strong> Percentage of deals closed (typically 10-20%)</div>
          <div>• <strong style={{ color: '#e0e0e0' }}>Coaches:</strong> Base + commission + team overrides</div>
        </div>
      </div>
      
      <p style={{ fontSize: 10, color: '#4a4a5a', marginTop: 14, textAlign: 'center', lineHeight: 1.5 }}>
        * Earnings vary based on effort, skill development, and market conditions. 
        These figures represent typical ranges, not guarantees. Top performers exceed these numbers.
      </p>
    </div>
  );
};

export default EarningsSimulator;