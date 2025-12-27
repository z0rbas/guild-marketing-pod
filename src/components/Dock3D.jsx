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
      perspective: '1000px',
    }}>
      {/* 3D Dock Container */}
      <div style={{
        position: 'relative',
      }}>
        {/* The dock shelf - glass bar with subtle 3D edge */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: isMobile ? 6 : 8,
          padding: isMobile ? '6px 12px 8px' : '4px 16px 8px',
          background: isMobile 
            ? 'rgba(40,40,50,0.9)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(200,200,210,0.1) 50%, rgba(100,100,120,0.2) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: isMobile ? '16px 16px 0 0' : 6,
          border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.2)',
          borderTop: isMobile ? 'none' : '1px solid rgba(255,255,255,0.4)',
          boxShadow: isMobile ? '0 -10px 40px rgba(0,0,0,0.3)' : `
            0 1px 0 rgba(255,255,255,0.1) inset,
            0 -1px 0 rgba(0,0,0,0.1) inset,
            0 10px 40px -5px rgba(0,0,0,0.4)
          `,
        }}>
          {/* Glass shine at top */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '6px 6px 0 0',
              pointerEvents: 'none',
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
              gap: 6,
              paddingBottom: 8,
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

            {/* Main Stack Icon - simple, macOS style */}
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
                transition: 'all 0.2s ease',
                transform: expandedStack === stack.id ? 'translateY(-8px)' : 'translateY(0)',
                position: 'relative',
              }}
            >
              {/* The icon container */}
              <div style={{
                position: 'relative',
                width: isMobile ? 44 : 52,
                height: isMobile ? 44 : 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease',
                transform: expandedStack === stack.id ? 'scale(1.15)' : 'scale(1)',
              }}>
                {/* Stacked cards behind icon */}
                {!isMobile && stack.items.length > 1 && (
                  <>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 10,
                      background: 'rgba(80,80,90,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transform: 'translate(-3px, -3px)',
                      zIndex: -1,
                    }} />
                    {stack.items.length > 2 && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 10,
                        background: 'rgba(60,60,70,0.6)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        transform: 'translate(-6px, -6px)',
                        zIndex: -2,
                      }} />
                    )}
                  </>
                )}
                
                {/* Main icon background */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(180deg, rgba(90,90,100,0.9) 0%, rgba(50,50,60,0.95) 100%)',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: expandedStack === stack.id
                    ? '0 8px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}>
                  <span style={{
                    fontSize: isMobile ? 26 : 30,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  }}>
                    {stack.icon}
                  </span>
                </div>
                
                {/* Item count badge */}
                <div style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
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

      {/* Reflection below the dock */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          height: 50,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, transparent 100%)',
          transform: 'scaleY(-1)',
          transformOrigin: 'top center',
          opacity: 0.5,
          filter: 'blur(2px)',
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        }} />
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

