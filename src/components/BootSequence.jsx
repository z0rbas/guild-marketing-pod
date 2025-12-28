import React, { useState, useEffect } from 'react';

const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [showLogo, setShowLogo] = useState(false);
  const [glitch, setGlitch] = useState(false);
  
  const bootLines = [
    { text: 'GUILD OF HONOUR // MARKETING POD AREA', delay: 0 },
    { text: 'Initializing sovereign protocols...', delay: 400 },
    { text: 'Loading skill modules...', delay: 800 },
    { text: 'Connecting to mentor network...', delay: 1200 },
    { text: 'Bypassing traditional education...', delay: 1600 },
    { text: 'Ready.', delay: 2200 },
  ];

  useEffect(() => {
    bootLines.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, delay);
    });
    
    setTimeout(() => setGlitch(true), 2600);
    setTimeout(() => setGlitch(false), 2700);
    setTimeout(() => setShowLogo(true), 2800);
    setTimeout(onComplete, 4000);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#050a30',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"JetBrains Mono", monospace',
      zIndex: 9999,
    }}>
      {/* Scanlines overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
        pointerEvents: 'none',
        opacity: 0.3,
      }} />
      
      {/* CRT flicker */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
        animation: 'flicker 0.15s infinite',
      }} />
      
      <div style={{
        width: '100%',
        maxWidth: 500,
        padding: '0 24px',
      }}>
        {lines.map((line, i) => (
          <div 
            key={i}
            style={{
              color: line === 'Ready.' ? '#d4af37' : '#3a3a4a',
              fontSize: 14,
              marginBottom: 8,
              animation: 'typeIn 0.3s ease',
              textShadow: line === 'Ready.' ? '0 0 10px rgba(212,175,55,0.5)' : 'none',
            }}
          >
            <span style={{ color: '#d4af37' }}>{line === 'Ready.' ? '► ' : '> '}</span>
            <span className="typing-text">{line}</span>
            {i === lines.length - 1 && line !== 'Ready.' && (
              <span style={{ animation: 'blink 0.8s infinite' }}>_</span>
            )}
          </div>
        ))}
      </div>
      
      {showLogo && (
        <div style={{
          marginTop: 60,
          textAlign: 'center',
          animation: 'logoReveal 0.8s ease',
        }}>
          <div style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#d4af37',
            letterSpacing: 8,
            marginBottom: 12,
            textShadow: '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3)',
            animation: 'glow 2s ease-in-out infinite alternate',
          }}>
            GUILD
          </div>
          <div style={{
            fontSize: 14,
            color: '#5a5a6a',
            letterSpacing: 4,
            animation: 'fadeIn 0.5s ease 0.3s both',
          }}>
            MARKETING POD
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes logoReveal {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes glow {
          from { text-shadow: 0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3); }
          to { text-shadow: 0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.5), 0 0 100px rgba(212,175,55,0.3); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
        }
      `}</style>
    </div>
  );
};

export default BootSequence;

