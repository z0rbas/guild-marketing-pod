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
      {/* 3D Dock Container - the "shelf" */}
      <div style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: isMobile ? 'none' : 'perspective(1000px) rotateX(-15deg)',
        transformOrigin: 'center bottom',
      }}>
        {/* The dock surface */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: isMobile ? 8 : 20,
          padding: isMobile ? '8px 16px 12px' : '20px 40px 24px',
          background: 'linear-gradient(180deg, rgba(60,60,70,0.95) 0%, rgba(35,35,45,0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? '24px 24px 0 0' : 20,
          border: '1px solid rgba(255,255,255,0.12)',
          borderBottom: isMobile ? 'none' : '3px solid rgba(20,20,25,0.9)',
          transformStyle: 'preserve-3d',
          boxShadow: isMobile ? '0 -10px 40px rgba(0,0,0,0.3)' : `
            0 25px 50px -15px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}>
          {/* Top surface shine */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '20px 20px 0 0',
              pointerEvents: 'none',
            }} />
          )}
          
          {/* Front face of the dock (the thickness you see) */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 16,
              background: 'linear-gradient(180deg, rgba(45,45,55,1) 0%, rgba(25,25,35,1) 100%)',
              borderRadius: '0 0 20px 20px',
              transform: 'translateZ(-8px) translateY(16px) rotateX(90deg)',
              transformOrigin: 'top center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
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
            {/* Expanded Stack Items */}
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: 8,
              paddingBottom: 12,
              opacity: expandedStack === stack.id ? 1 : 0,
              pointerEvents: expandedStack === stack.id ? 'auto' : 'none',
              transition: 'opacity 0.2s ease',
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

            {/* Main Stack Icon - 3D cube-like button */}
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: isMobile ? '10px 14px' : '16px 22px',
                background: expandedStack === stack.id
                  ? 'linear-gradient(180deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)'
                  : hasActiveWindow(stack)
                    ? 'linear-gradient(180deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%)'
                    : 'linear-gradient(180deg, rgba(70,70,80,0.9) 0%, rgba(50,50,60,0.9) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '3px solid rgba(30,30,40,0.9)',
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: expandedStack === stack.id 
                  ? 'translateY(-12px) translateZ(30px) scale(1.15)' 
                  : 'translateY(0) translateZ(10px) scale(1)',
                transformStyle: 'preserve-3d',
                position: 'relative',
                boxShadow: expandedStack === stack.id
                  ? '0 15px 35px -5px rgba(0,0,0,0.5), 0 5px 15px rgba(212,175,55,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'
                  : '0 8px 20px -5px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* 3D bottom face of the icon button */}
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -3,
                  height: 8,
                  background: 'linear-gradient(180deg, rgba(40,40,50,1) 0%, rgba(25,25,35,1) 100%)',
                  borderRadius: '0 0 14px 14px',
                  transform: 'rotateX(90deg)',
                  transformOrigin: 'top center',
                }} />
              )}
              
              {/* Stacked cards behind icon (3D effect) */}
              {!isMobile && stack.items.length > 1 && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: 6,
                    left: '50%',
                    transform: 'translateX(-50%) translateZ(-12px) rotateX(5deg) scale(0.88)',
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(180deg, rgba(55,55,65,0.9) 0%, rgba(40,40,50,0.9) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }} />
                  {stack.items.length > 2 && (
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      left: '50%',
                      transform: 'translateX(-50%) translateZ(-24px) rotateX(8deg) scale(0.76)',
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'linear-gradient(180deg, rgba(45,45,55,0.8) 0%, rgba(30,30,40,0.8) 100%)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }} />
                  )}
                </>
              )}
              
              <span style={{
                fontSize: isMobile ? 28 : 36,
                filter: expandedStack === stack.id 
                  ? 'drop-shadow(0 6px 16px rgba(212,175,55,0.6))'
                  : 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 2,
                transform: 'translateZ(5px)',
              }}>
                {stack.icon}
              </span>
              
              <span style={{
                fontSize: isMobile ? 9 : 11,
                fontWeight: 600,
                color: expandedStack === stack.id ? '#d4af37' : hasActiveWindow(stack) ? '#d4af37' : '#a0a0a8',
                textTransform: 'uppercase',
                letterSpacing: 1,
                transition: 'color 0.3s ease',
                transform: 'translateZ(5px)',
              }}>
                {stack.label}
              </span>

              {/* Active indicator */}
              {hasActiveWindow(stack) && (
                <div style={{
                  position: 'absolute',
                  bottom: 6,
                  left: '50%',
                  transform: 'translateX(-50%) translateZ(5px)',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#d4af37',
                  boxShadow: '0 0 12px rgba(212,175,55,0.9)',
                }} />
              )}

              {/* Item count badge */}
              <div style={{
                position: 'absolute',
                top: isMobile ? 4 : 8,
                right: isMobile ? 4 : 10,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e5c048 0%, #d4af37 100%)',
                color: '#0a0a0f',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                transform: 'translateZ(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                {stack.items.length}
              </div>
            </button>
          </div>
        ))}
        </div>
      </div>

      {/* Ground plane / surface the dock sits on */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: -30,
          left: '50%',
          transform: 'translateX(-50%) perspective(500px) rotateX(80deg)',
          width: '120%',
          height: 60,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}
      
      {/* Ground shadow */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: 30,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
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

