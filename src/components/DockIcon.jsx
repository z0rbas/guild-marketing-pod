import React, { useState, useEffect } from 'react';

const DockIcon = ({ icon, label, isActive, onClick, scale = 1, isNeighborHovered = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the actual scale based on hover state and neighbor effect
  const getScale = () => {
    if (isMobile) return 1;
    if (scale !== 1) return scale; // Use provided scale from parent
    if (isHovered) return 1.4;
    return 1;
  };

  const getTranslateY = () => {
    if (isMobile) return 0;
    if (scale !== 1) return -((scale - 1) * 20); // Lift based on scale
    if (isHovered) return -16;
    return 0;
  };

  const actualScale = getScale();
  const translateY = getTranslateY();
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hovered={isHovered}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? 4 : 6,
        padding: isMobile ? '8px 10px' : '12px 16px',
        background: isActive ? 'rgba(212,175,55,0.15)' : 'transparent',
        border: 'none',
        borderRadius: isMobile ? 8 : 12,
        cursor: 'pointer',
        transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        transform: `translateY(${translateY}px) scale(${actualScale})`,
        transformOrigin: 'bottom center',
        minWidth: isMobile ? 50 : 'auto',
        minHeight: 44,
        WebkitTapHighlightColor: 'transparent',
        zIndex: isHovered ? 10 : 1,
      }}
    >
      <span style={{ 
        fontSize: isMobile ? 24 : 28,
        filter: isHovered || scale > 1.1 ? 'drop-shadow(0 4px 12px rgba(212,175,55,0.5))' : 'none',
        transition: 'filter 0.15s ease',
      }}>{icon}</span>
      <span style={{
        fontSize: isMobile ? 9 : 10,
        color: isActive ? '#d4af37' : isHovered ? '#e0e0e0' : '#6a6a7a',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        fontWeight: 600,
        transition: 'color 0.15s ease',
        maxWidth: isMobile ? 45 : 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {isMobile ? label.split(' ')[0] : label}
      </span>
      {isActive && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? 2 : 4,
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#d4af37',
          boxShadow: '0 0 8px rgba(212,175,55,0.8)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      )}
      {isHovered && !isMobile && (
        <div style={{
          position: 'absolute',
          top: -28,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '6px 12px',
          background: 'rgba(10,15,60,0.95)',
          color: '#d4af37',
          fontSize: 11,
          fontWeight: 600,
          borderRadius: 6,
          whiteSpace: 'nowrap',
          animation: 'tooltipFade 0.15s ease',
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}>
          {label}
        </div>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes tooltipFade {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </button>
  );
};

export default DockIcon;
