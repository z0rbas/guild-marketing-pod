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
      {/* 3D Dock Container - the "shelf" viewed from above */}
      <div style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}>
        {/* The dock surface - tilted like a shelf you're looking down at */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: isMobile ? 8 : 12,
          padding: isMobile ? '8px 16px 12px' : '16px 28px 20px',
          background: isMobile 
            ? 'rgba(40,40,50,0.95)'
            : 'linear-gradient(to bottom, rgba(180,180,190,0.25) 0%, rgba(120,120,130,0.3) 50%, rgba(60,60,70,0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? '20px 20px 0 0' : '8px 8px 12px 12px',
          border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.3)',
          borderTop: isMobile ? 'none' : '1px solid rgba(255,255,255,0.5)',
          borderBottom: isMobile ? 'none' : '4px solid rgba(40,40,50,0.95)',
          transform: isMobile ? 'none' : 'rotateX(45deg)',
          transformOrigin: 'center bottom',
          transformStyle: 'preserve-3d',
          boxShadow: isMobile ? '0 -10px 40px rgba(0,0,0,0.3)' : `
            0 20px 40px -10px rgba(0,0,0,0.5),
            inset 0 2px 4px rgba(255,255,255,0.2)
          `,
        }}>
          {/* Glass reflection on top surface */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
              borderRadius: '8px 8px 0 0',
              pointerEvents: 'none',
            }} />
          )}
          
          {/* Front face of the dock shelf (the edge you see) */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: -1,
              right: -1,
              bottom: -4,
              height: 20,
              background: 'linear-gradient(180deg, rgba(80,80,90,1) 0%, rgba(50,50,60,1) 30%, rgba(30,30,40,1) 100%)',
              borderRadius: '0 0 12px 12px',
              transform: 'rotateX(-90deg)',
              transformOrigin: 'top center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: 'none',
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
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: 10,
              paddingBottom: 16,
              opacity: expandedStack === stack.id ? 1 : 0,
              pointerEvents: expandedStack === stack.id ? 'auto' : 'none',
              transition: 'opacity 0.2s ease',
              // Counter-rotate to appear upright in the 3D space
              transform: isMobile ? 'translateX(-50%)' : 'translateX(-50%) rotateX(-45deg)',
              transformOrigin: 'center bottom',
            }}>
              {stack.items.map((itemId, itemIndex) => {
                const win = getWindowById(itemId);
                if (!win) return null;
                
                const isActive = openWindows.includes(itemId);
                const delay = itemIndex * 0.05;
                const translateY = expandedStack === stack.id ? 0 : 20;
                const scale = expandedStack === stack.id ? 1 : 0.8;
                const rotateX = expandedStack === stack.id ? 0 : 30;
                
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
                      padding: '10px 16px',
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(40,40,50,0.95) 0%, rgba(30,30,40,0.95) 100%)',
                      border: `1px solid ${isActive ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 12,
                      cursor: 'pointer',
                      transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                      transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
                      transformStyle: 'preserve-3d',
                      boxShadow: isActive 
                        ? '0 4px 20px rgba(212,175,55,0.3), 0 0 0 1px rgba(212,175,55,0.2) inset'
                        : '0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset',
                      whiteSpace: 'nowrap',
                      minWidth: 140,
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = `translateY(${translateY}px) scale(1.05) rotateX(${rotateX}deg)`;
                        e.currentTarget.style.boxShadow = isActive 
                          ? '0 8px 30px rgba(212,175,55,0.4), 0 0 0 1px rgba(212,175,55,0.3) inset'
                          : '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
                      e.currentTarget.style.boxShadow = isActive 
                        ? '0 4px 20px rgba(212,175,55,0.3), 0 0 0 1px rgba(212,175,55,0.2) inset'
                        : '0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset';
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{win.icon}</span>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: isActive ? '#d4af37' : '#e0e0e0',
                    }}>
                      {win.title}
                    </span>
                    {isActive && (
                      <div style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#d4af37',
                        marginLeft: 'auto',
                        boxShadow: '0 0 8px rgba(212,175,55,0.8)',
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Stack Icon - standing upright on the tilted shelf */}
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: isMobile ? '8px 12px' : '8px 14px 6px',
                background: 'transparent',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                // Counter-rotate to stand upright, plus lift on hover
                transform: isMobile 
                  ? 'none'
                  : expandedStack === stack.id 
                    ? 'rotateX(-45deg) translateY(-20px) scale(1.2)' 
                    : 'rotateX(-45deg) translateY(0) scale(1)',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center bottom',
                position: 'relative',
              }}
            >
              {/* Icon reflection on the dock surface */}
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%) rotateX(90deg) scaleY(0.5)',
                  transformOrigin: 'center top',
                  width: 50,
                  height: 30,
                  background: `radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.25) 0%, transparent 70%)`,
                  filter: 'blur(3px)',
                  opacity: expandedStack === stack.id ? 0.8 : 0.5,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }} />
              )}
              
              {/* The actual icon - large and prominent */}
              <div style={{
                position: 'relative',
                width: isMobile ? 48 : 56,
                height: isMobile ? 48 : 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: expandedStack === stack.id
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)'
                  : hasActiveWindow(stack)
                    ? 'linear-gradient(180deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
                borderRadius: 14,
                boxShadow: expandedStack === stack.id
                  ? '0 8px 24px -4px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 4px 12px -2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
              }}>
                {/* Stacked cards behind icon */}
                {!isMobile && stack.items.length > 1 && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: 3,
                      left: 3,
                      right: 3,
                      bottom: 3,
                      borderRadius: 12,
                      background: 'rgba(60,60,70,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transform: 'translate(-4px, -4px)',
                      zIndex: -1,
                    }} />
                    {stack.items.length > 2 && (
                      <div style={{
                        position: 'absolute',
                        top: 3,
                        left: 3,
                        right: 3,
                        bottom: 3,
                        borderRadius: 12,
                        background: 'rgba(50,50,60,0.4)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        transform: 'translate(-8px, -8px)',
                        zIndex: -2,
                      }} />
                    )}
                  </>
                )}
                
                <span style={{
                  fontSize: isMobile ? 28 : 32,
                  filter: expandedStack === stack.id 
                    ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  transition: 'all 0.3s ease',
                }}>
                  {stack.icon}
                </span>
                
                {/* Item count badge */}
                <div style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e5c048 0%, #d4af37 100%)',
                  color: '#0a0a0f',
                  fontSize: 11,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}>
                  {stack.items.length}
                </div>
              </div>
              
              {/* Label */}
              <span style={{
                fontSize: isMobile ? 9 : 10,
                fontWeight: 600,
                color: expandedStack === stack.id ? '#d4af37' : hasActiveWindow(stack) ? '#d4af37' : '#b0b0b8',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 2,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                transition: 'color 0.3s ease',
              }}>
                {stack.label}
              </span>

              {/* Active indicator dot */}
              {hasActiveWindow(stack) && (
                <div style={{
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#d4af37',
                  boxShadow: '0 0 8px rgba(212,175,55,0.9)',
                }} />
              )}
            </button>
          </div>
        ))}
        </div>
      </div>

      {/* Reflection of the dock on the "surface" below */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%) scaleY(-1)',
          width: '100%',
          height: 40,
          background: 'linear-gradient(to bottom, rgba(100,100,110,0.15) 0%, transparent 100%)',
          borderRadius: '0 0 8px 8px',
          filter: 'blur(4px)',
          opacity: 0.6,
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
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

