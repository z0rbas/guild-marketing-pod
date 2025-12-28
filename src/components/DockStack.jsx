import React, { useState, useEffect } from 'react';

const DockStack = ({ id, label, icon, items, openWindows, onToggleWindow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeCount = items.filter(item => openWindows.includes(item.id)).length;
  const isExpanded = isHovered;

  return (
    <div 
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
    >
      {/* Expanded Items Container */}
      <div style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: isExpanded ? 'translateX(-50%) translateY(-10px)' : 'translateX(-50%) translateY(10px)',
        display: 'flex',
        flexDirection: 'column-reverse', // Stack upwards
        gap: 8,
        paddingBottom: 10,
        opacity: isExpanded ? 1 : 0,
        pointerEvents: isExpanded ? 'auto' : 'none',
        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 20,
        width: 'max-content',
      }}>
        {items.map((item, index) => {
          const isActive = openWindows.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWindow(item.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 16px',
                background: 'rgba(20, 20, 25, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isActive ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 12,
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: 160,
                transform: isExpanded ? 'scale(1)' : 'scale(0.8)',
                transition: `all 0.2s ease ${index * 0.05}s`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(30, 30, 35, 1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(20, 20, 25, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                  color: isActive ? '#d4af37' : '#e0e0e0',
                  fontSize: 13,
                  fontWeight: 600,
                }}>
                  {item.title}
                </span>
              </div>
              {isActive && (
                <div style={{
                  marginLeft: 'auto',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#d4af37',
                  boxShadow: '0 0 8px rgba(212,175,55,0.6)',
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
          gap: isMobile ? 4 : 6,
          padding: isMobile ? '8px 10px' : '12px 16px',
          background: isExpanded ? 'rgba(212,175,55,0.15)' : 'transparent',
          border: 'none',
          borderRadius: isMobile ? 8 : 12,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          transform: isExpanded ? 'translateY(-5px)' : 'translateY(0)',
          minWidth: isMobile ? 50 : 'auto',
        }}
      >
        <div style={{ position: 'relative' }}>
          <span style={{ 
            fontSize: isMobile ? 24 : 32,
            filter: isExpanded ? 'drop-shadow(0 4px 12px rgba(212,175,55,0.5))' : 'none',
            transition: 'filter 0.2s ease',
          }}>
            {icon}
          </span>
          <div style={{
             position: 'absolute',
             top: -6,
             right: -6,
             background: '#d4af37',
             color: '#0a0a0f',
             fontSize: 10,
             fontWeight: 'bold',
             borderRadius: 10,
             minWidth: 18, 
             height: 18,
             padding: '0 4px',
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
             border: '1px solid rgba(0,0,0,0.1)'
          }}>
            {items.length}
          </div>
        </div>
        <span style={{
          fontSize: isMobile ? 9 : 10,
          color: isExpanded ? '#d4af37' : '#6a6a7a',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginTop: 4,
        }}>
          {label}
        </span>
        {activeCount > 0 && (
          <div style={{
             position: 'absolute',
             bottom: isMobile ? 2 : 4,
             width: 4, 
             height: 4, 
             borderRadius: '50%', 
             background: '#d4af37',
             boxShadow: '0 0 6px #d4af37'
          }} />
        )}
      </button>
    </div>
  );
};

export default DockStack;

