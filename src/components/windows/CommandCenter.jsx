import React, { useState, useEffect } from 'react';

const CommandCenter = ({ onStartTask }) => {
  const [glitch, setGlitch] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [knobValues, setKnobValues] = useState([45, 72, 28]);
  const [powerOn, setPowerOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tasks = [
    { id: 'code', title: 'INTERNALIZE_CODE', desc: 'Laws of sovereignty.', icon: '🛡️' },
    { id: 'aiskills', title: 'INITIALIZE_AI', desc: 'Optimization tools.', icon: '🤖' },
    { id: 'path', title: 'RE-MAP_EVOLUTION', desc: '12-month map.', icon: '🗺️' },
  ];

  const handleKnobChange = (index, val) => {
    const newVals = [...knobValues];
    newVals[index] = val;
    setKnobValues(newVals);
  };

  return (
    <div style={{ 
      color: '#e0e0e0', 
      fontFamily: '"JetBrains Mono", monospace',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #0a0a0f 100%)',
      height: '100%',
      padding: '20px',
      border: '4px solid #2a2a35',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
      position: 'relative',
      userSelect: 'none'
    }}>
      {/* Top Panel - Identity & Power */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ 
            width: 42, 
            height: 42, 
            borderRadius: 6, 
            border: '2px solid #d4af37',
            padding: 2,
            background: '#000'
          }}>
            <img src="/images/founder.png" alt="CO" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: powerOn ? 1 : 0.2 }} />
          </div>
          <div>
            <div style={{ fontSize: 9, color: '#6a6a7a', letterSpacing: 1 }}>UNIT: FOUNDER</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: powerOn ? '#d4af37' : '#4a4a5a' }}>STAVRAKIS_S.</div>
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 8, color: '#6a6a7a', marginBottom: 4 }}>MAIN_POWER</div>
          <button 
            onClick={() => setPowerOn(!powerOn)}
            style={{
              width: 32,
              height: 16,
              background: powerOn ? '#50c878' : '#333',
              borderRadius: 8,
              border: '1px solid #000',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: powerOn ? '0 0 10px #50c878' : 'none'
            }}
          >
            <div style={{
              width: 12,
              height: 12,
              background: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: 1,
              left: powerOn ? 17 : 1,
              transition: 'left 0.2s'
            }} />
          </button>
        </div>
      </div>

      {/* Main Console Area */}
      <div style={{ opacity: powerOn ? 1 : 0.1, transition: 'opacity 0.5s' }}>
        {/* Analog Gauges */}
        <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
          {knobValues.map((val, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                background: 'conic-gradient(#d4af37 ' + (val*3.6) + 'deg, #2a2a35 0)',
                margin: '0 auto 8px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #1a1a22',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
              }}>
                <div style={{ 
                  width: '80%', 
                  height: '80%', 
                  borderRadius: '50%', 
                  background: '#0a0a0f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: '#d4af37',
                  fontWeight: 700
                }}>
                  {val}%
                </div>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={val} 
                onChange={(e) => handleKnobChange(i, e.target.value)}
                style={{ width: '100%', accentColor: '#d4af37' }}
              />
              <div style={{ fontSize: 7, color: '#6a6a7a', marginTop: 4 }}>
                {['SYNC', 'GAIN', 'FREQ'][i]}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Screen */}
        <div style={{
          background: '#050505',
          border: '2px solid #2a2a35',
          padding: 12,
          borderRadius: 4,
          marginBottom: 20,
          position: 'relative',
          boxShadow: 'inset 0 0 15px #000'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'repeating-linear-gradient(transparent, transparent 1px, rgba(0,0,0,0.2) 2px)',
            pointerEvents: 'none'
          }} />
          <div style={{ fontSize: 9, color: '#d4af37', marginBottom: 8, opacity: 0.8 }}>{'>'} MISSION_OBJECTIVE</div>
          <p style={{ fontSize: 11, color: '#50c878', lineHeight: 1.5, margin: 0, textShadow: '0 0 5px #50c878' }}>
            INITIATE ONBOARDING SEQUENCE. OVERRIDE TRADITIONAL PATHS. SCALE AI INFRASTRUCTURE.
          </p>
        </div>

        {/* Tactical Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {tasks.map((task, index) => (
            <button
              key={task.id}
              onClick={() => {
                setOnboardingStep(index + 1);
                onStartTask(task.id);
              }}
              style={{
                background: '#1a1a22',
                border: '1px solid #3a3a45',
                borderBottom: '4px solid #000',
                borderRadius: 4,
                padding: '12px 4px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.1s',
                transform: onboardingStep > index ? 'translateY(2px)' : 'none',
                boxShadow: onboardingStep > index ? 'none' : '0 4px 0 #000'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontSize: 20, marginBottom: 8, filter: onboardingStep > index ? 'none' : 'grayscale(1)' }}>{task.icon}</div>
              <div style={{ fontSize: 8, fontWeight: 800, color: onboardingStep > index ? '#50c878' : '#8a8a9a', letterSpacing: 1 }}>{task.title}</div>
              <div style={{ 
                width: 6, 
                height: 6, 
                background: onboardingStep > index ? '#50c878' : '#333', 
                borderRadius: '50%', 
                margin: '8px auto 0',
                boxShadow: onboardingStep > index ? '0 0 8px #50c878' : 'none'
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* Warning Lights */}
      <div style={{ 
        marginTop: 20, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              width: 12,
              height: 4,
              background: powerOn ? (glitch && i === 4 ? '#ff3232' : '#d4af37') : '#333',
              borderRadius: 1,
              opacity: 0.6
            }} />
          ))}
        </div>
        <div style={{ fontSize: 9, color: powerOn ? (glitch ? '#ff3232' : '#6a6a7a') : '#333', letterSpacing: 2 }}>
          STAVRAKIS_SYSTEMS_v4.0
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;


