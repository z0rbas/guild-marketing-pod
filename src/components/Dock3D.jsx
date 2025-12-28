import React, { useState, useEffect } from 'react';

const Dock3D = ({ windows, openWindows, onToggleWindow }) => {
  const [expandedStack, setExpandedStack] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group windows into stacks
  const stacks = [
    {
      id: 'learn',
      label: 'Learn',
      icon: '📚',
      items: ['whatisapod', 'comparison', 'path'],
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: '🧠',
      items: ['aiskills', 'curriculum'],
    },
    {
      id: 'results',
      label: 'Results',
      icon: '💰',
      items: ['earnings', 'proof'],
    },
    {
      id: 'culture',
      label: 'Culture',
      icon: '⚔️',
      items: ['code', 'team', 'faq'],
    },
  ];

  const getWindowById = (id) => windows.find(w => w.id === id);

  const hasActiveWindow = (stack) => {
    return stack.items.some(id => openWindows.includes(id));
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: isMobile ? 0 : 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10000,
      perspective: '800px',
    }}>
      {/* 3D Dock Container with perspective */}
      <div style={{
        position: 'relative',
        perspective: isMobile ? 'none' : '800px',
        perspectiveOrigin: 'center bottom',
      }}>
        {/* The dock shelf - 3D angled glass surface */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: isMobile ? 6 : 12,
          padding: isMobile ? '6px 12px 8px' : '8px 22px 12px',
          // Glass gradient - lighter at back (top), darker at front (bottom)
          background: isMobile 
            ? 'rgba(40,40,50,0.9)'
            : 'linear-gradient(to bottom, rgba(210,210,220,0.32) 0%, rgba(160,160,175,0.38) 45%, rgba(90,90,110,0.55) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: isMobile ? '16px 16px 0 0' : '6px 6px 10px 10px',
          border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.25)',
          borderTop: isMobile ? 'none' : '1px solid rgba(255,255,255,0.5)',
          borderBottom: isMobile ? 'none' : '1px solid rgba(40,40,60,0.8)',
          // Strong 3D tilt - see the top surface (macOS style)
          transform: isMobile ? 'none' : 'rotateX(45deg)',
          transformOrigin: 'center bottom',
          transformStyle: 'preserve-3d',
          boxShadow: isMobile ? '0 -10px 40px rgba(0,0,0,0.3)' : `
            0 22px 50px -12px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.28),
            inset 0 -2px 4px rgba(0,0,0,0.22)
          `,
        }}>
          {/* Glass shine/reflection on top surface */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '55%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 55%, transparent 100%)',
              borderRadius: '6px 6px 0 0',
              pointerEvents: 'none',
            }} />
          )}
          
          {/* Front edge of the dock (the 3D depth) */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 14,
              background: 'linear-gradient(to bottom, rgba(120,120,135,0.95) 0%, rgba(80,80,95,0.98) 60%, rgba(45,45,60,1) 100%)',
              borderRadius: '0 0 10px 10px',
              transform: 'rotateX(-90deg) translateZ(0px)',
              transformOrigin: 'top center',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 5px 15px rgba(0,0,0,0.3)',
            }} />
          )}
        {stacks.map((stack, stackIndex) => (
          <div
            key={stack.id}
            style={{
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
            onMouseEnter={() => !isMobile && setExpandedStack(stack.id)}
            onMouseLeave={() => !isMobile && setExpandedStack(null)}
            onClick={() => isMobile && setExpandedStack(expandedStack === stack.id ? null : stack.id)}
          >
            {/* Expanded Stack Items - fan out upward */}
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: 8,
              paddingBottom: 16,
              opacity: expandedStack === stack.id ? 1 : 0,
              pointerEvents: expandedStack === stack.id ? 'auto' : 'none',
              transition: 'opacity 0.15s ease',
            }}>
              {stack.items.map((itemId) => {
                const win = getWindowById(itemId);
                if (!win) return null;
                
                const isActive = openWindows.includes(itemId);
                
                return (
                  <button
                    key={itemId}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWindow(itemId);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 14px',
                      background: isActive 
                        ? 'rgba(212,175,55,0.15)'
                        : 'rgba(40,40,50,0.95)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${isActive ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      transform: expandedStack === stack.id 
                        ? `translateY(0) scale(1)` 
                        : `translateY(10px) scale(0.95)`,
                      opacity: expandedStack === stack.id ? 1 : 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      whiteSpace: 'nowrap',
                      minWidth: 130,
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = isActive 
                          ? 'rgba(212,175,55,0.25)'
                          : 'rgba(60,60,70,0.95)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isActive 
                        ? 'rgba(212,175,55,0.15)'
                        : 'rgba(40,40,50,0.95)';
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{win.icon}</span>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: isActive ? '#d4af37' : '#e0e0e0',
                    }}>
                      {win.title}
                    </span>
                    {isActive && (
                      <div style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#d4af37',
                        marginLeft: 'auto',
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Stack Icon - stays perfectly upright */}
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: isMobile ? '6px 8px' : '6px 10px',
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                // Icons stay upright - no rotation
                transform: expandedStack === stack.id ? 'translateY(-8px)' : 'translateY(0)',
                position: 'relative',
              }}
            >
              {/* Simple emoji icon - default flat */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease',
                transform: expandedStack === stack.id ? 'scale(1.15)' : 'scale(1)',
              }}>
                <span style={{
                  fontSize: isMobile ? 32 : 42,
                }}>
                  {stack.icon}
                </span>
                
                {/* Item count badge */}
                <div style={{
                  position: 'absolute',
                  top: -2,
                  right: -8,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  background: '#d4af37',
                  color: '#0a0a0f',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}>
                  {stack.items.length}
                </div>
              </div>

              {/* Active indicator dot */}
              {hasActiveWindow(stack) && (
                <div style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#d4af37',
                  boxShadow: '0 0 6px rgba(212,175,55,0.8)',
                  marginTop: 2,
                }} />
              )}
            </button>
          </div>
        ))}
        </div>
      </div>

      {/* Reflection on the surface below the dock */}
      {!isMobile && (
        <>
          {/* Surface the dock sits on */}
          <div style={{
            position: 'absolute',
            bottom: -14,
            left: '50%',
            transform: 'translateX(-50%) perspective(600px) rotateX(75deg)',
            width: '170%',
            height: 110,
            background: 'linear-gradient(to bottom, rgba(140,140,155,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Dock reflection on that surface */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: 70,
            background: 'linear-gradient(to bottom, rgba(80,80,100,0.2) 0%, transparent 100%)',
            transform: 'scaleY(-1) rotateX(45deg)',
            transformOrigin: 'top center',
            opacity: 0.5,
            filter: 'blur(3px)',
            pointerEvents: 'none',
            borderRadius: '0 0 8px 8px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }} />
        </>
      )}

      <style>{`
        @keyframes stackPop {
          0% { transform: translateY(20px) scale(0.8) rotateX(30deg); opacity: 0; }
          100% { transform: translateY(0) scale(1) rotateX(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Dock3D;

