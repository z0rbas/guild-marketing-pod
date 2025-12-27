import React, { useState, useEffect, useRef } from 'react';

// Boot sequence component
const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [showLogo, setShowLogo] = useState(false);
  const [glitch, setGlitch] = useState(false);
  
  const bootLines = [
    { text: 'GUILD OS v2.026', delay: 0 },
    { text: 'Initializing sovereign protocols...', delay: 400 },
    { text: 'Loading skill modules...', delay: 800 },
    { text: 'Connecting to mentor network...', delay: 1200 },
    { text: 'Bypassing traditional education...', delay: 1600 },
    { text: 'Ready.', delay: 2200 },
  ];

  useEffect(() => {
    bootLines.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, delay);
    });
    
    setTimeout(() => setGlitch(true), 2600);
    setTimeout(() => setGlitch(false), 2700);
    setTimeout(() => setShowLogo(true), 2800);
    setTimeout(onComplete, 4000);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0a0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"JetBrains Mono", monospace',
      zIndex: 9999,
    }}>
      {/* Scanlines overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
        pointerEvents: 'none',
        opacity: 0.3,
      }} />
      
      {/* CRT flicker */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
        animation: 'flicker 0.15s infinite',
      }} />
      
      <div style={{
        width: '100%',
        maxWidth: 500,
        padding: '0 24px',
      }}>
        {lines.map((line, i) => (
          <div 
            key={i}
            style={{
              color: line === 'Ready.' ? '#d4af37' : '#3a3a4a',
              fontSize: 14,
              marginBottom: 8,
              animation: 'typeIn 0.3s ease',
              textShadow: line === 'Ready.' ? '0 0 10px rgba(212,175,55,0.5)' : 'none',
            }}
          >
            <span style={{ color: '#d4af37' }}>{line === 'Ready.' ? '► ' : '> '}</span>
            <span className="typing-text">{line}</span>
            {i === lines.length - 1 && line !== 'Ready.' && (
              <span style={{ animation: 'blink 0.8s infinite' }}>_</span>
            )}
          </div>
        ))}
      </div>
      
      {showLogo && (
        <div style={{
          marginTop: 60,
          textAlign: 'center',
          animation: 'logoReveal 0.8s ease',
        }}>
          <div style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#d4af37',
            letterSpacing: 8,
            marginBottom: 12,
            textShadow: '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3)',
            animation: 'glow 2s ease-in-out infinite alternate',
          }}>
            GUILD
          </div>
          <div style={{
            fontSize: 14,
            color: '#5a5a6a',
            letterSpacing: 4,
            animation: 'fadeIn 0.5s ease 0.3s both',
          }}>
            MARKETING POD
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes logoReveal {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes glow {
          from { text-shadow: 0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3); }
          to { text-shadow: 0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.5), 0 0 100px rgba(212,175,55,0.3); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
        }
      `}</style>
    </div>
  );
};

// Animated counter component
const AnimatedCounter = ({ target, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function for smooth animation
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Floating particles background
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)',
            borderRadius: '50%',
            left: `${p.left}%`,
            bottom: '-10px',
            animation: `float ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Sales Letter Page
