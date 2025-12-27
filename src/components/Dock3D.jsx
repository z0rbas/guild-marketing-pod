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
      {/* 3D Dock Container with perspective */}
      <div style={{
        position: 'relative',
        perspective: isMobile ? 'none' : '1200px',
        perspectiveOrigin: 'center bottom',
      }}>
        {/* The dock shelf - 3D angled glass surface */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: isMobile ? 6 : 10,
          padding: isMobile ? '6px 12px 8px' : '8px 20px 12px',
          // Glass gradient - lighter at back (top), darker at front (bottom)
          background: isMobile 
            ? 'rgba(40,40,50,0.9)'
            : 'linear-gradient(to bottom, rgba(140,140,160,0.4) 0%, rgba(100,100,120,0.5) 40%, rgba(60,60,80,0.7) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: isMobile ? '16px 16px 0 0' : '4px 4px 8px 8px',
          border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.25)',
          borderTop: isMobile ? 'none' : '1px solid rgba(255,255,255,0.5)',
          borderBottom: isMobile ? 'none' : '1px solid rgba(40,40,60,0.8)',
          // Subtle 3D tilt - see the top surface
          transform: isMobile ? 'none' : 'rotateX(12deg)',
          transformOrigin: 'center bottom',
          transformStyle: 'preserve-3d',
          boxShadow: isMobile ? '0 -10px 40px rgba(0,0,0,0.3)' : `
            0 20px 50px -10px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.3),
            inset 0 -2px 4px rgba(0,0,0,0.2)
          `,
        }}>
          {/* Glass shine/reflection on top surface */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              borderRadius: '4px 4px 0 0',
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
              height: 18,
              background: 'linear-gradient(to bottom, rgba(70,70,90,1) 0%, rgba(40,40,55,1) 60%, rgba(25,25,35,1) 100%)',
              borderRadius: '0 0 8px 8px',
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
              transform: isMobile ? 'translateX(-50%)' : 'translateX(-50%) rotateX(-12deg)',
              transformStyle: 'preserve-3d',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: 6,
              paddingBottom: 12,
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

            {/* Main Stack Icon - counter-rotated to stand upright */}
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
                // Counter-rotate to stand upright on the tilted shelf
                transform: isMobile 
                  ? (expandedStack === stack.id ? 'translateY(-8px)' : 'translateY(0)')
                  : (expandedStack === stack.id ? 'rotateX(-12deg) translateY(-12px)' : 'rotateX(-12deg) translateY(0)'),
                transformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              {/* The icon container */}
              <div style={{
                position: 'relative',
                width: isMobile ? 44 : 54,
                height: isMobile ? 44 : 54,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.25s ease',
                transform: expandedStack === stack.id ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
                transformStyle: 'preserve-3d',
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
                
                {/* Main icon background - glossy macOS style */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(180deg, rgba(100,100,115,0.95) 0%, rgba(60,60,75,1) 50%, rgba(45,45,60,1) 100%)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderTop: '1px solid rgba(255,255,255,0.35)',
                  boxShadow: expandedStack === stack.id
                    ? '0 10px 25px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)'
                    : '0 5px 15px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Glossy shine overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                    borderRadius: '12px 12px 0 0',
                    pointerEvents: 'none',
                  }} />
                  <span style={{
                    fontSize: isMobile ? 26 : 32,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
                    position: 'relative',
                    zIndex: 1,
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

      {/* Reflection on the surface below the dock */}
      {!isMobile && (
        <>
          {/* Surface the dock sits on */}
          <div style={{
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%) perspective(800px) rotateX(75deg)',
            width: '140%',
            height: 80,
            background: 'linear-gradient(to bottom, rgba(100,100,120,0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          {/* Dock reflection on that surface */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: 60,
            background: 'linear-gradient(to bottom, rgba(80,80,100,0.2) 0%, transparent 100%)',
            transform: 'scaleY(-1) rotateX(12deg)',
            transformOrigin: 'top center',
            opacity: 0.4,
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

