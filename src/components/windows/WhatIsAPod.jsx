import React, { useState, useEffect } from 'react';

const WhatIsAPod = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionStyle = {
    marginBottom: 28,
  };

  const headingStyle = {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  const textStyle = {
    color: '#b0b0b8',
    fontSize: 13,
    lineHeight: 1.7,
    marginBottom: 12,
  };

  const quoteStyle = {
    padding: '16px 20px',
    background: 'rgba(212,175,55,0.08)',
    borderLeft: '3px solid #d4af37',
    borderRadius: '0 8px 8px 0',
    color: '#d4af37',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 500,
    marginBottom: 16,
  };

  const listStyle = {
    margin: 0,
    paddingLeft: 20,
    color: '#8a8a9a',
    fontSize: 13,
    lineHeight: 1.8,
  };

  const comparisonBox = (title, items, isGood) => (
    <div style={{
      padding: 16,
      background: isGood ? 'rgba(212,175,55,0.08)' : 'rgba(255,50,50,0.08)',
      borderRadius: 8,
      border: `1px solid ${isGood ? 'rgba(212,175,55,0.2)' : 'rgba(255,50,50,0.2)'}`,
      flex: 1,
      minWidth: isMobile ? '100%' : 200,
    }}>
      <div style={{ 
        fontSize: 11, 
        color: isGood ? '#d4af37' : '#ff6b6b', 
        marginBottom: 10, 
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        {title}
      </div>
      <ul style={{ ...listStyle, paddingLeft: 16 }}>
        {items.map((item, i) => (
          <li key={i} style={{ color: isGood ? '#c0b090' : '#a08080' }}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
        <h2 style={{ color: '#d4af37', fontSize: 22, marginBottom: 8, fontWeight: 700 }}>
          What is a POD?
        </h2>
        <p style={{ color: '#6a6a7a', fontSize: 13 }}>
          The Search-and-Rescue-inspired system that powers The Guild
        </p>
      </div>

      {/* Definition */}
      <div style={sectionStyle}>
        <p style={textStyle}>
          A <strong style={{ color: '#d4af37' }}>POD</strong> is a small, purpose-driven group 
          (1 Facilitator + 5 Members) that works together to build skill, reputation, and capability. 
          It is where leadership is practiced, character is proven, and opportunities are 
          earned—not granted. The Facilitator becomes a Pod Lead when they've earned it.
        </p>
        <div style={quoteStyle}>
          "A POD is where someone earns their name, not just holds it."
        </div>
      </div>

      {/* Origin */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>
          <span>🔍</span> Where It Comes From
        </h3>
        <p style={textStyle}>
          The POD structure is inspired by <strong style={{ color: '#e0e0e0' }}>Search and Rescue (SAR)</strong> operations, 
          where thousands of responders are coordinated through small, high-trust units. SAR teams proved that:
        </p>
        <ul style={listStyle}>
          <li>Large groups break under pressure</li>
          <li>Small, clear units survive pressure and produce results</li>
          <li>Communication must travel in organized layers</li>
          <li>No one is left behind when structure protects them</li>
        </ul>
        <p style={{ ...textStyle, marginTop: 12 }}>
          SAR uses PODs so that <strong style={{ color: '#d4af37' }}>1000+ people can operate as one mind</strong> without 
          collapsing under confusion. The Guild applies the same logic to business, mentorship, and leadership.
        </p>
      </div>

      {/* Structure - The Guild Hierarchy */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>
          <span>📊</span> The Guild Hierarchy
        </h3>
        <div style={{
          padding: 20,
          background: '#1a1a22',
          borderRadius: 12,
          border: '1px solid #2a2a35',
          marginBottom: 16,
        }}>
          {[
            { level: 'POD', count: '1 + 5', icon: '👤', desc: '1 Facilitator + 5 Members = 6 people' },
            { level: 'CIRCLE', count: '5 PODs', icon: '⭕', desc: '30 people' },
            { level: 'ALLIANCE', count: '5 Circles', icon: '🤝', desc: '150 people' },
            { level: 'GUILD', count: '5 Alliances', icon: '🏰', desc: '750 people' },
          ].map((item, i, arr) => (
            <div key={i}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: i === arr.length - 1 ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${i === arr.length - 1 ? 'rgba(212,175,55,0.3)' : '#2a2a35'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: i === arr.length - 1 ? '#d4af37' : '#e0e0e0',
                    marginBottom: 2,
                  }}>
                    {item.level}
                  </div>
                  <div style={{ fontSize: 11, color: '#6a6a7a' }}>
                    {item.desc}
                  </div>
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#8a8a9a',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '4px 10px',
                  borderRadius: 4,
                }}>
                  {item.count}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{
                  marginLeft: 19,
                  height: 16,
                  borderLeft: '2px solid #2a2a35',
                }} />
              )}
            </div>
          ))}
        </div>
        <p style={{ ...textStyle, fontSize: 12, color: '#6a6a7a', textAlign: 'center' }}>
          6 → 30 → 150 → 750 = Scalable structure with maintained clarity
        </p>
      </div>

      {/* Why This Structure */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>
          <span>⚡</span> Why This Structure?
        </h3>
        <div style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          {comparisonBox('Without PODs', [
            'Ego fights',
            'Confusion & overwhelm',
            'Unclear authority',
            'Leaders without training',
            'Followers without direction',
          ], false)}
          {comparisonBox('With PODs', [
            'Clarity → everyone knows their role',
            'Communication flow → no broken chains',
            'Shared responsibility',
            'Growth that multiplies',
            'Structure that protects',
          ], true)}
        </div>
      </div>

      {/* Communication Flow */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>
          <span>🔄</span> Communication Flow
        </h3>
        <p style={textStyle}>
          Communication has <strong style={{ color: '#e0e0e0' }}>direction, not chaos.</strong> Nobody 
          yells up, down, and sideways at once.
        </p>
        <div style={{
          padding: 20,
          background: '#1a1a22',
          borderRadius: 12,
          border: '1px solid #2a2a35',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 12, fontWeight: 600 }}>
            INSIDE THE POD:
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { arrow: '↔️', text: 'Information moves side-to-side (peers → peers)' },
              { arrow: '⬇️', text: 'Support moves down (leader → member)' },
              { arrow: '⬆️', text: 'Responsibility moves up (member → leader)' },
              { arrow: '➡️', text: 'Decisions move forward (team → action)' },
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10,
                fontSize: 12,
                color: '#8a8a9a',
              }}>
                <span style={{ fontSize: 16 }}>{item.arrow}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#6a6a7a', textAlign: 'center', fontStyle: 'italic' }}>
          Focused communication = psychological safety + execution clarity
        </p>
      </div>

      {/* Benefits */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>
          <span>🎯</span> The Benefit to Members
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: 10,
        }}>
          {[
            { icon: '🏠', text: 'A place to belong' },
            { icon: '📈', text: 'A place to grow' },
            { icon: '🤝', text: 'A place to contribute' },
            { icon: '👁️', text: 'A place to be seen' },
            { icon: '💪', text: 'A place to build' },
            { icon: '🌟', text: 'A place to earn' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: 14,
              background: '#1a1a22',
              borderRadius: 8,
              border: '1px solid #2a2a35',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: 11, color: '#8a8a9a' }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>
          <span>👑</span> Leader & Follower
        </h3>
        <p style={textStyle}>
          The POD system allows someone to <strong style={{ color: '#d4af37' }}>lead where they are strong</strong> and 
          <strong style={{ color: '#d4af37' }}> follow where they are still learning</strong>.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 10,
          marginBottom: 16,
        }}>
          {[
            'Humility without shrinking',
            'Leadership without domination',
            'Responsibility without superiority',
          ].map((item, i) => (
            <div key={i} style={{
              padding: 12,
              background: 'rgba(212,175,55,0.05)',
              borderRadius: 8,
              border: '1px solid rgba(212,175,55,0.1)',
              fontSize: 12,
              color: '#b0a080',
              textAlign: 'center',
            }}>
              {item}
            </div>
          ))}
        </div>
        <div style={quoteStyle}>
          "Leadership isn't a promotion. It's a responsibility you earn."
        </div>
      </div>

      {/* Earning */}
      <div style={sectionStyle}>
        <h3 style={headingStyle}>
          <span>🏆</span> Earning the Right
        </h3>
        <p style={textStyle}>
          Inside a POD, nothing is given for free. Trust is earned. Leadership is earned. 
          Opportunity is earned. And because it is earned, it is <em>real</em>.
        </p>
        <div style={quoteStyle}>
          "I've seen how you show up. You've earned the right."
        </div>
      </div>

      {/* Summary */}
      <div style={{
        padding: 24,
        background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.02) 100%)',
        borderRadius: 12,
        border: '1px solid rgba(212,175,55,0.2)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 8, letterSpacing: 2 }}>
          IN ONE SENTENCE
        </div>
        <p style={{ 
          fontSize: 14, 
          color: '#d4af37', 
          lineHeight: 1.7, 
          margin: 0,
          fontWeight: 500,
        }}>
          A POD is the Guild of Honour's Search-and-Rescue-inspired system for developing leaders, 
          coordinating growth, and multiplying capability—so every person can rise, every voice 
          can matter, and no one has to build their future alone.
        </p>
      </div>
    </div>
  );
};

export default WhatIsAPod;

