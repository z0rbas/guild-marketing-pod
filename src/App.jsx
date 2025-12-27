import React, { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence';
import SalesLetter from './components/SalesLetter';
import Window from './components/Window';
import DockIcon from './components/DockIcon';

// Import window content components
import UniversityComparison from './components/windows/UniversityComparison';
import ThePath from './components/windows/ThePath';
import Curriculum from './components/windows/Curriculum';
import EarningsSimulator from './components/windows/EarningsSimulator';
import ProofOfWork from './components/windows/ProofOfWork';
import TheCode from './components/windows/TheCode';
import MeetTheGuild from './components/windows/MeetTheGuild';
import WhatIsAPod from './components/windows/WhatIsAPod';
import FAQ from './components/windows/FAQ';
import ApplyNow from './components/windows/ApplyNow';

export default function App() {
  const [stage, setStage] = useState('boot'); // boot -> letter -> os
  const [openWindows, setOpenWindows] = useState(['apply']);
  const [windowOrder, setWindowOrder] = useState(['apply']);
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleWindow = (id) => {
    if (openWindows.includes(id)) {
      setOpenWindows(openWindows.filter(w => w !== id));
      setWindowOrder(windowOrder.filter(w => w !== id));
    } else {
      setOpenWindows([...openWindows, id]);
      setWindowOrder([...windowOrder, id]);
    }
  };

  const focusWindow = (id) => {
    setWindowOrder([...windowOrder.filter(w => w !== id), id]);
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w !== id));
    setWindowOrder(windowOrder.filter(w => w !== id));
  };

  const handleSkipToApplication = () => {
    setStage('os');
    if (!openWindows.includes('apply')) {
      setOpenWindows([...openWindows, 'apply']);
      setWindowOrder([...windowOrder, 'apply']);
    }
    focusWindow('apply');
  };

  const windows = [
    { id: 'whatisapod', title: 'What is a POD?', icon: '🛡️', component: <WhatIsAPod />, position: { x: 60, y: 40 }, width: 520, height: 680 },
    { id: 'comparison', title: 'University vs Pod', icon: '🎓', component: <UniversityComparison />, position: { x: 40, y: 50 }, width: 520, height: 720 },
    { id: 'path', title: 'The Path', icon: '🗺️', component: <ThePath />, position: { x: 100, y: 70 }, width: 480, height: 620 },
    { id: 'curriculum', title: 'Curriculum', icon: '🧠', component: <Curriculum />, position: { x: 160, y: 50 }, width: 540, height: 680 },
    { id: 'earnings', title: 'Earnings Simulator', icon: '💰', component: <EarningsSimulator />, position: { x: 220, y: 80 }, width: 460, height: 640 },
    { id: 'proof', title: 'Proof of Work', icon: '📡', component: <ProofOfWork />, position: { x: 280, y: 60 }, width: 480, height: 580 },
    { id: 'code', title: 'The Code', icon: '📜', component: <TheCode />, position: { x: 340, y: 70 }, width: 460, height: 620 },
    { id: 'team', title: 'Meet The Guild', icon: '👥', component: <MeetTheGuild />, position: { x: 400, y: 50 }, width: 450, height: 600 },
    { id: 'faq', title: 'FAQ', icon: '❓', component: <FAQ />, position: { x: 120, y: 40 }, width: 520, height: 640 },
    { id: 'apply', title: 'Apply Now', icon: '🎯', component: <ApplyNow />, position: { x: 180, y: 60 }, width: 440, height: 640 },
  ];

  // Boot stage
  if (stage === 'boot') {
    return <BootSequence onComplete={() => setStage('letter')} />;
  }

  // Sales letter stage
  if (stage === 'letter') {
    return (
      <SalesLetter 
        onEnterOS={() => setStage('os')} 
        onSkipToApplication={handleSkipToApplication}
      />
    );
  }

  // OS stage
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: `
        radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 50%),
        linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)
      `,
      fontFamily: '"Inter", system-ui, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 36,
        background: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1a1a22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 10000,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: '#d4af37', fontSize: 14 }}>⚔️</span>
          <span style={{
            color: '#d4af37',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
          }}>
            GUILD OS
          </span>
        </div>
        
        <button
          onClick={() => setStage('letter')}
          style={{
            background: 'none',
            border: 'none',
            color: '#6a6a7a',
            fontSize: 11,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 4,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.color = '#d4af37'}
          onMouseLeave={(e) => e.target.style.color = '#6a6a7a'}
        >
          ← Back to Letter
        </button>
        
        <div style={{
          fontSize: 12,
          color: '#6a6a7a',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Desktop Area */}
      <div style={{
        position: 'absolute',
        top: 36,
        left: 0,
        right: 0,
        bottom: 80,
      }}>
        {/* Hero Text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'rgba(212,175,55,0.08)',
            letterSpacing: 12,
            marginBottom: 8,
          }}>
            GUILD
          </div>
          <div style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}>
            Marketing Pod
          </div>
        </div>

        {/* Windows */}
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={openWindows.includes(win.id)}
            onClose={closeWindow}
            onFocus={focusWindow}
            initialPosition={win.position}
            zIndex={100 + windowOrder.indexOf(win.id)}
            width={win.width}
            height={win.height}
          >
            {win.component}
          </Window>
        ))}
      </div>

      {/* Dock */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(20,20,25,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: isMobile ? 0 : 16,
        borderTop: '1px solid #2a2a35',
        border: isMobile ? 'none' : '1px solid #2a2a35',
        borderBottom: isMobile ? 'none' : '1px solid #2a2a35',
        padding: isMobile ? '4px 8px 8px' : '8px 12px',
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? 2 : 4,
        zIndex: 10000,
        ...(isMobile ? {} : {
          left: '50%',
          right: 'auto',
          transform: 'translateX(-50%)',
          bottom: 12,
          width: 'auto',
        }),
        overflowX: isMobile ? 'auto' : 'visible',
        WebkitOverflowScrolling: 'touch',
      }}>
        {windows.map((win) => (
          <DockIcon
            key={win.id}
            icon={win.icon}
            label={win.title.split(' ')[0]}
            isActive={openWindows.includes(win.id)}
            onClick={() => toggleWindow(win.id)}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'gridMove 20s linear infinite',
      }} />
      
      {/* Global animations */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(212,175,55,0.2); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,107,0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(255,107,107,0.2); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

