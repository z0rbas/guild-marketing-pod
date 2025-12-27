import React, { useState, useEffect, useRef } from 'react';

const Window = ({ 
  id, 
  title, 
  icon, 
  children, 
  isOpen, 
  onClose, 
  initialPosition,
  zIndex,
  onFocus,
  width = 480,
  height = 400,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const windowRef = useRef(null);

  // Handle responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse drag handlers (desktop)
  const handleMouseDown = (e) => {
    if (isMobile) return;
    if (e.target.closest('.window-content')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus(id);
  };

  // Touch drag handlers (tablet)
  const handleTouchStart = (e) => {
    if (isMobile) return; // No dragging on mobile, full screen
    if (e.target.closest('.window-content')) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
    onFocus(id);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      });
    };

    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  // Mobile: full screen with bottom padding for dock
  const mobileStyles = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 70, // Leave room for dock
    width: '100%',
    height: 'auto',
    borderRadius: 0,
    border: 'none',
  };

  // Desktop/Tablet: positioned window
  const desktopStyles = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    width: Math.min(width, window.innerWidth - 40),
    height: Math.min(height, window.innerHeight - 100),
    borderRadius: 12,
    border: '1px solid #2a2a35',
  };

  return (
    <div
      ref={windowRef}
      onClick={() => onFocus(id)}
      style={{
        ...(isMobile ? mobileStyles : desktopStyles),
        background: 'linear-gradient(180deg, #141419 0%, #0d0d12 100%)',
        boxShadow: isMobile ? 'none' : '0 25px 80px rgba(0,0,0,0.8), 0 0 1px rgba(212,175,55,0.3)',
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'default',
        animation: 'windowOpen 0.3s ease',
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          padding: isMobile ? '16px' : '14px 16px',
          background: 'linear-gradient(180deg, #1a1a22 0%, #141419 100%)',
          borderBottom: '1px solid #2a2a35',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: isMobile ? 'default' : 'grab',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: isMobile ? 20 : 18 }}>{icon}</span>
        <span style={{
          flex: 1,
          fontSize: isMobile ? 14 : 13,
          fontWeight: 600,
          color: '#d4af37',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
          {title}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(id); }}
          style={{
            width: isMobile ? 36 : 24,
            height: isMobile ? 36 : 24,
            borderRadius: 6,
            border: '1px solid #3a3a45',
            background: '#1a1a22',
            color: '#6a6a7a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? 18 : 14,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#d4af37';
            e.target.style.color = '#0a0a0f';
            e.target.style.borderColor = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#1a1a22';
            e.target.style.color = '#6a6a7a';
            e.target.style.borderColor = '#3a3a45';
          }}
        >
          ✕
        </button>
      </div>
      
      {/* Content */}
      <div className="window-content" style={{
        flex: 1,
        overflow: 'auto',
        padding: isMobile ? 16 : 20,
        WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
      }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
