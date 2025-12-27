import React, { useState, useEffect, useRef } from 'react';

const MeetTheGuild = () => {
  const team = [
    { 
      name: 'Stephan Stavrakis', 
      role: 'Co-Founder & Lead Mentor', 
      emoji: '⚔️',
      bio: 'Serial entrepreneur with 15+ years in marketing and business development. Built multiple six-figure businesses. Now focused on training the next generation of honorable entrepreneurs.',
      specialties: ['Cold Outreach', 'Sales Systems', 'Business Strategy']
    },
    { 
      name: 'Evelyn Stavrakis', 
      role: 'Co-Founder & Strategy Lead', 
      emoji: '👑',
      bio: 'Strategic mind behind the Guild\'s growth. Expert in positioning, offer development, and building systems that scale. Passionate about creating ethical business frameworks.',
      specialties: ['Brand Strategy', 'Offer Creation', 'Operations']
    },
    { 
      name: 'Kosta Stavrakis', 
      role: 'Operations Lead', 
      emoji: '🎯',
      bio: 'Runs the day-to-day operations of client campaigns. Started as a Pod member, now leads teams. Living proof the system works.',
      specialties: ['Campaign Management', 'Team Leadership', 'CRM Systems']
    },
    { 
      name: 'Dante DiMarino', 
      role: 'Campaign Manager', 
      emoji: '📡',
      bio: 'Expert in multi-channel outreach campaigns. Manages some of our highest-performing client accounts. Mentors setters on outreach optimization.',
      specialties: ['Email Campaigns', 'LinkedIn Outreach', 'A/B Testing']
    },
  ];

  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Your Mentors
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
        Learn from people who've actually done it — not professors who read about it in a textbook. 
        Click on any mentor to learn more.
      </p>
      
      <div style={{
        padding: 12,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 12,
        color: '#8a8a9a',
        lineHeight: 1.6,
      }}>
        💡 <strong style={{ color: '#d4af37' }}>Why this matters:</strong> At university, you learn from academics. 
        In the Pod, you learn from practitioners who are actively running businesses and campaigns right now.
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {team.map((member, i) => (
          <div 
            key={i} 
            style={{
              padding: 14,
              background: selectedMentor === i ? 'rgba(212,175,55,0.1)' : '#1a1a22',
              borderRadius: 8,
              border: `1px solid ${selectedMentor === i ? '#d4af37' : '#2a2a35'}`,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => setSelectedMentor(selectedMentor === i ? null : i)}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{member.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e0e0e0', marginBottom: 2 }}>
              {member.name.split(' ')[0]} {member.name.split(' ')[1]?.[0]}.
            </div>
            <div style={{ fontSize: 10, color: '#6a6a7a' }}>
              {member.role}
            </div>
          </div>
        ))}
      </div>
      
      {selectedMentor !== null && (
        <div style={{
          marginTop: 16,
          padding: 16,
          background: '#1a1a22',
          borderRadius: 8,
          border: '1px solid #2a2a35',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 36 }}>{team[selectedMentor].emoji}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#d4af37' }}>
                {team[selectedMentor].name}
              </div>
              <div style={{ fontSize: 12, color: '#6a6a7a' }}>
                {team[selectedMentor].role}
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: 12, color: '#8a8a9a', margin: '0 0 12px 0', lineHeight: 1.6 }}>
            {team[selectedMentor].bio}
          </p>
          
          <div style={{ fontSize: 10, color: '#6a6a7a', marginBottom: 6 }}>Specialties:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {team[selectedMentor].specialties.map((s, j) => (
              <span key={j} style={{
                padding: '4px 10px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 4,
                fontSize: 10,
                color: '#d4af37',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div style={{
        marginTop: 16,
        padding: 14,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>
          🤝 The Mentorship Model:
        </div>
        <div style={{ fontSize: 11, color: '#8a8a9a', lineHeight: 1.7 }}>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Daily access</strong> — Not once-a-week office hours. Real-time guidance.</div>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Working alongside</strong> — You're not watching from the sidelines. You're in the trenches.</div>
          <div>• <strong style={{ color: '#e0e0e0' }}>Personalized feedback</strong> — On your actual outreach, calls, and campaigns.</div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MeetTheGuild;