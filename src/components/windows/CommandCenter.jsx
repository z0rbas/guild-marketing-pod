import React, { useState, useEffect } from 'react';

const CommandCenter = ({ onStartTask }) => {
  const [glitch, setGlitch] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tasks = [
    { id: 'code', title: 'Internalize The Code', desc: 'Our laws of honor and sovereignty.', icon: '📜' },
    { id: 'aiskills', title: 'Initialize AI Stack', desc: 'Access your optimization tools.', icon: '🤖' },
    { id: 'path', title: 'Review The Path', desc: 'Your 12-month evolution map.', icon: '🗺️' },
  ];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: '"JetBrains Mono", monospace' }}>
      {/* Header / Identity */}
      <div style={{ 
        padding: 20, 
        background: 'rgba(212,175,55,0.05)', 
        borderRadius: 12, 
        border: '1px solid rgba(212,175,55,0.2)',
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          animation: 'scanline 2s linear infinite'
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ 
            width: 48, 
            height: 48, 
            borderRadius: '50%', 
            overflow: 'hidden',
            border: '2px solid #d4af37',
            boxShadow: '0 0 15px rgba(212,175,55,0.3)'
          }}>
            <img src="/images/founder.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#6a6a7a', letterSpacing: 2, textTransform: 'uppercase' }}>Commanding Officer</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#d4af37' }}>Stephan S.</div>
          </div>
        </div>
      </div>

      {/* Mission Brief */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#d4af37', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 8px #d4af37' }} />
          MISSION_BRIEF.EXE
        </div>
        <p style={{ fontSize: 13, color: '#b0b0b8', lineHeight: 1.6, margin: 0 }}>
          Welcome, Apprentice. You have entered the Guild OS. Your objective is clear: 
          <span style={{ color: '#fff', fontWeight: 700 }}> Master the systems that make businesses un-stoppable.</span> 
          Follow the initialization sequence below to begin your onboarding.
        </p>
      </div>

      {/* Interactive Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tasks.map((task, index) => (
          <button
            key={task.id}
            onClick={() => {
              setOnboardingStep(index + 1);
              onStartTask(task.id);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 16,
              background: onboardingStep > index ? 'rgba(80, 200, 120, 0.05)' : 'rgba(255,255,255,0.02)',
              border: onboardingStep > index ? '1px solid rgba(80, 200, 120, 0.3)' : '1px solid rgba(255,255,255,0.05)',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              width: '100%',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = onboardingStep > index ? 'rgba(80, 200, 120, 0.05)' : 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = onboardingStep > index ? '1px solid rgba(80, 200, 120, 0.3)' : '1px solid rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ fontSize: 24 }}>{task.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: onboardingStep > index ? '#50c878' : '#fff', marginBottom: 2 }}>{task.title}</div>
              <div style={{ fontSize: 11, color: '#6a6a7a' }}>{task.desc}</div>
            </div>
            {onboardingStep > index && (
              <div style={{ color: '#50c878', fontSize: 12 }}>COMPLETED</div>
            )}
          </button>
        ))}
      </div>

      {/* System Status Footer */}
      <div style={{ 
        marginTop: 24, 
        paddingTop: 16, 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#4a4a5a', marginBottom: 2 }}>ACTIVE_PODS</div>
            <div style={{ fontSize: 12, color: '#d4af37', fontWeight: 700 }}>24</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#4a4a5a', marginBottom: 2 }}>AI_WORKFLOWS</div>
            <div style={{ fontSize: 12, color: '#d4af37', fontWeight: 700 }}>156</div>
          </div>
        </div>
        <div style={{ 
          fontSize: 10, 
          color: glitch ? '#ff3232' : '#4a4a5a', 
          fontFamily: 'monospace',
          transition: 'color 0.1s'
        }}>
          SYS_STABLE: 99.8%
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: 0; opacity: 0; }
          50% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CommandCenter;

