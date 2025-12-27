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
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: isMobile ? 8 : 16,
        padding: isMobile ? '8px 16px 12px' : '16px 32px 20px',
        background: 'linear-gradient(180deg, rgba(50,50,60,0.95) 0%, rgba(25,25,30,0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: isMobile ? '24px 24px 0 0' : 24,
        border: '1px solid rgba(255,255,255,0.15)',
        borderBottom: isMobile ? 'none' : '1px solid rgba(80,80,90,0.5)',
        transform: isMobile ? 'none' : 'perspective(800px) rotateX(12deg)',
        transformOrigin: 'bottom center',
        transformStyle: 'preserve-3d',
        boxShadow: isMobile ? '0 -10px 40px rgba(0,0,0,0.3)' : `
          0 30px 60px -20px rgba(0,0,0,0.7),
          0 0 0 1px rgba(255,255,255,0.08) inset,
          0 -2px 10px rgba(255,255,255,0.05) inset,
          0 15px 30px -5px rgba(0,0,0,0.4)
        `,
      }}>
        {/* 3D Depth - Top surface highlight */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
            borderRadius: '24px 24px 0 0',
            pointerEvents: 'none',
          }} />
        )}
        
        {/* 3D Depth - Bottom edge (thickness) */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: -8,
            left: 8,
            right: 8,
            height: 12,
            background: 'linear-gradient(180deg, rgba(15,15,20,0.95) 0%, rgba(10,10,15,0.9) 100%)',
            borderRadius: '0 0 20px 20px',
            transform: 'perspective(800px) rotateX(-60deg)',
            transformOrigin: 'top center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,0,0,0.3)',
            borderTop: 'none',
          }} />
        )}
        
        {/* 3D Depth - Left edge */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: 8,
            bottom: 0,
            left: -6,
            width: 10,
            background: 'linear-gradient(90deg, rgba(20,20,25,0.9) 0%, rgba(35,35,45,0.95) 100%)',
            borderRadius: '12px 0 0 12px',
            transform: 'perspective(400px) rotateY(45deg)',
            transformOrigin: 'right center',
            boxShadow: '-5px 0 15px rgba(0,0,0,0.3)',
          }} />
        )}
        
        {/* 3D Depth - Right edge */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: 8,
            bottom: 0,
            right: -6,
            width: 10,
            background: 'linear-gradient(270deg, rgba(20,20,25,0.9) 0%, rgba(35,35,45,0.95) 100%)',
            borderRadius: '0 12px 12px 0',
            transform: 'perspective(400px) rotateY(-45deg)',
            transformOrigin: 'left center',
            boxShadow: '5px 0 15px rgba(0,0,0,0.3)',
          }} />
        )}
        
        {/* Inner glow */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            inset: 1,
            borderRadius: 23,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 50%)',
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

            {/* Main Stack Icon */}
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: isMobile ? '10px 14px' : '14px 20px',
                background: expandedStack === stack.id
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)'
                  : hasActiveWindow(stack)
                    ? 'rgba(212,175,55,0.1)'
                    : 'transparent',
                border: 'none',
                borderRadius: 14,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: expandedStack === stack.id 
                  ? 'translateY(-8px) translateZ(20px) scale(1.1)' 
                  : 'translateY(0) translateZ(0) scale(1)',
                transformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              {/* Stacked cards behind icon (3D effect) */}
              {!isMobile && stack.items.length > 1 && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: 4,
                    left: '50%',
                    transform: 'translateX(-50%) translateZ(-10px) scale(0.9)',
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(50,50,60,0.8)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }} />
                  {stack.items.length > 2 && (
                    <div style={{
                      position: 'absolute',
                      top: 8,
                      left: '50%',
                      transform: 'translateX(-50%) translateZ(-20px) scale(0.8)',
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'rgba(40,40,50,0.6)',
                      border: '1px solid rgba(255,255,255,0.03)',
                    }} />
                  )}
                </>
              )}
              
              <span style={{
                fontSize: isMobile ? 28 : 34,
                filter: expandedStack === stack.id 
                  ? 'drop-shadow(0 4px 12px rgba(212,175,55,0.5))'
                  : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                transition: 'filter 0.3s ease',
                position: 'relative',
                zIndex: 2,
              }}>
                {stack.icon}
              </span>
              
              <span style={{
                fontSize: isMobile ? 9 : 10,
                fontWeight: 600,
                color: expandedStack === stack.id ? '#d4af37' : hasActiveWindow(stack) ? '#d4af37' : '#8a8a9a',
                textTransform: 'uppercase',
                letterSpacing: 1,
                transition: 'color 0.3s ease',
              }}>
                {stack.label}
              </span>

              {/* Active indicator */}
              {hasActiveWindow(stack) && (
                <div style={{
                  position: 'absolute',
                  bottom: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#d4af37',
                  boxShadow: '0 0 10px rgba(212,175,55,0.8)',
                }} />
              )}

              {/* Item count badge */}
              <div style={{
                position: 'absolute',
                top: isMobile ? 4 : 6,
                right: isMobile ? 4 : 8,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'rgba(212,175,55,0.9)',
                color: '#0a0a0f',
                fontSize: 9,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}>
                {stack.items.length}
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Reflection effect */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%) perspective(800px) rotateX(60deg) scaleY(0.4)',
          width: '90%',
          height: 40,
          background: 'linear-gradient(180deg, rgba(40,40,50,0.4) 0%, transparent 100%)',
          borderRadius: 16,
          opacity: 0.5,
          filter: 'blur(6px)',
          pointerEvents: 'none',
        }} />
      )}
      
      {/* Ground shadow */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: 20,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 70%)',
          filter: 'blur(10px)',
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

