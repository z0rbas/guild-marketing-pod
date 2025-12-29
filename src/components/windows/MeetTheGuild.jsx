import React, { useState, useEffect } from 'react';

const MeetTheGuild = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const instructors = [
    {
      name: 'Steph S.',
      fullName: 'Stephan Stavrakis',
      role: 'Founder & Lead Instructor',
      image: '/images/founder.jpg',
      emoji: '⚔️',
      shortBio: 'Serial entrepreneur with 15+ years in marketing. Built multiple six-figure businesses.',
      fullBio: 'Serial entrepreneur with 15+ years in marketing and business development. Built multiple six-figure businesses from the ground up. Now focused on training the next generation of honorable entrepreneurs through practical, real-world mentorship.',
      specialties: ['Cold Outreach', 'Sales Systems', 'Business Strategy', 'Team Leadership'],
      achievements: ['Built 3 six-figure businesses', '15+ years marketing experience', 'Trained 100+ entrepreneurs'],
    },
    {
      name: 'Luciano D.',
      fullName: 'Luciano DiMarco',
      role: 'Senior Instructor',
      emoji: '🎯',
      shortBio: 'Expert in high-ticket sales and client acquisition. Closes deals that others can\'t.',
      fullBio: 'Master of high-ticket sales and client acquisition strategies. Known for his ability to close deals that others consider impossible. Brings a systematic approach to sales that anyone can learn and replicate.',
      specialties: ['High-Ticket Sales', 'Negotiation', 'Client Relations', 'Closing Techniques'],
      achievements: ['$2M+ in closed deals', 'Developed sales training program', 'Former Fortune 500 sales lead'],
    },
    {
      name: 'Keith T.',
      fullName: 'Keith Thompson',
      role: 'Senior Instructor',
      emoji: '📊',
      shortBio: 'Data-driven marketer who turns analytics into actionable growth strategies.',
      fullBio: 'Data-driven marketing expert who transforms complex analytics into actionable growth strategies. Believes that every campaign should be measured, tested, and optimized for maximum ROI.',
      specialties: ['Analytics', 'Growth Marketing', 'A/B Testing', 'Campaign Optimization'],
      achievements: ['Scaled campaigns to $500K/month', 'Google & Meta certified', 'Built proprietary tracking systems'],
    },
  ];

  const teamLeaders = [
    {
      name: 'Dante D.',
      fullName: 'Dante DiMarino',
      role: 'Team Leader',
      emoji: '🔥',
      shortBio: 'Expert in multi-channel outreach campaigns. Manages highest-performing accounts.',
      fullBio: 'Expert in multi-channel outreach campaigns. Currently manages some of our highest-performing client accounts. Started as a Pod member and rose through the ranks—living proof that the system works.',
      specialties: ['Email Campaigns', 'LinkedIn Outreach', 'Campaign Management'],
      achievements: ['Promoted from Pod member', 'Manages 10+ client accounts', '150% average ROI on campaigns'],
    },
    {
      name: 'Luca D.',
      fullName: 'Luca DeLuca',
      role: 'Team Leader',
      emoji: '💪',
      shortBio: 'Specializes in appointment setting and lead qualification at scale.',
      fullBio: 'Specializes in appointment setting and lead qualification at scale. Known for his relentless work ethic and ability to generate qualified opportunities consistently. Mentors new members on outreach fundamentals.',
      specialties: ['Appointment Setting', 'Lead Qualification', 'CRM Management'],
      achievements: ['500+ appointments set monthly', 'Top performer 6 months running', 'Developed onboarding curriculum'],
    },
    {
      name: 'Kosta S.',
      fullName: 'Kosta Stavrakis',
      role: 'Team Leader',
      emoji: '🎖️',
      shortBio: 'Runs day-to-day operations. Started as a Pod member, now leads teams.',
      fullBio: 'Runs the day-to-day operations of client campaigns. Started as a Pod member and worked his way up through dedication and results. Now leads multiple teams and serves as a bridge between instructors and members.',
      specialties: ['Operations', 'Team Leadership', 'CRM Systems', 'Process Optimization'],
      achievements: ['Promoted to Team Leader in 8 months', 'Manages 3 active Pods', 'Designed team workflow systems'],
    },
    {
      name: 'Demitri S.',
      fullName: 'Demitri Stavrakis',
      role: 'Team Leader',
      emoji: '⚡',
      shortBio: 'Technical wizard who builds automations that save hours of manual work.',
      fullBio: 'Technical wizard who builds the automations and systems that power our campaigns. Turns complex workflows into one-click solutions. Passionate about efficiency and helping team members work smarter, not harder.',
      specialties: ['Automation', 'Technical Systems', 'Workflow Design', 'Tool Integration'],
      achievements: ['Built 50+ automations', 'Saved 200+ hours/month for team', 'Created internal tools dashboard'],
    },
    {
      name: 'Anthony C.',
      fullName: 'Anthony Caruso',
      role: 'Team Leader',
      emoji: '🌟',
      shortBio: 'Client success specialist who ensures every campaign delivers results.',
      fullBio: 'Client success specialist focused on ensuring every campaign delivers measurable results. Acts as the voice of the client within the team, advocating for quality and accountability in every interaction.',
      specialties: ['Client Success', 'Quality Assurance', 'Reporting', 'Relationship Management'],
      achievements: ['98% client retention rate', 'Developed success metrics framework', 'Handles VIP accounts'],
    },
  ];

  const PersonCard = ({ person, onClick }) => (
    <div
      onClick={onClick}
      style={{
        padding: 16,
        background: '#1a1a22',
        borderRadius: 10,
        border: '1px solid #2a2a35',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#d4af37';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2a2a35';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        {person.image ? (
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            overflow: 'hidden',
            border: '1px solid rgba(212,175,55,0.3)',
          }}>
            <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}>
            {person.emoji}
          </div>
        )}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#e0e0e0' }}>
            {person.name}
          </div>
          <div style={{ fontSize: 11, color: '#d4af37' }}>
            {person.role}
          </div>
        </div>
      </div>
      <p style={{
        fontSize: 12,
        color: '#8a8a9a',
        margin: 0,
        lineHeight: 1.5,
      }}>
        {person.shortBio}
      </p>
      <div style={{
        marginTop: 10,
        fontSize: 10,
        color: '#6a6a7a',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}>
        <span>Click to learn more</span>
        <span>→</span>
      </div>
    </div>
  );

  const DetailModal = ({ person, onClose }) => (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10001,
      padding: isMobile ? 16 : 40,
      animation: 'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, #1a1a22 0%, #141419 100%)',
          borderRadius: 16,
          border: '1px solid #2a2a35',
          boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 1px rgba(212,175,55,0.3)',
          maxWidth: 500,
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          animation: 'slideUp 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: 24,
          borderBottom: '1px solid #2a2a35',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          {person.image ? (
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              overflow: 'hidden',
              border: '2px solid rgba(212,175,55,0.4)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            }}>
              <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: 'rgba(212,175,55,0.15)',
              border: '2px solid rgba(212,175,55,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}>
              {person.emoji}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#d4af37', marginBottom: 4 }}>
              {person.fullName}
            </div>
            <div style={{ fontSize: 13, color: '#8a8a9a' }}>
              {person.role}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: '1px solid #3a3a45',
              background: '#1a1a22',
              color: '#6a6a7a',
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
            </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {/* Bio */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              About
            </div>
            <p style={{ fontSize: 14, color: '#b0b0b8', margin: 0, lineHeight: 1.7 }}>
              {person.fullBio}
            </p>
      </div>
      
          {/* Specialties */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
              Specialties
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {person.specialties.map((s, i) => (
                <span key={i} style={{
                  padding: '6px 12px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 6,
                  fontSize: 12,
                color: '#d4af37',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

          {/* Achievements */}
          <div>
            <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
              Key Achievements
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {person.achievements.map((a, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  color: '#8a8a9a',
                }}>
                  <span style={{ color: '#d4af37' }}>✓</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>👥</div>
        <h2 style={{ color: '#d4af37', fontSize: 20, marginBottom: 6, fontWeight: 700 }}>
          Meet The Guild
        </h2>
        <p style={{ color: '#6a6a7a', fontSize: 12 }}>
          Learn from people who've done it—not professors who read about it
        </p>
      </div>

      {/* Instructors Section */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 14,
        }}>
          <span style={{ fontSize: 16 }}>🎓</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#d4af37' }}>Your Instructors</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 12,
        }}>
          {instructors.map((person, i) => (
            <PersonCard
              key={i}
              person={person}
              onClick={() => setSelectedPerson(person)}
            />
          ))}
        </div>
      </div>

      {/* Team Leaders Section */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 14,
        }}>
          <span style={{ fontSize: 16 }}>⚡</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#d4af37' }}>Your Team Leaders</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 12,
        }}>
          {teamLeaders.map((person, i) => (
            <PersonCard
              key={i}
              person={person}
              onClick={() => setSelectedPerson(person)}
            />
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div style={{
        padding: 16,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 10,
        border: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>
          🤝 The Mentorship Model
        </div>
        <div style={{ fontSize: 12, color: '#8a8a9a', lineHeight: 1.7 }}>
          <div style={{ marginBottom: 4 }}>• <strong style={{ color: '#e0e0e0' }}>Daily access</strong> — Real-time guidance, not weekly office hours</div>
          <div style={{ marginBottom: 4 }}>• <strong style={{ color: '#e0e0e0' }}>Working alongside</strong> — You're in the trenches, not the sidelines</div>
          <div>• <strong style={{ color: '#e0e0e0' }}>Personalized feedback</strong> — On your actual work and campaigns</div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPerson && (
        <DetailModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MeetTheGuild;
