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
  width: initialWidth = 480,
  height: initialHeight = 400,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState(null);
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

  // Resize handlers
  const handleResizeStart = (e) => {
    if (isMobile || isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setIsResizing(true);
    setResizeStart({
      x: clientX,
      y: clientY,
      width: size.width,
      height: size.height,
    });
    onFocus(id);
  };

  // Maximize/restore toggle
  const toggleMaximize = () => {
    if (isMaximized) {
      // Restore
      if (preMaximizeState) {
        setPosition(preMaximizeState.position);
        setSize(preMaximizeState.size);
      }
      setIsMaximized(false);
    } else {
      // Maximize
      setPreMaximizeState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ 
        width: window.innerWidth, 
        height: window.innerHeight - 70 // Leave room for dock
      });
      setIsMaximized(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        setSize({
          width: Math.max(300, resizeStart.width + deltaX),
          height: Math.max(200, resizeStart.height + deltaY),
        });
      }
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (isDragging) {
        setPosition({
          x: touch.clientX - dragOffset.x,
          y: touch.clientY - dragOffset.y,
        });
      }
      if (isResizing) {
        const deltaX = touch.clientX - resizeStart.x;
        const deltaY = touch.clientY - resizeStart.y;
        setSize({
          width: Math.max(300, resizeStart.width + deltaX),
          height: Math.max(200, resizeStart.height + deltaY),
        });
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
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
  }, [isDragging, isResizing, dragOffset, resizeStart]);

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
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? '100%' : Math.min(size.width, window.innerWidth - 40),
    height: isMaximized ? 'calc(100vh - 70px)' : Math.min(size.height, window.innerHeight - 100),
    borderRadius: isMaximized ? 0 : 12,
    border: isMaximized ? 'none' : '1px solid #1c2b70',
  };

  return (
    <div
      ref={windowRef}
      onClick={() => onFocus(id)}
      style={{
        ...(isMobile ? mobileStyles : desktopStyles),
        background: 'linear-gradient(180deg, #0a124a 0%, #070e40 100%)',
        boxShadow: isMobile ? 'none' : '0 25px 80px rgba(0,0,0,0.8), 0 0 1px rgba(212,175,55,0.3)',
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : isResizing ? 'se-resize' : 'default',
        animation: 'windowOpen 0.3s ease',
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={() => !isMobile && toggleMaximize()}
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
        {/* Maximize button - desktop only */}
        {!isMobile && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              border: '1px solid #3a3a45',
              background: '#1a1a22',
              color: '#6a6a7a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2a2a35';
              e.target.style.color = '#d4af37';
              e.target.style.borderColor = '#d4af37';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1a1a22';
              e.target.style.color = '#6a6a7a';
              e.target.style.borderColor = '#3a3a45';
            }}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? '⧉' : '⬜'}
          </button>
        )}
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

      {/* Resize handle - desktop only, not when maximized */}
      {!isMobile && !isMaximized && (
        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 20,
            height: 20,
            cursor: 'se-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4a4a55',
            fontSize: 10,
            userSelect: 'none',
          }}
          title="Drag to resize"
        >
          ⋱
        </div>
      )}
    </div>
  );
};

export default Window;