const SalesLetter = ({ onEnterOS }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setHeroVisible(true);
    
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const progress = scrollTop / (scrollHeight - clientHeight);
        setScrollProgress(progress);
      }
    };

    const el = contentRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => { if (el) el.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0a0f',
      fontFamily: '"Inter", system-ui, sans-serif',
      overflow: 'hidden',
    }}>
      {/* Progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${scrollProgress * 100}%`,
        background: 'linear-gradient(90deg, #d4af37, #f4d03f)',
        zIndex: 100,
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 10px rgba(212,175,55,0.5), 0 0 20px rgba(212,175,55,0.3)',
      }} />

      {/* Scrollable content */}
      <div 
        ref={contentRef}
        style={{
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Hero Section */}
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
          position: 'relative',
        }}>
          {/* Animated background */}
          <FloatingParticles />
          
          {/* Background elements */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.05) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          }} />
          
          {/* Animated grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
            pointerEvents: 'none',
          }} />
          
          <div style={{
            maxWidth: 720,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            <div style={{
              fontSize: 12,
              color: '#d4af37',
              letterSpacing: 4,
              textTransform: 'uppercase',
              marginBottom: 24,
              fontWeight: 600,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.2s',
            }}>
              The Guild of Honour presents
            </div>
            
            <h1 style={{
              fontSize: 'clamp(48px, 10vw, 80px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              margin: '0 0 24px 0',
              letterSpacing: -2,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}>
              The Marketing<br />
              <span style={{ 
                color: '#d4af37',
                textShadow: '0 0 40px rgba(212,175,55,0.4)',
              }}>Pod</span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(18px, 3vw, 24px)',
              color: '#8a8a9a',
              lineHeight: 1.6,
              margin: '0 0 48px 0',
              maxWidth: 540,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.6s',
            }}>
              The entrepreneur's alternative to university.<br />
              Get paid to learn. Build real skills. Own your future.
            </p>
            
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 24,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.8s',
            }}>
              <div style={{
                padding: '12px 20px',
                background: 'rgba(255,50,50,0.1)',
                border: '1px solid rgba(255,50,50,0.2)',
                borderRadius: 8,
                color: '#ff6b6b',
                fontSize: 14,
                animation: 'pulseRed 3s ease-in-out infinite',
              }}>
                🎓 University (4 yrs) = -$108K
              </div>
              <div style={{
                padding: '12px 20px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 8,
                color: '#d4af37',
                fontSize: 14,
                animation: 'pulseGold 3s ease-in-out infinite',
              }}>
                ⚔️ Marketing Pod (4 yrs) = +$168K
              </div>
            </div>
            
            <div style={{
              padding: '16px 28px',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 10,
              display: 'inline-block',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
              transition: 'all 0.8s ease 1s',
            }}>
              <div style={{ fontSize: 13, color: '#8a8a9a', marginBottom: 4 }}>4-Year Difference:</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#d4af37', textShadow: '0 0 30px rgba(212,175,55,0.5)' }}>
                $<AnimatedCounter target={276000} duration={2500} />
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            animation: 'bounce 2s infinite',
          }}>
            <span style={{ fontSize: 12, color: '#4a4a5a', letterSpacing: 2 }}>SCROLL</span>
            <span style={{ fontSize: 20, color: '#4a4a5a' }}>↓</span>
          </div>
        </div>

        {/* The Letter */}
        <div style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '80px 24px 120px',
        }}>
          {/* Paper effect container */}
          <div style={{
            background: 'linear-gradient(180deg, #faf8f3 0%, #f5f2eb 100%)',
            borderRadius: 4,
            padding: 'clamp(32px, 8vw, 64px)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
            position: 'relative',
            transform: 'rotate(-0.5deg)',
            animation: 'paperSlide 1s ease-out',
          }}>
            {/* Paper texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")',
              opacity: 0.03,
              pointerEvents: 'none',
              borderRadius: 4,
            }} />
            
            {/* Wax seal decoration */}
            <div style={{
              position: 'absolute',
              top: -20,
              right: 40,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #e6c64a 0%, #d4af37 50%, #a88a2a 100%)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              animation: 'sealDrop 0.6s ease-out 0.5s both',
            }}>
              ⚔️
            </div>
            
            {/* Letter content */}
            <div style={{
              fontFamily: '"Caveat", cursive',
              color: '#1a1a2e',
              position: 'relative',
            }}>
              <p style={{ 
                fontSize: 28, 
                marginBottom: 32, 
                lineHeight: 1.5,
                animation: 'inkReveal 0.8s ease-out 0.3s both',
              }}>
                Hey —
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 28, 
                lineHeight: 1.6,
                animation: 'inkReveal 0.8s ease-out 0.5s both',
              }}>
                If you're reading this, you're probably asking yourself the same question I asked at your age:
              </p>
              
              <p style={{ 
                fontSize: 32, 
                marginBottom: 28, 
                lineHeight: 1.4,
                color: '#0a0a0f',
                fontWeight: 700,
                animation: 'inkReveal 0.8s ease-out 0.7s both',
              }}>
                "Is university really the only path?"
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 28, 
                lineHeight: 1.6,
                animation: 'inkReveal 0.8s ease-out 0.9s both',
              }}>
                You've seen the stats. $35K average debt at graduation — but that's just year one. After 4 years? You're $108K in the hole. And only 42% even finish on time. Then 52% of grads end up underemployed anyway.
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 28, 
                lineHeight: 1.6,
                animation: 'inkReveal 0.8s ease-out 1.1s both',
              }}>
                And here's the thing nobody tells you: the degree itself isn't even what you're paying for. You're paying for the <span style={{ borderBottom: '2px solid #d4af37' }}>soft skills</span> — communication, leadership, critical thinking, networking. The stuff that actually matters in business.
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 28, 
                lineHeight: 1.6,
                animation: 'inkReveal 0.8s ease-out 1.3s both',
              }}>
                But can you really learn leadership from a textbook? Can you learn negotiation by watching a lecture? Can you build a real network sitting in a classroom with other students who have zero experience?
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 28, 
                lineHeight: 1.6,
                animation: 'inkReveal 0.8s ease-out 1.5s both',
              }}>
                Meanwhile, you watch people on the internet building businesses, making money, living on their own terms — and wonder why nobody told you that was an option.
              </p>
              
              <p style={{ 
                fontSize: 28, 
                marginBottom: 28, 
                lineHeight: 1.5,
                color: '#0a0a0f',
                fontWeight: 700,
                animation: 'inkReveal 0.8s ease-out 1.7s both',
              }}>
                Well, I'm telling you now: it is.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 28, lineHeight: 1.6 }}>
                The Marketing Pod is what I wish existed when I was 18. It's an apprenticeship where you learn real, high-income skills — not by watching videos, but by doing actual client work.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 28, lineHeight: 1.6 }}>
                <span style={{ borderBottom: '2px solid #d4af37' }}>You get paid while you learn.</span> You build a real portfolio. You get mentored by people who've actually done it — not professors who read about it. After 4 years, you could have $168K+ earned instead of $108K owed.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 28, lineHeight: 1.6 }}>
                And by the end? You don't graduate with debt and hope. You graduate with income, skills, and the foundation to build your own sovereign business.
              </p>

              <div style={{
                background: '#1a1a2e',
                color: '#faf8f3',
                padding: 24,
                borderRadius: 8,
                marginBottom: 28,
                fontFamily: '"Inter", system-ui',
                fontSize: 15,
                lineHeight: 1.7,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 12, color: '#d4af37', fontSize: 13, letterSpacing: 1 }}>
                  HARD SKILLS (what makes you money):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginBottom: 20 }}>
                  {['Cold DM & Email', 'Funnel Building', 'Lead Research', 'Appointment Setting', 'Sales & Closing', 'CRM Systems', 'Client Management', 'Business Strategy'].map((skill, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#d4af37' }}>→</span> {skill}
                    </div>
                  ))}
                </div>
                
                <div style={{ fontWeight: 700, marginBottom: 12, color: '#d4af37', fontSize: 13, letterSpacing: 1 }}>
                  SOFT SKILLS (what university charges $108K-$235K for):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                  {['Communication', 'Leadership', 'Negotiation', 'Critical Thinking', 'Problem Solving', 'Time Management', 'Emotional Intelligence', 'Professional Networking'].map((skill, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#d4af37' }}>→</span> {skill}
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  marginTop: 16, 
                  paddingTop: 16, 
                  borderTop: '1px solid rgba(212,175,55,0.2)',
                  fontSize: 13,
                  color: '#8a8a9a',
                  fontStyle: 'italic',
                }}>
                  The difference? You'll learn these by doing real work with real clients — not by reading case studies in a lecture hall.
                </div>
              </div>
              
              <p style={{ fontSize: 24, marginBottom: 28, lineHeight: 1.6 }}>
                This isn't for everyone. It's for young people who are hungry, coachable, and willing to put in the work. People with honor who want to build something real.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 28, lineHeight: 1.6 }}>
                If that sounds like you — I'd be honored to show you around.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 8, lineHeight: 1.6 }}>
                Click below to explore the Guild OS and see if this path is right for you.
              </p>
              
              <div style={{ marginTop: 48 }}>
                <p style={{ fontSize: 28, marginBottom: 4 }}>— Stephan</p>
                <p style={{ fontSize: 18, color: '#6a6a7a' }}>Co-Founder, Guild of Honour</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div style={{
            textAlign: 'center',
            marginTop: 80,
            animation: 'fadeUp 0.8s ease-out 2s both',
          }}>
            <p style={{
              fontSize: 14,
              color: '#6a6a7a',
              marginBottom: 24,
              letterSpacing: 1,
            }}>
              Ready to see what's possible?
            </p>
            
            <button
              onClick={onEnterOS}
              style={{
                padding: '20px 48px',
                fontSize: 16,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 3,
                color: '#0a0a0f',
                background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
                backgroundSize: '200% 200%',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 8px 32px rgba(212,175,55,0.3), 0 0 0 0 rgba(212,175,55,0.4)',
                animation: 'shimmer 3s infinite, ctaPulse 2s ease-in-out infinite',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.02)';
                e.target.style.boxShadow = '0 16px 48px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 32px rgba(212,175,55,0.3), 0 0 0 0 rgba(212,175,55,0.4)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Enter The Guild →</span>
            </button>
            
            <p style={{
              fontSize: 12,
              color: '#4a4a5a',
              marginTop: 16,
            }}>
              Explore the full experience. No commitment.
            </p>
          </div>
          
          {/* Alternative quick apply */}
          <div style={{
            textAlign: 'center',
            marginTop: 60,
            padding: '32px',
            background: 'rgba(212,175,55,0.05)',
            borderRadius: 12,
            border: '1px solid rgba(212,175,55,0.1)',
          }}>
            <p style={{ fontSize: 14, color: '#8a8a9a', marginBottom: 16 }}>
              Already know this is for you?
            </p>
            <button
              style={{
                padding: '14px 32px',
                fontSize: 14,
                fontWeight: 600,
                color: '#d4af37',
                background: 'transparent',
                border: '2px solid #d4af37',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#d4af37';
                e.target.style.color = '#0a0a0f';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#d4af37';
              }}
            >
              Skip to Application →
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '40px 24px',
          borderTop: '1px solid #1a1a22',
        }}>
          <div style={{ fontSize: 12, color: '#3a3a4a', marginBottom: 8 }}>
            ⚔️ Guild of Honour
          </div>
          <div style={{ fontSize: 11, color: '#2a2a35' }}>
            Building honorable entrepreneurs since 2024
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes paperSlide {
          from { opacity: 0; transform: rotate(-0.5deg) translateY(40px); }
          to { opacity: 1; transform: rotate(-0.5deg) translateY(0); }
        }
        @keyframes sealDrop {
          0% { opacity: 0; transform: translateY(-30px) scale(0.5) rotate(-20deg); }
          60% { transform: translateY(5px) scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
        @keyframes inkReveal {
          from { opacity: 0; transform: translateY(10px); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(212,175,55,0.2); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,107,0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(255,107,107,0.2); }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(212,175,55,0.3), 0 0 0 0 rgba(212,175,55,0.4); }
          50% { box-shadow: 0 8px 32px rgba(212,175,55,0.3), 0 0 0 8px rgba(212,175,55,0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

// Draggable Window Component
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
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-content')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
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

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      onClick={() => onFocus(id)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width,
        height,
        background: 'linear-gradient(180deg, #141419 0%, #0d0d12 100%)',
        borderRadius: 12,
        border: '1px solid #2a2a35',
        boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 1px rgba(212,175,55,0.3)',
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
        style={{
          padding: '14px 16px',
          background: 'linear-gradient(180deg, #1a1a22 0%, #141419 100%)',
          borderBottom: '1px solid #2a2a35',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{
          flex: 1,
          fontSize: 13,
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
            fontSize: 14,
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
        padding: 20,
      }}>
        {children}
      </div>
      
      <style>{`
        @keyframes windowOpen {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// Dock Icon Component
const DockIcon = ({ icon, label, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '12px 16px',
        background: isActive ? 'rgba(212,175,55,0.15)' : 'transparent',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        transform: isHovered && !isActive ? 'translateY(-8px) scale(1.1)' : 'translateY(0) scale(1)',
      }}
    >
      <span style={{ 
        fontSize: 28,
        filter: isHovered ? 'drop-shadow(0 4px 8px rgba(212,175,55,0.4))' : 'none',
        transition: 'filter 0.3s ease',
      }}>{icon}</span>
      <span style={{
        fontSize: 10,
        color: isActive ? '#d4af37' : isHovered ? '#e0e0e0' : '#6a6a7a',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        fontWeight: 600,
        transition: 'color 0.3s ease',
      }}>
        {label}
      </span>
      {isActive && (
        <div style={{
          position: 'absolute',
          bottom: 4,
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#d4af37',
          boxShadow: '0 0 8px rgba(212,175,55,0.8)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      )}
      {isHovered && !isActive && (
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

// Window Content Components
const UniversityComparison = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chartAnimated, setChartAnimated] = useState(false);
  const containerRef = useRef(null);
  
  // 4-year trajectory data
  const universityPath = [
    { year: 0, amount: 0, label: 'Start' },
    { year: 1, amount: -27000, label: 'Year 1' },
    { year: 2, amount: -54000, label: 'Year 2' },
    { year: 3, amount: -81000, label: 'Year 3' },
    { year: 4, amount: -108000, label: 'Year 4' },
  ];
  
  const podPath = [
    { year: 0, amount: 0, label: 'Start' },
    { year: 1, amount: 18000, label: 'Year 1' },
    { year: 2, amount: 54000, label: 'Year 2' },
    { year: 3, amount: 102000, label: 'Year 3' },
    { year: 4, amount: 168000, label: 'Year 4' },
  ];

  const maxAmount = 168000;
  const minAmount = -108000;
  const range = maxAmount - minAmount;
  
  const getY = (amount) => {
    return ((maxAmount - amount) / range) * 180;
  };

  // Calculate path lengths for animation
  const uniPathD = universityPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / 4) * 100}% ${getY(p.amount)}`).join(' ');
  const podPathD = podPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / 4) * 100}% ${getY(p.amount)}`).join(' ');

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setChartAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Animated number component
  const AnimatedStat = ({ value, suffix = '', delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      const timer = setTimeout(() => {
        const duration = 1500;
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
      }, delay);
      return () => clearTimeout(timer);
    }, [isVisible, value, delay]);
    
    return <>{displayValue}{suffix}</>;
  };

  return (
    <div ref={containerRef} style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ 
        color: '#d4af37', 
        fontSize: 18, 
        marginBottom: 8, 
        fontWeight: 600,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.5s ease',
      }}>
        The Truth They Won't Tell You
      </h2>
      <p style={{ 
        color: '#6a6a7a', 
        fontSize: 12, 
        marginBottom: 20, 
        lineHeight: 1.6,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.5s ease 0.1s',
      }}>
        These aren't opinions. These are 2025 statistics from the Federal Reserve, Department of Education, and College Board.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{
          padding: 16,
          background: 'rgba(255,50,50,0.1)',
          borderRadius: 8,
          border: '1px solid rgba(255,50,50,0.2)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'all 0.5s ease 0.2s',
        }}>
          <div style={{ fontSize: 12, color: '#ff6b6b', marginBottom: 12, fontWeight: 600 }}>
            🎓 4-YEAR UNIVERSITY
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#ff6b6b', marginBottom: 4 }}>
            -$<AnimatedStat value={35639} delay={300} />
          </div>
          <div style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 8 }}>Avg student loan debt at graduation</div>
          <div style={{ fontSize: 11, color: '#6a6a7a', lineHeight: 1.5 }}>
            4-year cost: $108K-$235K. Plus interest. Plus 4 years lost income.
          </div>
        </div>
        
        <div style={{
          padding: 16,
          background: 'rgba(212,175,55,0.1)',
          borderRadius: 8,
          border: '1px solid rgba(212,175,55,0.2)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
          transition: 'all 0.5s ease 0.2s',
        }}>
          <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 12, fontWeight: 600 }}>
            ⚔️ MARKETING POD
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#d4af37', marginBottom: 4 }}>
            +$<AnimatedStat value={36000} delay={300} />
          </div>
          <div style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 8 }}>Potential earnings in year 1</div>
          <div style={{ fontSize: 11, color: '#6a6a7a', lineHeight: 1.5 }}>
            $0 tuition. Earn while you learn. Graduate with income streams.
          </div>
        </div>
      </div>

      {/* Hard Stats Section */}
      <div style={{ marginTop: 24 }}>
        <div style={{ 
          fontSize: 11, 
          color: '#d4af37', 
          marginBottom: 12, 
          fontWeight: 600, 
          letterSpacing: 1,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease 0.4s',
        }}>
          THE HARD STATS (2025 DATA):
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { value: 42, suffix: '%', label: '4-year grad rate', delay: 500 },
            { value: 5.8, suffix: '%', label: 'Unemployment (highest since \'13)', delay: 600, isDecimal: true },
            { value: 52, suffix: '%', label: 'Underemployed after grad', delay: 700 },
            { value: 10, suffix: '-25yr', label: 'Avg loan repayment time', delay: 800 },
          ].map((stat, i) => (
            <div key={i} style={{ 
              padding: 12, 
              background: '#1a1a22', 
              borderRadius: 8, 
              border: '1px solid #2a2a35',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.8)',
              transition: `all 0.4s ease ${0.4 + i * 0.1}s`,
            }}>
              <div style={{ fontSize: 20, color: '#ff6b6b', fontWeight: 700 }}>
                {stat.isDecimal ? '5.8%' : <><AnimatedStat value={stat.value} delay={stat.delay} />{stat.suffix}</>}
              </div>
              <div style={{ fontSize: 10, color: '#6a6a7a' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Year Trajectory Chart */}
      <div style={{ marginTop: 28 }}>
        <div style={{ 
          fontSize: 11, 
          color: '#d4af37', 
          marginBottom: 16, 
          fontWeight: 600, 
          letterSpacing: 1,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease 0.6s',
        }}>
          4-YEAR FINANCIAL TRAJECTORY:
        </div>
        
        <div style={{ 
          background: '#1a1a22', 
          borderRadius: 12, 
          padding: 20,
          border: '1px solid #2a2a35',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease 0.7s',
        }}>
          {/* Chart */}
          <div style={{ position: 'relative', height: 200, marginBottom: 16 }}>
            {/* Zero line */}
            <div style={{
              position: 'absolute',
              left: 40,
              right: 0,
              top: getY(0),
              height: 1,
              background: '#3a3a45',
              zIndex: 1,
            }}>
              <span style={{ 
                position: 'absolute', 
                left: -40, 
                top: -8, 
                fontSize: 10, 
                color: '#4a4a5a',
                width: 35,
                textAlign: 'right',
              }}>$0</span>
            </div>
            
            {/* Y-axis labels */}
            <div style={{ position: 'absolute', left: 0, top: getY(150000) - 6, fontSize: 9, color: '#4a4a5a' }}>+$150K</div>
            <div style={{ position: 'absolute', left: 0, top: getY(-100000) - 6, fontSize: 9, color: '#4a4a5a' }}>-$100K</div>
            
            {/* Grid lines */}
            {[100000, 50000, -50000, -100000].map((val, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: 40,
                right: 0,
                top: getY(val),
                height: 1,
                background: '#2a2a35',
                opacity: 0.5,
              }} />
            ))}
            
            {/* SVG for animated lines */}
            <svg style={{ position: 'absolute', left: 40, top: 0, width: 'calc(100% - 40px)', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#f4d03f" />
                </linearGradient>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#ff4757" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* University path (red) - animated */}
              <path
                d={universityPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / 4) * 100}% ${getY(p.amount)}`).join(' ')}
                fill="none"
                stroke="url(#redGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 500,
                  strokeDashoffset: chartAnimated ? 0 : 500,
                  transition: 'stroke-dashoffset 1.5s ease-out',
                }}
              />
              
              {/* Pod path (gold) - animated */}
              <path
                d={podPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / 4) * 100}% ${getY(p.amount)}`).join(' ')}
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 500,
                  strokeDashoffset: chartAnimated ? 0 : 500,
                  transition: 'stroke-dashoffset 1.5s ease-out 0.3s',
                }}
              />
              
              {/* Data points - University */}
              {universityPath.map((p, i) => (
                <circle
                  key={`uni-${i}`}
                  cx={`${(i / 4) * 100}%`}
                  cy={getY(p.amount)}
                  r="5"
                  fill="#0a0a0f"
                  stroke="#ff6b6b"
                  strokeWidth="2"
                  style={{
                    opacity: chartAnimated ? 1 : 0,
                    transform: chartAnimated ? 'scale(1)' : 'scale(0)',
                    transformOrigin: 'center',
                    transformBox: 'fill-box',
                    transition: `all 0.3s ease ${0.3 + i * 0.15}s`,
                  }}
                />
              ))}
              
              {/* Data points - Pod */}
              {podPath.map((p, i) => (
                <circle
                  key={`pod-${i}`}
                  cx={`${(i / 4) * 100}%`}
                  cy={getY(p.amount)}
                  r="5"
                  fill="#0a0a0f"
                  stroke="#d4af37"
                  strokeWidth="2"
                  style={{
                    opacity: chartAnimated ? 1 : 0,
                    transform: chartAnimated ? 'scale(1)' : 'scale(0)',
                    transformOrigin: 'center',
                    transformBox: 'fill-box',
                    transition: `all 0.3s ease ${0.5 + i * 0.15}s`,
                  }}
                />
              ))}
            </svg>
            
            {/* X-axis labels */}
            <div style={{ 
              position: 'absolute', 
              bottom: -20, 
              left: 40, 
              right: 0, 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: 10,
              color: '#4a4a5a',
            }}>
              <span>Start</span>
              <span>Yr 1</span>
              <span>Yr 2</span>
              <span>Yr 3</span>
              <span>Yr 4</span>
            </div>
          </div>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, paddingTop: 16, borderTop: '1px solid #2a2a35' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 3, background: '#ff6b6b', borderRadius: 2 }} />
              <span style={{ fontSize: 11, color: '#8a8a9a' }}>University Path</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 3, background: '#d4af37', borderRadius: 2 }} />
              <span style={{ fontSize: 11, color: '#8a8a9a' }}>Marketing Pod</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Totals */}
      <div style={{ marginTop: 20 }}>
        <div style={{ 
          fontSize: 11, 
          color: '#d4af37', 
          marginBottom: 12, 
          fontWeight: 600, 
          letterSpacing: 1,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease 0.9s',
        }}>
          WHERE YOU STAND AFTER 4 YEARS:
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{
            padding: 20,
            background: 'rgba(255,50,50,0.1)',
            borderRadius: 10,
            border: '1px solid rgba(255,50,50,0.3)',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 1s',
          }}>
            <div style={{ fontSize: 10, color: '#ff6b6b', marginBottom: 8, fontWeight: 600 }}>🎓 UNIVERSITY GRAD</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#ff6b6b' }}>
              -$<AnimatedStat value={108000} delay={1200} />
            </div>
            <div style={{ fontSize: 11, color: '#6a6a7a', marginTop: 8, lineHeight: 1.5 }}>
              In debt. No experience.<br/>Hoping for entry-level job.
            </div>
          </div>
          
          <div style={{
            padding: 20,
            background: 'rgba(212,175,55,0.1)',
            borderRadius: 10,
            border: '1px solid rgba(212,175,55,0.3)',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 1.1s',
          }}>
            <div style={{ fontSize: 10, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>⚔️ POD GRADUATE</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#d4af37' }}>
              +$<AnimatedStat value={168000} delay={1200} />
            </div>
            <div style={{ fontSize: 11, color: '#6a6a7a', marginTop: 8, lineHeight: 1.5 }}>
              Earned income. Real skills.<br/>Running your own business.
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: 16, 
          padding: 16, 
          background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)', 
          borderRadius: 10,
          border: '1px solid rgba(212,175,55,0.3)',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.5s ease 1.2s',
        }}>
          <div style={{ fontSize: 12, color: '#8a8a9a', marginBottom: 4 }}>Total 4-Year Difference:</div>
          <div style={{ 
            fontSize: 36, 
            fontWeight: 700, 
            color: '#d4af37',
            textShadow: '0 0 30px rgba(212,175,55,0.5)',
            animation: 'glow 2s ease-in-out infinite alternate',
          }}>
            $<AnimatedStat value={276000} delay={1400} />
          </div>
          <div style={{ fontSize: 11, color: '#6a6a7a', marginTop: 4 }}>
            That's not a typo. That's the real cost of choosing the wrong path.
          </div>
        </div>
      </div>

      {/* Assumptions */}
      <div style={{ 
        marginTop: 16, 
        padding: 12, 
        background: '#1a1a22', 
        borderRadius: 8,
        border: '1px solid #2a2a35',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.5s ease 1.4s',
      }}>
        <div style={{ fontSize: 10, color: '#4a4a5a', lineHeight: 1.6 }}>
          <strong style={{ color: '#6a6a7a' }}>Assumptions:</strong> University costs based on avg public in-state ($27K/yr including room & board). 
          Pod earnings assume progression: Yr1 $18K (setter), Yr2 $36K (closer), Yr3 $48K (coach), Yr4 $66K (strategist). 
          Actual results vary based on effort and market conditions.
        </div>
      </div>

      <div style={{ 
        marginTop: 12, 
        padding: 10, 
        background: 'rgba(212,175,55,0.05)', 
        borderRadius: 6, 
        fontSize: 9, 
        color: '#4a4a5a', 
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.5s ease 1.5s',
      }}>
        Sources: Federal Reserve Bank of NY, College Board Trends 2025-26, NCES, Burning Glass Institute
      </div>
      
      <style>{`
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(212,175,55,0.4); }
          to { text-shadow: 0 0 40px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.4); }
        }
      `}</style>
    </div>
  );
};

const ThePath = () => {
  const phases = [
    { 
      num: 1, 
      title: 'Observer', 
      desc: 'Watch. Learn. Understand the game.', 
      duration: '2 weeks',
      details: 'Shadow live campaigns. Study winning outreach. Learn the systems and tools. Absorb everything before you touch anything.',
      skills: ['Campaign observation', 'Tool familiarization', 'Industry research']
    },
    { 
      num: 2, 
      title: 'Researcher', 
      desc: 'Find leads. Build lists. Master the hunt.', 
      duration: '4 weeks',
      details: 'Learn to find ideal prospects using LinkedIn, Apollo, and other tools. Build targeted lists. Understand what makes a lead qualified.',
      skills: ['Lead sourcing', 'List building', 'Prospect qualification']
    },
    { 
      num: 3, 
      title: 'Setter', 
      desc: 'Book calls. Open doors. Create opportunities.', 
      duration: '8 weeks',
      details: 'Write cold DMs and emails that get responses. Handle objections. Book qualified appointments for closers. This is where you start earning.',
      skills: ['Cold outreach', 'Objection handling', 'Calendar management']
    },
    { 
      num: 4, 
      title: 'Closer', 
      desc: 'Close deals. Generate revenue. Prove yourself.', 
      duration: '12 weeks',
      details: 'Run sales calls. Present offers. Handle advanced objections. Close deals and earn commission. This is where income gets serious.',
      skills: ['Sales calls', 'Presentation', 'Negotiation', 'Closing']
    },
    { 
      num: 5, 
      title: 'Business Coach', 
      desc: 'Guide others. Share wisdom. Lead campaigns.', 
      duration: '6 months',
      details: 'Mentor newer Pod members. Manage small teams. Take ownership of client campaigns. Develop leadership skills.',
      skills: ['Team leadership', 'Campaign management', 'Mentorship']
    },
    { 
      num: 6, 
      title: 'Strategist', 
      desc: 'Design systems. Position brands. Think bigger.', 
      duration: '6 months',
      details: 'Create marketing strategies from scratch. Position brands in the market. Design offers and funnels. Think at the business level.',
      skills: ['Strategy development', 'Brand positioning', 'Offer creation']
    },
    { 
      num: 7, 
      title: 'Sovereign', 
      desc: 'Launch your own. Build your empire.', 
      duration: '∞',
      details: 'You\'ve mastered the skills. You\'ve built the network. Now launch your own Guild-aligned business and build your empire.',
      skills: ['Business ownership', 'Full autonomy', 'Legacy building']
    },
  ];

  const [expandedPhase, setExpandedPhase] = useState(null);

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        The 7 Phases of Mastery
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
        This isn't a course you "complete." It's a journey from absolute beginner to sovereign business owner. 
        Each phase builds on the last. Click any phase to see details.
      </p>
      
      <div style={{
        padding: 12,
        background: 'rgba(212,175,55,0.1)',
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 12,
        color: '#d4af37',
      }}>
        ⏱️ Average time to Phase 4 (Closer): <strong>6 months</strong> — That's when most members hit $3-5K/month
      </div>
      
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: 15,
          top: 20,
          bottom: 20,
          width: 2,
          background: 'linear-gradient(180deg, #d4af37 0%, #3a3a45 50%, #1a1a22 100%)',
        }} />
        
        {phases.map((phase, i) => (
          <div 
            key={i} 
            style={{
              marginBottom: 8,
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
          >
            <div style={{
              display: 'flex',
              gap: 16,
              padding: '8px 0',
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: i === 0 ? '#d4af37' : '#1a1a22',
                border: `2px solid ${i === 0 ? '#d4af37' : '#3a3a45'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: i === 0 ? '#0a0a0f' : '#6a6a7a',
                flexShrink: 0,
                zIndex: 1,
              }}>
                {phase.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: i === 0 ? '#d4af37' : '#e0e0e0',
                  }}>
                    {phase.title}
                  </span>
                  <span style={{
                    fontSize: 10,
                    color: '#4a4a5a',
                    background: '#1a1a22',
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}>
                    {phase.duration}
                  </span>
                  <span style={{ fontSize: 10, color: '#4a4a5a' }}>
                    {expandedPhase === i ? '▼' : '▶'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#6a6a7a', marginTop: 2 }}>
                  {phase.desc}
                </div>
              </div>
            </div>
            
            {expandedPhase === i && (
              <div style={{
                marginLeft: 48,
                padding: 12,
                background: '#1a1a22',
                borderRadius: 8,
                border: '1px solid #2a2a35',
                marginBottom: 8,
              }}>
                <p style={{ fontSize: 12, color: '#8a8a9a', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                  {phase.details}
                </p>
                <div style={{ fontSize: 10, color: '#6a6a7a', marginBottom: 6 }}>Skills you'll develop:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {phase.skills.map((skill, j) => (
                    <span key={j} style={{
                      padding: '4px 8px',
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      borderRadius: 4,
                      fontSize: 10,
                      color: '#d4af37',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: 16,
        padding: 16,
        background: '#1a1a22',
        borderRadius: 8,
        border: '1px solid #2a2a35',
      }}>
        <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>
          🎯 Important Note:
        </div>
        <p style={{ fontSize: 12, color: '#8a8a9a', margin: 0, lineHeight: 1.6 }}>
          You don't move to the next phase by "finishing modules." You move by demonstrating mastery. 
          Book enough appointments? You're a Setter. Close enough deals? You're a Closer. 
          <strong style={{ color: '#e0e0e0' }}> Results determine your rank, not time served.</strong>
        </p>
      </div>
    </div>
  );
};

const Curriculum = () => {
  const semesters = [
    {
      name: 'Semester 1: Foundations',
      duration: 'Weeks 1-6',
      phase: 'Observer → Researcher',
      courses: [
        {
          code: 'MKT 101',
          name: 'Introduction to Outbound Marketing',
          credits: 3,
          desc: 'Overview of outbound marketing fundamentals. Understanding the client acquisition landscape, key metrics, and campaign structures.',
          prereq: 'None',
          outcomes: ['Understand outbound vs inbound', 'Know key industry metrics', 'Navigate marketing tools']
        },
        {
          code: 'RES 101',
          name: 'Lead Research & Prospecting',
          credits: 3,
          desc: 'Master the art of finding ideal prospects. Build targeted lists using LinkedIn, Apollo, and database tools.',
          prereq: 'MKT 101',
          outcomes: ['Build qualified lead lists', 'Use Apollo & LinkedIn Sales Nav', 'Identify decision makers']
        },
        {
          code: 'COM 101',
          name: 'Business Communication Fundamentals',
          credits: 2,
          desc: 'Professional writing and communication. Email etiquette, Slack communication, and client-facing language.',
          prereq: 'None',
          outcomes: ['Write professional emails', 'Communicate clearly in teams', 'Present ideas concisely']
        },
        {
          code: 'SYS 101',
          name: 'CRM & Systems Management',
          credits: 2,
          desc: 'Introduction to GoHighLevel, HubSpot, and pipeline management. Keep everything organized and trackable.',
          prereq: 'None',
          outcomes: ['Navigate CRM systems', 'Manage contact pipelines', 'Track campaign metrics']
        },
      ]
    },
    {
      name: 'Semester 2: Outreach Mastery',
      duration: 'Weeks 7-14',
      phase: 'Researcher → Setter',
      courses: [
        {
          code: 'OUT 201',
          name: 'Cold Email Copywriting',
          credits: 3,
          desc: 'Write emails that get opened, read, and replied to. Subject lines, body copy, CTAs, and follow-up sequences.',
          prereq: 'COM 101, RES 101',
          outcomes: ['Write high-converting cold emails', 'Build email sequences', 'A/B test subject lines']
        },
        {
          code: 'OUT 202',
          name: 'LinkedIn & Social Outreach',
          credits: 3,
          desc: 'Master DM strategies for LinkedIn and other platforms. Connection requests, voice notes, and multi-touch sequences.',
          prereq: 'COM 101, RES 101',
          outcomes: ['Craft personalized DMs', 'Build LinkedIn presence', 'Use voice/video messages']
        },
        {
          code: 'SET 201',
          name: 'Appointment Setting I',
          credits: 4,
          desc: 'Turn conversations into booked calls. Qualification frameworks, calendar management, and show rate optimization.',
          prereq: 'OUT 201 or OUT 202',
          outcomes: ['Book qualified appointments', 'Handle initial objections', 'Manage calendars efficiently']
        },
        {
          code: 'PSY 201',
          name: 'Psychology of Persuasion',
          credits: 2,
          desc: 'Understanding human decision-making. Reciprocity, social proof, authority, and ethical influence.',
          prereq: 'None',
          outcomes: ['Apply persuasion principles', 'Build rapport quickly', 'Understand buyer psychology']
        },
      ]
    },
    {
      name: 'Semester 3: Sales & Closing',
      duration: 'Weeks 15-26',
      phase: 'Setter → Closer',
      courses: [
        {
          code: 'SAL 301',
          name: 'Discovery Call Mastery',
          credits: 4,
          desc: 'Run effective discovery calls. Diagnose problems, uncover pain points, and qualify opportunities.',
          prereq: 'SET 201, PSY 201',
          outcomes: ['Lead discovery conversations', 'Ask powerful questions', 'Identify qualified buyers']
        },
        {
          code: 'SAL 302',
          name: 'Objection Handling & Negotiation',
          credits: 3,
          desc: 'Handle any objection with confidence. Price concerns, timing issues, and competitive comparisons.',
          prereq: 'SAL 301',
          outcomes: ['Overcome common objections', 'Negotiate win-win deals', 'Handle price resistance']
        },
        {
          code: 'SAL 303',
          name: 'Closing Techniques',
          credits: 4,
          desc: 'Close deals consistently. Trial closes, assumptive closes, and creating urgency ethically.',
          prereq: 'SAL 301, SAL 302',
          outcomes: ['Close deals confidently', 'Recognize buying signals', 'Create ethical urgency']
        },
        {
          code: 'EQ 301',
          name: 'Emotional Intelligence in Sales',
          credits: 2,
          desc: 'Manage your emotions and read others. Handle rejection, stay motivated, and build lasting relationships.',
          prereq: 'PSY 201',
          outcomes: ['Manage rejection positively', 'Read emotional cues', 'Build client relationships']
        },
      ]
    },
    {
      name: 'Semester 4: Leadership & Strategy',
      duration: 'Weeks 27-52',
      phase: 'Closer → Business Coach',
      courses: [
        {
          code: 'LDR 401',
          name: 'Team Leadership & Mentorship',
          credits: 4,
          desc: 'Lead and develop others. Provide feedback, manage performance, and build team culture.',
          prereq: 'SAL 303, EQ 301',
          outcomes: ['Mentor junior members', 'Give effective feedback', 'Lead by example']
        },
        {
          code: 'STR 401',
          name: 'Campaign Strategy & Management',
          credits: 4,
          desc: 'Design and manage full campaigns. Client onboarding, KPI setting, and optimization.',
          prereq: 'All 300-level courses',
          outcomes: ['Design campaign strategies', 'Manage client expectations', 'Optimize for results']
        },
        {
          code: 'BUS 401',
          name: 'Business Operations & Systems',
          credits: 3,
          desc: 'Understand how agencies run. SOPs, hiring, client management, and scaling operations.',
          prereq: 'STR 401',
          outcomes: ['Build operational systems', 'Create SOPs', 'Think at business level']
        },
        {
          code: 'STR 402',
          name: 'Offer Creation & Positioning',
          credits: 3,
          desc: 'Create irresistible offers. Pricing strategies, positioning, and market differentiation.',
          prereq: 'STR 401',
          outcomes: ['Craft compelling offers', 'Position against competitors', 'Price for value']
        },
      ]
    },
  ];

  const [expandedSemester, setExpandedSemester] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const totalCredits = semesters.reduce((acc, sem) => 
    acc + sem.courses.reduce((a, c) => a + c.credits, 0), 0
  );

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 4, fontWeight: 600 }}>
            Official Curriculum
          </h2>
          <p style={{ color: '#6a6a7a', fontSize: 12, margin: 0 }}>
            Guild of Honour Marketing Pod — Course Catalog 2025-26
          </p>
        </div>
        <div style={{
          padding: '8px 12px',
          background: 'rgba(212,175,55,0.1)',
          borderRadius: 6,
          textAlign: 'right',
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#d4af37' }}>{totalCredits}</div>
          <div style={{ fontSize: 9, color: '#6a6a7a' }}>TOTAL CREDITS</div>
        </div>
      </div>
      
      <div style={{
        padding: 12,
        background: '#1a1a22',
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 11,
        color: '#8a8a9a',
        lineHeight: 1.6,
        border: '1px solid #2a2a35',
      }}>
        <strong style={{ color: '#d4af37' }}>Program Structure:</strong> 4 semesters, 16 courses, {totalCredits} credits. 
        Unlike university, you advance by <strong style={{ color: '#e0e0e0' }}>demonstrated competency</strong>, not seat time. 
        Complete all requirements in as little as 12 months.
      </div>

      {/* Semester accordion */}
      {semesters.map((semester, semIndex) => (
        <div key={semIndex} style={{ marginBottom: 8 }}>
          <div
            onClick={() => setExpandedSemester(expandedSemester === semIndex ? -1 : semIndex)}
            style={{
              padding: '14px 16px',
              background: expandedSemester === semIndex ? 'rgba(212,175,55,0.15)' : '#1a1a22',
              border: `1px solid ${expandedSemester === semIndex ? '#d4af37' : '#2a2a35'}`,
              borderRadius: expandedSemester === semIndex ? '8px 8px 0 0' : 8,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: expandedSemester === semIndex ? '#d4af37' : '#e0e0e0' }}>
                {semester.name}
              </div>
              <div style={{ fontSize: 11, color: '#6a6a7a', marginTop: 2 }}>
                {semester.duration} • {semester.phase} • {semester.courses.reduce((a, c) => a + c.credits, 0)} credits
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ 
                padding: '4px 8px', 
                background: '#0a0a0f', 
                borderRadius: 4, 
                fontSize: 10, 
                color: '#6a6a7a' 
              }}>
                {semester.courses.length} courses
              </div>
              <span style={{ color: '#4a4a5a', fontSize: 12 }}>
                {expandedSemester === semIndex ? '▼' : '▶'}
              </span>
            </div>
          </div>
          
          {expandedSemester === semIndex && (
            <div style={{
              background: '#0d0d12',
              border: '1px solid #2a2a35',
              borderTop: 'none',
              borderRadius: '0 0 8px 8px',
              padding: 12,
            }}>
              {semester.courses.map((course, courseIndex) => (
                <div
                  key={courseIndex}
                  onClick={() => setSelectedCourse(
                    selectedCourse?.code === course.code ? null : course
                  )}
                  style={{
                    padding: 12,
                    background: selectedCourse?.code === course.code ? 'rgba(212,175,55,0.1)' : '#1a1a22',
                    border: `1px solid ${selectedCourse?.code === course.code ? 'rgba(212,175,55,0.3)' : '#2a2a35'}`,
                    borderRadius: 6,
                    marginBottom: courseIndex < semester.courses.length - 1 ? 8 : 0,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{
                          padding: '2px 6px',
                          background: '#d4af37',
                          color: '#0a0a0f',
                          borderRadius: 3,
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: 'monospace',
                        }}>
                          {course.code}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#e0e0e0' }}>
                          {course.name}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: '#6a6a7a' }}>
                        {course.credits} credits • Prereq: {course.prereq}
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: '#4a4a5a' }}>
                      {selectedCourse?.code === course.code ? '▼' : '▶'}
                    </span>
                  </div>
                  
                  {selectedCourse?.code === course.code && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #2a2a35' }}>
                      <p style={{ fontSize: 12, color: '#8a8a9a', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                        {course.desc}
                      </p>
                      <div style={{ fontSize: 10, color: '#d4af37', marginBottom: 6, fontWeight: 600 }}>
                        LEARNING OUTCOMES:
                      </div>
                      {course.outcomes.map((outcome, i) => (
                        <div key={i} style={{ 
                          fontSize: 11, 
                          color: '#8a8a9a', 
                          marginBottom: 4,
                          display: 'flex',
                          gap: 6,
                        }}>
                          <span style={{ color: '#50c878' }}>✓</span> {outcome}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Soft skills sidebar */}
      <div style={{
        marginTop: 16,
        padding: 14,
        background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.02) 100%)',
        borderRadius: 8,
        border: '1px solid rgba(212,175,55,0.2)',
      }}>
        <div style={{ fontSize: 11, color: '#d4af37', marginBottom: 10, fontWeight: 600 }}>
          🎓 INTEGRATED SOFT SKILLS (Developed Throughout):
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Communication', 'Leadership', 'Critical Thinking', 'Time Management', 'Emotional Intelligence', 'Problem Solving', 'Negotiation', 'Resilience'].map((skill, i) => (
            <span key={i} style={{
              padding: '5px 10px',
              background: '#1a1a22',
              border: '1px solid #2a2a35',
              borderRadius: 4,
              fontSize: 10,
              color: '#8a8a9a',
            }}>
              {skill}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 10, color: '#6a6a7a', margin: '10px 0 0 0', lineHeight: 1.5 }}>
          These aren't separate courses — they're developed through every real client interaction, team collaboration, and campaign you work on.
        </p>
      </div>
      
      <div style={{
        marginTop: 12,
        padding: 12,
        background: '#1a1a22',
        borderRadius: 8,
        textAlign: 'center',
        border: '1px solid #2a2a35',
      }}>
        <p style={{ fontSize: 11, color: '#8a8a9a', margin: 0 }}>
          <strong style={{ color: '#e0e0e0' }}>University equivalent:</strong> Marketing Major + Sales Minor + Leadership Certificate
          <br />
          <span style={{ color: '#6a6a7a' }}>Completed in 12 months instead of 4 years. With income instead of debt.</span>
        </p>
      </div>
    </div>
  );
};

const EarningsSimulator = () => {
  const [month, setMonth] = useState(6);
  
  const earnings = {
    3: { min: 500, max: 1500, phase: 'Setter', activities: 'Booking 10-20 appointments/month', note: 'You\'re just getting started. First commission checks coming in.' },
    6: { min: 2000, max: 4000, phase: 'Closer', activities: 'Closing 2-5 deals/month', note: 'You\'re now running sales calls and closing your own deals.' },
    9: { min: 4000, max: 8000, phase: 'Business Coach', activities: 'Managing campaigns + closing', note: 'Leading a small team while still closing. Multiple income streams.' },
    12: { min: 6000, max: 12000, phase: 'Strategist', activities: 'Strategy + team + closing', note: 'You\'re operating at a senior level. Some members hit $15K+ here.' },
  };
  
  const closest = Object.keys(earnings).reduce((prev, curr) => 
    Math.abs(curr - month) < Math.abs(prev - month) ? curr : prev
  );
  const data = earnings[closest];

  // Calculate cumulative earnings
  const cumulativeEarnings = {
    3: { min: 1500, max: 4500 },
    6: { min: 7500, max: 18000 },
    9: { min: 19500, max: 42000 },
    12: { min: 37500, max: 78000 },
  };
  const cumulative = cumulativeEarnings[closest];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Earnings Simulator
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
        See your potential income as you progress through the phases. 
        These numbers are based on actual Pod member performance.
      </p>
      
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#6a6a7a' }}>Time in the Pod:</span>
          <span style={{ fontSize: 14, color: '#d4af37', fontWeight: 600 }}>{month} months</span>
        </div>
        <input
          type="range"
          min="3"
          max="12"
          step="3"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: '#d4af37',
            cursor: 'pointer',
            height: 8,
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          color: '#4a4a5a',
          marginTop: 8,
        }}>
          <span>3 mo</span>
          <span>6 mo</span>
          <span>9 mo</span>
          <span>12 mo</span>
        </div>
      </div>
      
      {/* Monthly earnings */}
      <div style={{
        padding: 20,
        background: 'rgba(212,175,55,0.1)',
        borderRadius: 12,
        border: '1px solid rgba(212,175,55,0.2)',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 4 }}>
          MONTHLY INCOME AT {month} MONTHS
        </div>
        <div style={{ fontSize: 11, color: '#d4af37', marginBottom: 8 }}>
          Phase: {data.phase}
        </div>
        <div style={{ fontSize: 42, fontWeight: 700, color: '#d4af37', marginBottom: 4 }}>
          ${data.min.toLocaleString()} - ${data.max.toLocaleString()}
        </div>
        <div style={{ fontSize: 12, color: '#6a6a7a' }}>
          per month
        </div>
      </div>
      
      {/* Cumulative earnings */}
      <div style={{
        padding: 16,
        background: '#1a1a22',
        borderRadius: 8,
        border: '1px solid #2a2a35',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: '#6a6a7a' }}>Total earned by month {month}:</span>
          <span style={{ fontSize: 16, color: '#e0e0e0', fontWeight: 600 }}>
            ${cumulative.min.toLocaleString()} - ${cumulative.max.toLocaleString()}
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#4a4a5a', marginBottom: 8 }}>
          What you'll be doing: <span style={{ color: '#8a8a9a' }}>{data.activities}</span>
        </div>
        <div style={{ fontSize: 11, color: '#6a6a7a', fontStyle: 'italic' }}>
          {data.note}
        </div>
      </div>
      
      {/* Comparison */}
      <div style={{
        padding: 16,
        background: 'rgba(255,50,50,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(255,50,50,0.1)',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color: '#ff6b6b', marginBottom: 8, fontWeight: 600 }}>
          Meanwhile, a university student at {month} months:
        </div>
        <div style={{ fontSize: 12, color: '#8a8a9a', lineHeight: 1.6 }}>
          {month <= 6 
            ? `Still in their first semester. $${(month * 4000).toLocaleString()} deeper in debt. Zero income. Zero real skills yet.`
            : `One semester down. $${(month * 4000).toLocaleString()} in debt. Maybe got a minimum wage part-time job.`
          }
        </div>
      </div>
      
      {/* How it works */}
      <div style={{
        padding: 14,
        background: '#1a1a22',
        borderRadius: 8,
        border: '1px solid #2a2a35',
      }}>
        <div style={{ fontSize: 11, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>
          💰 How You Earn:
        </div>
        <div style={{ fontSize: 11, color: '#8a8a9a', lineHeight: 1.7 }}>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Setters:</strong> Commission per qualified appointment booked</div>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Closers:</strong> Percentage of deals closed (typically 10-20%)</div>
          <div>• <strong style={{ color: '#e0e0e0' }}>Coaches:</strong> Base + commission + team overrides</div>
        </div>
      </div>
      
      <p style={{ fontSize: 10, color: '#4a4a5a', marginTop: 14, textAlign: 'center', lineHeight: 1.5 }}>
        * Earnings vary based on effort, skill development, and market conditions. 
        These figures represent typical ranges, not guarantees. Top performers exceed these numbers.
      </p>
    </div>
  );
};

const ProofOfWork = () => {
  const [activeTab, setActiveTab] = useState('stats');
  
  const results = [
    { metric: '127', label: 'Appointments Set', sublabel: 'Last 30 days', icon: '📅' },
    { metric: '34', label: 'Deals Closed', sublabel: 'Last 30 days', icon: '🤝' },
    { metric: '$89K', label: 'Revenue Generated', sublabel: 'For clients', icon: '💰' },
    { metric: '12', label: 'Active Campaigns', sublabel: 'Running now', icon: '📡' },
  ];

  const testimonials = [
    {
      quote: "I was working at a grocery store making $15/hr. Three months in, I made $2,400 in one week from setting appointments. This is real.",
      name: "Marcus T.",
      age: 19,
      phase: "Phase 3 Setter",
      result: "$2,400/week"
    },
    {
      quote: "My parents wanted me to go to university. I showed them my first $5K month and they stopped asking. Now they tell their friends about it.",
      name: "Sarah K.",
      age: 21,
      phase: "Phase 4 Closer",
      result: "$5,000/month"
    },
    {
      quote: "I dropped out of business school after one semester. Best decision I ever made. I've learned more in 6 months here than I would in 4 years there.",
      name: "James R.",
      age: 20,
      phase: "Phase 4 Closer",
      result: "$4,200/month"
    },
  ];

  const campaigns = [
    { client: "HVAC Company (Texas)", type: "Cold Email", status: "Active", appointments: "23 this month" },
    { client: "Roofing Contractor (Florida)", type: "LinkedIn DM", status: "Active", appointments: "18 this month" },
    { client: "SaaS Startup (Remote)", type: "Multi-channel", status: "Active", appointments: "31 this month" },
    { client: "Coaching Business (CA)", type: "Cold Email", status: "Active", appointments: "15 this month" },
  ];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Proof of Work
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
        We don't just talk about results. We show them. Here's what the Pod is producing right now.
      </p>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {[
          { id: 'stats', label: 'Live Stats' },
          { id: 'testimonials', label: 'Member Wins' },
          { id: 'campaigns', label: 'Active Campaigns' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: activeTab === tab.id ? 'rgba(212,175,55,0.2)' : '#1a1a22',
              border: `1px solid ${activeTab === tab.id ? '#d4af37' : '#2a2a35'}`,
              borderRadius: 6,
              color: activeTab === tab.id ? '#d4af37' : '#6a6a7a',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === 'stats' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {results.map((item, i) => (
              <div key={i} style={{
                padding: 14,
                background: '#1a1a22',
                borderRadius: 8,
                border: '1px solid #2a2a35',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#d4af37', marginBottom: 2 }}>
                  {item.metric}
                </div>
                <div style={{ fontSize: 11, color: '#e0e0e0', marginBottom: 2 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 10, color: '#4a4a5a' }}>
                  {item.sublabel}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            padding: 14,
            background: 'rgba(212,175,55,0.05)',
            borderRadius: 8,
            border: '1px solid rgba(212,175,55,0.1)',
          }}>
            <div style={{ fontSize: 11, color: '#6a6a7a', marginBottom: 6 }}>
              📊 What this means:
            </div>
            <p style={{ fontSize: 12, color: '#8a8a9a', margin: 0, lineHeight: 1.6 }}>
              These aren't vanity metrics. Every appointment is a real business owner sitting down for a sales call. 
              Every closed deal is real revenue for real clients. <strong style={{ color: '#e0e0e0' }}>This is what you'll be doing.</strong>
            </p>
          </div>
        </>
      )}
      
      {activeTab === 'testimonials' && (
        <div>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              padding: 16,
              background: '#1a1a22',
              borderRadius: 8,
              border: '1px solid #2a2a35',
              marginBottom: 12,
            }}>
              <p style={{ fontSize: 13, color: '#e0e0e0', fontStyle: 'italic', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#d4af37', fontWeight: 600 }}>
                    {t.name}, {t.age}
                  </div>
                  <div style={{ fontSize: 10, color: '#6a6a7a' }}>
                    {t.phase}
                  </div>
                </div>
                <div style={{
                  padding: '6px 10px',
                  background: 'rgba(212,175,55,0.1)',
                  borderRadius: 4,
                  fontSize: 11,
                  color: '#d4af37',
                  fontWeight: 600,
                }}>
                  {t.result}
                </div>
              </div>
            </div>
          ))}
          
          <div style={{
            padding: 12,
            background: 'rgba(212,175,55,0.05)',
            borderRadius: 8,
            fontSize: 11,
            color: '#6a6a7a',
            textAlign: 'center',
          }}>
            Real members. Real results. Your story could be next.
          </div>
        </div>
      )}
      
      {activeTab === 'campaigns' && (
        <div>
          <div style={{
            padding: 12,
            background: 'rgba(212,175,55,0.05)',
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 11,
            color: '#8a8a9a',
            lineHeight: 1.6,
          }}>
            🔴 <strong style={{ color: '#d4af37' }}>Live campaigns</strong> — These are real client campaigns running right now. 
            Pod members are actively working on these, booking appointments, and earning commissions.
          </div>
          
          {campaigns.map((c, i) => (
            <div key={i} style={{
              padding: 14,
              background: '#1a1a22',
              borderRadius: 8,
              border: '1px solid #2a2a35',
              marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, color: '#e0e0e0', fontWeight: 600 }}>
                    {c.client}
                  </div>
                  <div style={{ fontSize: 11, color: '#6a6a7a' }}>
                    {c.type}
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  background: 'rgba(80,200,120,0.1)',
                  border: '1px solid rgba(80,200,120,0.2)',
                  borderRadius: 4,
                  fontSize: 10,
                  color: '#50c878',
                }}>
                  {c.status}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#d4af37' }}>
                📅 {c.appointments}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TheCode = () => {
  const values = [
    { 
      title: 'Honor', 
      desc: 'Your word is your bond. Always.',
      expanded: 'In a world of broken promises and ghosted commitments, we do what we say. Every time. No exceptions. This is the foundation everything else is built on.',
      examples: ['Show up when you say you will', 'Deliver what you promise', 'Own your mistakes immediately']
    },
    { 
      title: 'Sovereignty', 
      desc: 'Own your path. No excuses.',
      expanded: 'You are 100% responsible for your results. Not your circumstances, not your past, not the market. You. This is terrifying and liberating at the same time.',
      examples: ['No blaming external factors', 'Take initiative without being asked', 'Make decisions and own outcomes']
    },
    { 
      title: 'Service', 
      desc: 'Create real value for real people.',
      expanded: 'We\'re not here to extract value — we\'re here to create it. Every appointment we book, every deal we close, should leave the client better off than before.',
      examples: ['Focus on client outcomes, not just metrics', 'Only sell what actually helps', 'Go above and beyond expectations']
    },
    { 
      title: 'Presence', 
      desc: 'Show up fully. Every single day.',
      expanded: 'Half-effort gets zero results. When you\'re working, work. When you\'re on a call, be fully there. Distraction is the enemy of mastery.',
      examples: ['Full focus during work hours', 'Active engagement in training', 'Consistent daily execution']
    },
  ];

  const [expandedValue, setExpandedValue] = useState(null);

  const expectations = [
    'Minimum 20 hours/week commitment',
    'Daily check-ins with your team',
    'Weekly skill development sessions',
    'Coachability — you must be willing to learn',
    'Integrity in all client interactions',
    'Support and uplift other Pod members',
  ];

  const notForYou = [
    'You want to "get rich quick" with no effort',
    'You can\'t handle direct feedback',
    'You\'re not willing to do outreach',
    'You think you already know everything',
    'You\'re looking for a passive income scheme',
  ];

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        The Code We Live By
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
        This isn't just a program. It's a way of being. These four values guide everything we do. 
        If they don't resonate with you, this probably isn't the right fit.
      </p>
      
      {values.map((value, i) => (
        <div 
          key={i} 
          style={{
            padding: 14,
            marginBottom: 10,
            background: '#1a1a22',
            borderRadius: 8,
            border: '1px solid #2a2a35',
            borderLeft: '3px solid #d4af37',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onClick={() => setExpandedValue(expandedValue === i ? null : i)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#d4af37', marginBottom: 4 }}>
                {value.title}
              </div>
              <div style={{ fontSize: 12, color: '#8a8a9a' }}>
                {value.desc}
              </div>
            </div>
            <span style={{ fontSize: 10, color: '#4a4a5a' }}>
              {expandedValue === i ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedValue === i && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #2a2a35' }}>
              <p style={{ fontSize: 12, color: '#8a8a9a', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                {value.expanded}
              </p>
              <div style={{ fontSize: 10, color: '#6a6a7a', marginBottom: 6 }}>What this looks like:</div>
              {value.examples.map((ex, j) => (
                <div key={j} style={{ fontSize: 11, color: '#e0e0e0', marginBottom: 4, display: 'flex', gap: 6 }}>
                  <span style={{ color: '#d4af37' }}>→</span> {ex}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* What we expect */}
      <div style={{
        marginTop: 20,
        padding: 16,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 12, fontWeight: 600 }}>
          ✓ What We Expect From You:
        </div>
        {expectations.map((exp, i) => (
          <div key={i} style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: '#50c878' }}>✓</span> {exp}
          </div>
        ))}
      </div>
      
      {/* Not for you if */}
      <div style={{
        marginTop: 12,
        padding: 16,
        background: 'rgba(255,50,50,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(255,50,50,0.1)',
      }}>
        <div style={{ fontSize: 12, color: '#ff6b6b', marginBottom: 12, fontWeight: 600 }}>
          ✗ This Is NOT For You If:
        </div>
        {notForYou.map((item, i) => (
          <div key={i} style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: '#ff6b6b' }}>✗</span> {item}
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: 16,
        padding: 14,
        background: '#1a1a22',
        borderRadius: 8,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, color: '#e0e0e0', fontStyle: 'italic', margin: 0 }}>
          "We don't just teach marketing. We build honorable entrepreneurs who change the world."
        </p>
        <div style={{ fontSize: 11, color: '#6a6a7a', marginTop: 8 }}>
          — Stephan S., Co-Founder
        </div>
      </div>
    </div>
  );
};

const MeetTheGuild = () => {
  const team = [
    { 
      name: 'Stephan Stavrakis', 
      role: 'Co-Founder & Lead Mentor', 
      emoji: '⚔️',
      bio: 'Serial entrepreneur with 15+ years in marketing and business development. Built multiple six-figure businesses. Now focused on training the next generation of honorable entrepreneurs.',
      specialties: ['Cold Outreach', 'Sales Systems', 'Business Strategy']
    },
    { 
      name: 'Evelyn Stavrakis', 
      role: 'Co-Founder & Strategy Lead', 
      emoji: '👑',
      bio: 'Strategic mind behind the Guild\'s growth. Expert in positioning, offer development, and building systems that scale. Passionate about creating ethical business frameworks.',
      specialties: ['Brand Strategy', 'Offer Creation', 'Operations']
    },
    { 
      name: 'Kosta Stavrakis', 
      role: 'Operations Lead', 
      emoji: '🎯',
      bio: 'Runs the day-to-day operations of client campaigns. Started as a Pod member, now leads teams. Living proof the system works.',
      specialties: ['Campaign Management', 'Team Leadership', 'CRM Systems']
    },
    { 
      name: 'Dante DiMarino', 
      role: 'Campaign Manager', 
      emoji: '📡',
      bio: 'Expert in multi-channel outreach campaigns. Manages some of our highest-performing client accounts. Mentors setters on outreach optimization.',
      specialties: ['Email Campaigns', 'LinkedIn Outreach', 'A/B Testing']
    },
  ];

  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Your Mentors
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
        Learn from people who've actually done it — not professors who read about it in a textbook. 
        Click on any mentor to learn more.
      </p>
      
      <div style={{
        padding: 12,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 12,
        color: '#8a8a9a',
        lineHeight: 1.6,
      }}>
        💡 <strong style={{ color: '#d4af37' }}>Why this matters:</strong> At university, you learn from academics. 
        In the Pod, you learn from practitioners who are actively running businesses and campaigns right now.
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {team.map((member, i) => (
          <div 
            key={i} 
            style={{
              padding: 14,
              background: selectedMentor === i ? 'rgba(212,175,55,0.1)' : '#1a1a22',
              borderRadius: 8,
              border: `1px solid ${selectedMentor === i ? '#d4af37' : '#2a2a35'}`,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => setSelectedMentor(selectedMentor === i ? null : i)}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{member.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e0e0e0', marginBottom: 2 }}>
              {member.name.split(' ')[0]} {member.name.split(' ')[1]?.[0]}.
            </div>
            <div style={{ fontSize: 10, color: '#6a6a7a' }}>
              {member.role}
            </div>
          </div>
        ))}
      </div>
      
      {selectedMentor !== null && (
        <div style={{
          marginTop: 16,
          padding: 16,
          background: '#1a1a22',
          borderRadius: 8,
          border: '1px solid #2a2a35',
          animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 36 }}>{team[selectedMentor].emoji}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#d4af37' }}>
                {team[selectedMentor].name}
              </div>
              <div style={{ fontSize: 12, color: '#6a6a7a' }}>
                {team[selectedMentor].role}
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: 12, color: '#8a8a9a', margin: '0 0 12px 0', lineHeight: 1.6 }}>
            {team[selectedMentor].bio}
          </p>
          
          <div style={{ fontSize: 10, color: '#6a6a7a', marginBottom: 6 }}>Specialties:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {team[selectedMentor].specialties.map((s, j) => (
              <span key={j} style={{
                padding: '4px 10px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 4,
                fontSize: 10,
                color: '#d4af37',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div style={{
        marginTop: 16,
        padding: 14,
        background: 'rgba(212,175,55,0.05)',
        borderRadius: 8,
        border: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div style={{ fontSize: 12, color: '#d4af37', marginBottom: 8, fontWeight: 600 }}>
          🤝 The Mentorship Model:
        </div>
        <div style={{ fontSize: 11, color: '#8a8a9a', lineHeight: 1.7 }}>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Daily access</strong> — Not once-a-week office hours. Real-time guidance.</div>
          <div style={{ marginBottom: 6 }}>• <strong style={{ color: '#e0e0e0' }}>Working alongside</strong> — You're not watching from the sidelines. You're in the trenches.</div>
          <div>• <strong style={{ color: '#e0e0e0' }}>Personalized feedback</strong> — On your actual outreach, calls, and campaigns.</div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const ApplyNow = () => {
  const [step, setStep] = useState(1);

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Ready to Begin?
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 24 }}>
        Not everyone gets in. That's by design.
      </p>
      
      <div style={{
        padding: 20,
        background: '#1a1a22',
        borderRadius: 12,
        border: '1px solid #2a2a35',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 12, color: '#6a6a7a', marginBottom: 16 }}>
          Application Process:
        </div>
        
        {[
          { num: 1, text: 'Submit your application' },
          { num: 2, text: 'Record a 2-min video intro' },
          { num: 3, text: 'Book your interview call' },
          { num: 4, text: 'Get accepted (or not)' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
            opacity: s.num <= step ? 1 : 0.4,
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: s.num <= step ? '#d4af37' : '#2a2a35',
              color: s.num <= step ? '#0a0a0f' : '#6a6a7a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
            }}>
              {s.num}
            </div>
            <span style={{ fontSize: 13 }}>{s.text}</span>
          </div>
        ))}
      </div>
      
      <button
        style={{
          width: '100%',
          padding: '16px 24px',
          background: 'linear-gradient(135deg, #d4af37 0%, #aa8a2a 100%)',
          border: 'none',
          borderRadius: 8,
          color: '#0a0a0f',
          fontSize: 14,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 2,
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 24px rgba(212,175,55,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        Apply Now →
      </button>
      
      <p style={{ fontSize: 11, color: '#4a4a5a', marginTop: 12, textAlign: 'center' }}>
        Applications reviewed within 48 hours
      </p>
    </div>
  );
};

// Main App
export default function GuildMarketingPod() {
  const [stage, setStage] = useState('boot'); // boot -> letter -> os
  const [openWindows, setOpenWindows] = useState(['apply']);
  const [windowOrder, setWindowOrder] = useState(['apply']);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleWindow = (id) => {
    if (openWindows.includes(id)) {
      setOpenWindows(openWindows.filter(w => w !== id));
      setWindowOrder(windowOrder.filter(w => w !== id));
    } else {
      setOpenWindows([...openWindows, id]);
      setWindowOrder([...windowOrder, id]);
    }
  };

  const focusWindow = (id) => {
    setWindowOrder([...windowOrder.filter(w => w !== id), id]);
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w !== id));
    setWindowOrder(windowOrder.filter(w => w !== id));
  };

  const windows = [
    { id: 'comparison', title: 'University vs Pod', icon: '🎓', component: <UniversityComparison />, position: { x: 40, y: 50 }, width: 520, height: 720 },
    { id: 'path', title: 'The Path', icon: '🗺️', component: <ThePath />, position: { x: 100, y: 70 }, width: 480, height: 620 },
    { id: 'curriculum', title: 'Curriculum', icon: '🧠', component: <Curriculum />, position: { x: 160, y: 50 }, width: 540, height: 680 },
    { id: 'earnings', title: 'Earnings Simulator', icon: '💰', component: <EarningsSimulator />, position: { x: 220, y: 80 }, width: 460, height: 640 },
    { id: 'proof', title: 'Proof of Work', icon: '📡', component: <ProofOfWork />, position: { x: 280, y: 60 }, width: 480, height: 580 },
    { id: 'code', title: 'The Code', icon: '📜', component: <TheCode />, position: { x: 340, y: 70 }, width: 460, height: 620 },
    { id: 'team', title: 'Meet The Guild', icon: '👥', component: <MeetTheGuild />, position: { x: 400, y: 50 }, width: 450, height: 600 },
    { id: 'apply', title: 'Apply Now', icon: '🎯', component: <ApplyNow />, position: { x: 180, y: 60 }, width: 440, height: 640 },
  ];

  // Boot stage
  if (stage === 'boot') {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <BootSequence onComplete={() => setStage('letter')} />
      </>
    );
  }

  // Sales letter stage
  if (stage === 'letter') {
    return <SalesLetter onEnterOS={() => setStage('os')} />;
  }

  // OS stage
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: `
        radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 50%),
        linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)
      `,
      fontFamily: '"Inter", system-ui, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      
      {/* Top Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 36,
        background: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1a1a22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 10000,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: '#d4af37', fontSize: 14 }}>⚔️</span>
          <span style={{
            color: '#d4af37',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
          }}>
            GUILD OS
          </span>
        </div>
        
        <button
          onClick={() => setStage('letter')}
          style={{
            background: 'none',
            border: 'none',
            color: '#6a6a7a',
            fontSize: 11,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 4,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.color = '#d4af37'}
          onMouseLeave={(e) => e.target.style.color = '#6a6a7a'}
        >
          ← Back to Letter
        </button>
        
        <div style={{
          fontSize: 12,
          color: '#6a6a7a',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Desktop Area */}
      <div style={{
        position: 'absolute',
        top: 36,
        left: 0,
        right: 0,
        bottom: 80,
      }}>
        {/* Hero Text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'rgba(212,175,55,0.08)',
            letterSpacing: 12,
            marginBottom: 8,
          }}>
            GUILD
          </div>
          <div style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}>
            Marketing Pod
          </div>
        </div>

        {/* Windows */}
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={openWindows.includes(win.id)}
            onClose={closeWindow}
            onFocus={focusWindow}
            initialPosition={win.position}
            zIndex={100 + windowOrder.indexOf(win.id)}
            width={win.width}
            height={win.height}
          >
            {win.component}
          </Window>
        ))}
      </div>

      {/* Dock */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(20,20,25,0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: 16,
        border: '1px solid #2a2a35',
        padding: '8px 12px',
        display: 'flex',
        gap: 4,
        zIndex: 10000,
      }}>
        {windows.map((win) => (
          <DockIcon
            key={win.id}
            icon={win.icon}
            label={win.title.split(' ')[0]}
            isActive={openWindows.includes(win.id)}
            onClick={() => toggleWindow(win.id)}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'gridMove 20s linear infinite',
      }} />
      
      {/* Global animations */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(212,175,55,0.2); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,107,0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(255,107,107,0.2); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
