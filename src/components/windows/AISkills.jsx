import React, { useState, useEffect } from 'react';

const AISkills = () => {
  const [activeTab, setActiveTab] = useState('organization');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pillars = {
    organization: {
      icon: '🗂️',
      title: 'Business Organization',
      tagline: 'Get your house in order',
      description: 'Before you can scale, you need systems that don\'t break. We teach you to build the infrastructure that lets businesses run without chaos.',
      outcomes: [
        'Clients stop losing leads in spreadsheets',
        'Teams know exactly what to do and when',
        'Data lives in one place, not 47 tabs',
        'Onboarding takes hours, not weeks',
      ],
      skills: [
        { name: 'CRM Mastery', desc: 'GoHighLevel, HubSpot, Salesforce — set up, customize, automate' },
        { name: 'Internal Systems', desc: 'SOPs, dashboards, and workflows that actually get used' },
        { name: 'Data Architecture', desc: 'Clean pipelines, proper tagging, no more "where did that lead go?"' },
        { name: 'Client Portals', desc: 'Self-service systems that save 10+ hours/week' },
      ],
      tools: ['GoHighLevel', 'HubSpot', 'Notion', 'Airtable', 'Zapier', 'Make'],
    },
    optimization: {
      icon: '⚡',
      title: 'Business Optimization',
      tagline: 'Make everything run faster',
      description: 'The busywork that eats 20 hours a week? We eliminate it. AI workflows that turn 10-step processes into 1-click solutions.',
      outcomes: [
        'Manual tasks that took hours now take seconds',
        'Teams focus on high-value work, not admin',
        'Errors drop because humans aren\'t copy-pasting',
        'Businesses scale without hiring armies',
      ],
      skills: [
        { name: 'AI Workflow Design', desc: 'Map processes, find bottlenecks, build automations' },
        { name: 'Bot Development', desc: 'Custom AI assistants for sales, support, and ops' },
        { name: 'Process Automation', desc: 'Connect tools so data flows without human touch' },
        { name: 'Team Efficiency', desc: 'Train teams to work WITH AI, not around it' },
      ],
      tools: ['n8n', 'Make', 'OpenAI API', 'Claude API', 'Voiceflow', 'Botpress'],
    },
    growth: {
      icon: '📈',
      title: 'Business Growth',
      tagline: 'Fill your calendar with qualified leads',
      description: 'Cold outreach that actually works in 2025. AI-powered prospecting, personalization at scale, and multi-channel campaigns that book calls.',
      outcomes: [
        'Calendars full of qualified decision-makers',
        'Response rates 3-5x industry average',
        'Outreach that feels personal at scale',
        'Predictable pipeline, not hope-based marketing',
      ],
      skills: [
        { name: 'AI-Powered Prospecting', desc: 'Find ideal clients faster than any human researcher' },
        { name: 'Personalization at Scale', desc: 'Emails and DMs that feel handwritten — but aren\'t' },
        { name: 'Multi-Channel Campaigns', desc: 'Email, LinkedIn, calls, SMS — orchestrated perfectly' },
        { name: 'Conversion Optimization', desc: 'A/B testing, analytics, and continuous improvement' },
      ],
      tools: ['Apollo', 'Clay', 'Instantly', 'Smartlead', 'LinkedIn Sales Nav', 'Loom'],
    },
  };

  const active = pillars[activeTab];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🤖</div>
        <h2 style={{ color: '#d4af37', fontSize: 20, marginBottom: 6, fontWeight: 700 }}>
          The AI Stack
        </h2>
        <p style={{ color: '#6a6a7a', fontSize: 12, lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>
          We don't teach AI. We teach what AI <em>does</em> for businesses.
        </p>
      </div>

      {/* Positioning Statement */}
      <div style={{
        padding: 16,
        background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.02) 100%)',
        borderRadius: 10,
        border: '1px solid rgba(212,175,55,0.2)',
        marginBottom: 20,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, color: '#b0b0b8', margin: 0, lineHeight: 1.7 }}>
          You won't become a "prompt engineer." You'll become the person who makes companies 
          <strong style={{ color: '#d4af37' }}> run better</strong>, 
          <strong style={{ color: '#d4af37' }}> operate faster</strong>, and 
          <strong style={{ color: '#d4af37' }}> grow profitably</strong>.
        </p>
      </div>

      {/* Pillar Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: 6, 
        marginBottom: 20,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {Object.entries(pillars).map(([key, pillar]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              flex: 1,
              padding: isMobile ? '14px 16px' : '12px 8px',
              background: activeTab === key ? 'rgba(212,175,55,0.15)' : '#1a1a22',
              border: `1px solid ${activeTab === key ? '#d4af37' : '#2a2a35'}`,
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: 'center',
              gap: isMobile ? 10 : 6,
            }}
          >
            <span style={{ fontSize: isMobile ? 20 : 24 }}>{pillar.icon}</span>
            <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
              <div style={{
                fontSize: 11,
                fontWeight: 600,
                color: activeTab === key ? '#d4af37' : '#e0e0e0',
              }}>
                {pillar.title.split(' ')[1]}
              </div>
              <div style={{
                fontSize: 9,
                color: '#6a6a7a',
                marginTop: 2,
              }}>
                {pillar.tagline}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Pillar Content */}
      <div style={{
        background: '#1a1a22',
        borderRadius: 12,
        border: '1px solid #2a2a35',
        overflow: 'hidden',
      }}>
        {/* Pillar Header */}
        <div style={{
          padding: 20,
          borderBottom: '1px solid #2a2a35',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}>
            {active.icon}
          </div>
          <div>
            <h3 style={{ color: '#d4af37', fontSize: 16, fontWeight: 700, margin: 0 }}>
              {active.title}
            </h3>
            <p style={{ color: '#6a6a7a', fontSize: 12, margin: '4px 0 0 0' }}>
              {active.tagline}
            </p>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          {/* Description */}
          <p style={{ fontSize: 13, color: '#8a8a9a', margin: '0 0 20px 0', lineHeight: 1.7 }}>
            {active.description}
          </p>

          {/* Business Outcomes */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ 
              fontSize: 10, 
              color: '#d4af37', 
              marginBottom: 10, 
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
              What This Means For Clients:
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {active.outcomes.map((outcome, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 12,
                  color: '#b0b0b8',
                }}>
                  <span style={{ color: '#50c878' }}>✓</span>
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ 
              fontSize: 10, 
              color: '#d4af37', 
              marginBottom: 10, 
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
              Skills You'll Master:
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: 10,
            }}>
              {active.skills.map((skill, i) => (
                <div key={i} style={{
                  padding: 12,
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 8,
                  border: '1px solid #2a2a35',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#e0e0e0', marginBottom: 4 }}>
                    {skill.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#6a6a7a', lineHeight: 1.5 }}>
                    {skill.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <div style={{ 
              fontSize: 10, 
              color: '#6a6a7a', 
              marginBottom: 8, 
              fontWeight: 500,
            }}>
              Tools you'll use:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {active.tools.map((tool, i) => (
                <span key={i} style={{
                  padding: '5px 10px',
                  background: '#0d0d12',
                  borderRadius: 4,
                  fontSize: 10,
                  color: '#8a8a9a',
                  border: '1px solid #2a2a35',
                }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        marginTop: 20,
        padding: 16,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 10,
        border: '1px solid rgba(212,175,55,0.1)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, color: '#8a8a9a', margin: 0 }}>
          <strong style={{ color: '#d4af37' }}>Full-service AI agency skills.</strong> Not tutorials. 
          Real client work from day one.
        </p>
      </div>
    </div>
  );
};

export default AISkills;

