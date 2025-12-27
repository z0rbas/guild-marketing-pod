import React, { useState, useEffect, useRef } from 'react';

const ThePath = () => {
  const phases = [
    { 
      num: 1, 
      title: 'Observer', 
      desc: 'Watch. Learn. Understand the game.', 
      duration: '2 weeks',
      details: 'Shadow live campaigns. Study winning outreach. Learn the systems and tools. Absorb everything before you touch anything.',
      skills: ['Campaign observation', 'Tool familiarization', 'Industry research']
    },
    { 
      num: 2, 
      title: 'Researcher', 
      desc: 'Find leads. Build lists. Master the hunt.', 
      duration: '4 weeks',
      details: 'Learn to find ideal prospects using LinkedIn, Apollo, and other tools. Build targeted lists. Understand what makes a lead qualified.',
      skills: ['Lead sourcing', 'List building', 'Prospect qualification']
    },
    { 
      num: 3, 
      title: 'Setter', 
      desc: 'Book calls. Open doors. Create opportunities.', 
      duration: '8 weeks',
      details: 'Write cold DMs and emails that get responses. Handle objections. Book qualified appointments for closers. This is where you start earning.',
      skills: ['Cold outreach', 'Objection handling', 'Calendar management']
    },
    { 
      num: 4, 
      title: 'Closer', 
      desc: 'Close deals. Generate revenue. Prove yourself.', 
      duration: '12 weeks',
      details: 'Run sales calls. Present offers. Handle advanced objections. Close deals and earn commission. This is where income gets serious.',
      skills: ['Sales calls', 'Presentation', 'Negotiation', 'Closing']
    },
    { 
      num: 5, 
      title: 'Business Coach', 
      desc: 'Guide others. Share wisdom. Lead campaigns.', 
      duration: '6 months',
      details: 'Mentor newer Pod members. Manage small teams. Take ownership of client campaigns. Develop leadership skills.',
      skills: ['Team leadership', 'Campaign management', 'Mentorship']
    },
    { 
      num: 6, 
      title: 'Strategist', 
      desc: 'Design systems. Position brands. Think bigger.', 
      duration: '6 months',
      details: 'Create marketing strategies from scratch. Position brands in the market. Design offers and funnels. Think at the business level.',
      skills: ['Strategy development', 'Brand positioning', 'Offer creation']
    },
    { 
      num: 7, 
      title: 'Sovereign', 
      desc: 'Launch your own. Build your empire.', 
      duration: '∞',
      details: 'You\'ve mastered the skills. You\'ve built the network. Now launch your own Guild-aligned business and build your empire.',
      skills: ['Business ownership', 'Full autonomy', 'Legacy building']
    },
  ];

  const [expandedPhase, setExpandedPhase] = useState(null);

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        The 7 Phases of Mastery
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
        This isn't a course you "complete." It's a journey from absolute beginner to sovereign business owner. 
        Each phase builds on the last. Click any phase to see details.
      </p>
      
      <div style={{
        padding: 12,
        background: 'rgba(212,175,55,0.1)',
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 12,
        color: '#d4af37',
      }}>
        ⏱️ Average time to Phase 4 (Closer): <strong>6 months</strong> — That's when most members hit $3-5K/month
      </div>
      
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: 15,
          top: 20,
          bottom: 20,
          width: 2,
          background: 'linear-gradient(180deg, #d4af37 0%, #3a3a45 50%, #1a1a22 100%)',
        }} />
        
        {phases.map((phase, i) => (
          <div 
            key={i} 
            style={{
              marginBottom: 8,
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
          >
            <div style={{
              display: 'flex',
              gap: 16,
              padding: '8px 0',
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: i === 0 ? '#d4af37' : '#1a1a22',
                border: `2px solid ${i === 0 ? '#d4af37' : '#3a3a45'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: i === 0 ? '#0a0a0f' : '#6a6a7a',
                flexShrink: 0,
                zIndex: 1,
              }}>
                {phase.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: i === 0 ? '#d4af37' : '#e0e0e0',
                  }}>
                    {phase.title}
                  </span>
                  <span style={{
                    fontSize: 10,
                    color: '#4a4a5a',
                    background: '#1a1a22',
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}>
                    {phase.duration}
                  </span>
                  <span style={{ fontSize: 10, color: '#4a4a5a' }}>
                    {expandedPhase === i ? '▼' : '▶'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#6a6a7a', marginTop: 2 }}>
                  {phase.desc}
                </div>
              </div>
            </div>
            
            {expandedPhase === i && (
              <div style={{
                marginLeft: 48,
                padding: 12,
                background: '#1a1a22',
                borderRadius: 8,
                border: '1px solid #2a2a35',
                marginBottom: 8,
              }}>
                <p style={{ fontSize: 12, color: '#8a8a9a', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                  {phase.details}
                </p>
                <div style={{ fontSize: 10, color: '#6a6a7a', marginBottom: 6 }}>Skills you'll develop:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {phase.skills.map((skill, j) => (
                    <span key={j} style={{
                      padding: '4px 8px',
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      borderRadius: 4,
                      fontSize: 10,
                      color: '#d4af37',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: 16,
        padding: 16,
        background: '#1a1a22',
        borderRadius: 8,
        border: '1px solid #2a2a35',
      }}>
        <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>
          🎯 Important Note:
        </div>
        <p style={{ fontSize: 12, color: '#8a8a9a', margin: 0, lineHeight: 1.6 }}>
          You don't move to the next phase by "finishing modules." You move by demonstrating mastery. 
          Book enough appointments? You're a Setter. Close enough deals? You're a Closer. 
          <strong style={{ color: '#e0e0e0' }}> Results determine your rank, not time served.</strong>
        </p>
      </div>
    </div>
  );
};

export default ThePath;