import React, { useState, useEffect } from 'react';

const DockIcon = ({ icon, label, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        transform: isHovered && !isActive && !isMobile ? 'translateY(-8px) scale(1.1)' : 'translateY(0) scale(1)',
        minWidth: isMobile ? 50 : 'auto',
        minHeight: 44, // Touch-friendly minimum
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span style={{ 
        fontSize: isMobile ? 24 : 28,
        filter: isHovered ? 'drop-shadow(0 4px 8px rgba(212,175,55,0.4))' : 'none',
        transition: 'filter 0.3s ease',
      }}>{icon}</span>
      <span style={{
        fontSize: isMobile ? 9 : 10,
        color: isActive ? '#d4af37' : isHovered ? '#e0e0e0' : '#6a6a7a',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        fontWeight: 600,
        transition: 'color 0.3s ease',
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
      {isHovered && !isActive && !isMobile && (
        <div style={{
          position: 'absolute',
          top: -30,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '4px 8px',
          background: 'rgba(212,175,55,0.9)',
          color: '#0a0a0f',
          fontSize: 10,
          fontWeight: 600,
          borderRadius: 4,
          whiteSpace: 'nowrap',
          animation: 'tooltipFade 0.2s ease',
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
