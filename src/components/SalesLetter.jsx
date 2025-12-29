import React, { useState, useEffect, useRef } from 'react';
import FloatingParticles from './FloatingParticles';
import AnimatedCounter from './AnimatedCounter';

const SalesLetter = ({ onEnterOS, onSkipToApplication }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
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

    const handleResize = () => setIsMobile(window.innerWidth <= 640);

    const el = contentRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => { 
      if (el) el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#050a30',
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
          padding: isMobile ? '40px 16px' : '60px 24px',
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
          
          {/* 3D Perspective Grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            perspective: '1000px',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '-50%',
              right: '-50%',
              bottom: '-50%',
              backgroundImage: `
                linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              transform: 'rotateX(60deg)',
              transformOrigin: 'top center',
              animation: 'gridMove3D 30s linear infinite',
              opacity: 0.3,
            }} />
          </div>
          
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
              marginBottom: 16,
              fontWeight: 600,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.2s',
            }}>
              The Guild of Honour presents
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              marginBottom: 32,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.3s',
            }}>
              <div style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: '#ffffff', fontWeight: 600 }}>200+ members</div>
              <div style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: '#ffffff', fontWeight: 600 }}>12 countries</div>
              <div style={{ padding: '6px 14px', background: 'rgba(212,175,55,0.1)', borderRadius: 100, border: '1px solid rgba(212,175,55,0.2)', fontSize: 12, color: '#d4af37', fontWeight: 700 }}>$89K generated this month</div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(40px, 8vw, 72px)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: '0 0 32px 0',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
              textAlign: 'center',
            }}>
              <span style={{ 
                color: '#ffffff',
                textShadow: '0 2px 20px rgba(255,255,255,0.1)',
                display: 'block',
                marginBottom: 8,
              }}>Youth Apprentice Program</span>
              <span style={{ 
                fontSize: 'clamp(32px, 6vw, 48px)',
                fontFamily: '"Caveat", cursive',
                color: '#d4af37',
                display: 'block',
                opacity: 1,
                marginTop: 12,
                letterSpacing: 2,
                transform: 'rotate(-4deg)',
                textShadow: '2px 2px 0 rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4)',
              }}>(aka Y.A.P.)</span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(18px, 3vw, 24px)',
              color: '#ffffff',
              lineHeight: 1.6,
              margin: '0 0 48px 0',
              maxWidth: 580,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.6s',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}>
              <strong style={{ color: '#ffffff' }}>"Stop paying for a lecture. Get paid for a career."</strong><br />
              <span style={{ color: '#8a8a9a' }}>The hyper-modern alternative to the $108,422 university scam. Build a real business in 12 months—starting with $0 debt.</span>
            </p>
            
            <div style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 32,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.8s',
            }}>
              <div style={{
                padding: '16px 24px',
                background: 'rgba(255,50,50,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,50,50,0.2)',
                borderRadius: 12,
                color: '#ff6b6b',
                fontSize: 14,
                fontWeight: 600,
                animation: 'pulseRed 3s ease-in-out infinite',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}>
                🎓 University (4 yrs) = -$108,422
              </div>
              <div style={{
                padding: '16px 24px',
                background: 'rgba(212,175,55,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: 12,
                color: '#d4af37',
                fontSize: 14,
                fontWeight: 700,
                animation: 'pulseGold 3s ease-in-out infinite',
                boxShadow: '0 8px 32px rgba(212,175,55,0.1)',
              }}>
                ⚔️ Y.A.P. (4 yrs) = +$168,422
              </div>
            </div>
            
            <div style={{
              padding: '24px 40px',
              background: 'rgba(212,175,55,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 16,
              display: 'inline-block',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
              transition: 'all 0.8s ease 1s',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 0 20px rgba(212,175,55,0.1)',
            }}>
              <div style={{ fontSize: 13, color: '#8a8a9a', marginBottom: 8, letterSpacing: 1, fontWeight: 600 }}>4-YEAR DIFFERENCE:</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#d4af37', textShadow: '0 0 40px rgba(212,175,55,0.6)' }}>
                $<AnimatedCounter target={276844} duration={2500} />
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
          padding: isMobile ? '40px 16px 80px' : '80px 24px 120px',
        }}>
          {/* Paper effect container */}
          <div style={{
            background: `
              linear-gradient(90deg, transparent 79px, rgba(212,175,55,0.1) 79px, rgba(212,175,55,0.1) 81px, transparent 81px),
              repeating-linear-gradient(transparent, transparent 35px, #e8e8e8 35px, #e8e8e8 36px)
            `,
            backgroundSize: '100% 100%, 100% 36px',
            backgroundColor: '#fdfaf2',
            borderRadius: 2,
            padding: 'clamp(32px, 8vw, 64px)',
            paddingTop: '80px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)',
            position: 'relative',
            transform: 'rotate(-0.5deg)',
            animation: 'paperSlide 1s ease-out',
          }}>
            {/* Perforated edge at top */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 16,
              background: 'radial-gradient(circle, #050a30 6px, transparent 7px)',
              backgroundSize: '20px 20px',
              backgroundPosition: 'center -10px',
              backgroundRepeat: 'repeat-x',
              opacity: 1,
              zIndex: 2,
            }} />
            
            {/* Torn edge effect at top */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: '#fdfaf2',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              zIndex: 1,
            }} />
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
              zIndex: 10,
            }}>
              ⚔️
            </div>
            
            {/* Letter content */}
            <div style={{
              fontFamily: '"Caveat", cursive',
              color: '#1a1a2e',
              position: 'relative',
              lineHeight: '36px',
            }}>
              <p style={{ 
                fontSize: 28, 
                marginBottom: 36, 
                animation: 'inkReveal 0.8s ease-out 0.3s both',
              }}>
                Hey—
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 36, 
                animation: 'inkReveal 0.8s ease-out 0.5s both',
              }}>
                I’m going to tell you something your high school counselor is too scared to say:
              </p>
              
              <p style={{ 
                fontSize: 32, 
                marginBottom: 36, 
                color: '#0a0a0f',
                fontWeight: 700,
                animation: 'inkReveal 0.8s ease-out 0.7s both',
              }}>
                University isn’t an education anymore. It’s a $108,422 subscription to a lifestyle you can't afford.
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 36, 
                animation: 'inkReveal 0.8s ease-out 0.9s both',
              }}>
                While your friends are "finding themselves" in a lecture hall, the world is moving. 52.6% of grads end up in jobs that don't even require a degree. They spend 4.2 years paying for "soft skills" they could have learned in 4 months of real work.
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 36, 
                animation: 'inkReveal 0.8s ease-out 1s both',
              }}>
                I was 19 when I realized the game was rigged. I watched my friends take on massive debt for degrees they weren't sure about. I chose a different path—the one where <span style={{ borderBottom: '2px solid #d4af37' }}>I got paid to learn</span>.
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 36, 
                animation: 'inkReveal 0.8s ease-out 1.1s both',
              }}>
                Here's the secret: The degree isn't what matters. It's the **Result**.
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 36, 
                animation: 'inkReveal 0.8s ease-out 1.3s both',
              }}>
                The Y.A.P. is the bridge. It’s a 12-month sprint where you master AI systems, cold outreach, and business growth by actually doing it for real companies.
              </p>
              
              <p style={{ 
                fontSize: 28, 
                marginBottom: 36, 
                color: '#0a0a0f',
                fontWeight: 700,
                animation: 'inkReveal 0.8s ease-out 1.5s both',
              }}>
                This isn’t just about the money.
              </p>
              
              <p style={{ 
                fontSize: 24, 
                marginBottom: 36, 
                animation: 'inkReveal 0.8s ease-out 1.7s both',
              }}>
                It’s about the look on your parents' faces when you buy *them* dinner. It's about never having to ask a boss for "permission" to take a vacation. It's about the radical freedom of knowing that as long as you have a laptop, you have an empire.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 36 }}>
                By the end of this program, you won't have a piece of paper and a debt collector calling your phone. You'll have income, a portfolio of work, and the skills to be un-firable.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 36 }}>
                <span style={{ borderBottom: '2px solid #d4af37' }}>You earn while you learn.</span> You get mentored by the 212 members of the Guild who are already in the trenches. 
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 36 }}>
                This is the path I wish existed when I was 18.
              </p>

              <div style={{
                background: 'rgba(253, 250, 242, 0.95)',
                color: '#1a1a2e',
                padding: '32px',
                borderRadius: '4px',
                marginBottom: 28,
                fontFamily: '"Inter", system-ui',
                fontSize: 15,
                lineHeight: 1.7,
                border: '1px solid rgba(212,175,55,0.3)',
                boxShadow: 'inset 0 0 40px rgba(212,175,55,0.1), 0 10px 30px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Subtle stamp effect background */}
                <div style={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  fontSize: 120,
                  opacity: 0.03,
                  transform: 'rotate(-15deg)',
                  pointerEvents: 'none',
                }}>⚔️</div>

                <div style={{ fontWeight: 800, marginBottom: 16, color: '#a88a2a', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
                  THE SO WHAT? CHAIN (YOUR FUTURE):
                </div>
                <div style={{ marginBottom: 24, fontSize: 15 }}>
                  <div style={{ marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#d4af37', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>1</div> 
                    <div><strong style={{ color: '#0a0a0f' }}>Skill Mastery:</strong> Learn AI automation and sales (The "How").</div>
                  </div>
                  <div style={{ marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#d4af37', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>2</div> 
                    <div><strong style={{ color: '#0a0a0f' }}>Financial:</strong> Get paid from Day 1. No debt. (The "What").</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#d4af37', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>3</div> 
                    <div><strong style={{ color: '#0a0a0f' }}>Emotional:</strong> Total sovereignty. You control your time, your location, and your worth. (The "Why").</div>
                  </div>
                </div>
                
                <div style={{ height: 1, background: 'rgba(212,175,55,0.2)', marginBottom: 24 }} />
                
                <div style={{ fontWeight: 800, marginBottom: 16, color: '#a88a2a', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
                  HARD SKILLS (WHAT CLIENTS PAY FOR):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px 24px' }}>
                  {['Cold DM & Email Systems', 'AI Workflow Automation', 'High-Ticket Closing', 'CRM Architecture', 'Appointment Setting', 'Lead Research AI', 'Business Strategy', 'Client Management'].map((skill, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500 }}>
                      <span style={{ color: '#d4af37', fontSize: 18 }}>•</span> {skill}
                    </div>
                  ))}
                </div>
              </div>
              
              <p style={{ fontSize: 24, marginBottom: 36 }}>
                If you're hungry, coachable, and tired of being told to "wait your turn"—I want to meet you.
              </p>
              
              <p style={{ fontSize: 24, marginBottom: 36 }}>
                Click below to secure your future. Let’s build something real.
              </p>
              
              <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '3px solid #fdfaf2',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1), 0 0 0 1px rgba(212,175,55,0.3)',
                  overflow: 'hidden',
                  transform: 'rotate(-3deg)',
                  flexShrink: 0,
                  background: '#e0e0e0', // Fallback color
                }}>
                  <img 
                    src="/images/founder.jpg" 
                    alt="Stephan - Founder" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => e.target.style.display = 'none'} // Hide if image doesn't exist yet
                  />
                </div>
                <div>
                  <p style={{ fontSize: 28, marginBottom: 4, fontFamily: '"Caveat", cursive' }}>— Stephan</p>
                  <p style={{ fontSize: 16, color: '#6a6a7a', fontWeight: 500, letterSpacing: 1 }}>Founder, Guild of Honour</p>
                </div>
              </div>
              
              <div style={{ 
                marginTop: 32, 
                paddingTop: 24, 
                borderTop: '1px solid rgba(0,0,0,0.1)',
                fontFamily: '"Inter", system-ui',
              }}>
                <p style={{ fontSize: 14, color: '#4a4a5a', margin: 0, lineHeight: 1.7 }}>
                  <strong style={{ color: '#1a1a2e' }}>P.S.</strong> — Every day you wait is another day someone else takes your spot in the Guild. And another $27,422 you could be earning instead of owing.
                </p>
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
                padding: isMobile ? '20px 40px' : '24px 64px',
                fontSize: isMobile ? 16 : 18,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 4,
                color: '#050a30',
                background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 50%, #b8962e 100%)',
                backgroundSize: '200% auto',
                border: 'none',
                borderRadius: 100,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 15px 40px rgba(212,175,55,0.4), inset 0 -4px 0 rgba(0,0,0,0.15), 0 0 0 0 rgba(212,175,55,0.4)',
                animation: 'shimmer 3s infinite, ctaPulse 2s ease-in-out infinite',
                position: 'relative',
                overflow: 'hidden',
                width: isMobile ? '100%' : 'auto',
                minHeight: 64,
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(212,175,55,0.6), inset 0 -4px 0 rgba(0,0,0,0.15), 0 0 80px rgba(212,175,55,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,175,55,0.4), inset 0 -4px 0 rgba(0,0,0,0.15), 0 0 0 0 rgba(212,175,55,0.4)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-25deg)',
                animation: 'sweep 3s infinite',
              }} />
              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                Secure My Future <span style={{ fontSize: 22 }}>→</span>
              </span>
            </button>
            
            <p style={{
              fontSize: 13,
              color: '#4a4a5a',
              marginTop: 20,
              fontWeight: 500,
            }}>
              Zero debt. Zero lectures. Just Results.
            </p>
            
            <div style={{
              marginTop: 48,
              maxWidth: 500,
              margin: '48px auto 0',
              padding: '24px 32px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37 0%, #a88a2a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                flexShrink: 0,
                boxShadow: '0 5px 15px rgba(212,175,55,0.3)',
              }}>MT</div>
              <div>
                <p style={{ fontSize: 15, color: '#ffffff', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                  "Best decision I ever made. I'm 19 and already earning more than my parents did at 30."
                </p>
                <p style={{ fontSize: 12, color: '#d4af37', margin: '8px 0 0 0', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                  — Marcus T., Pod Member
                </p>
              </div>
            </div>
          </div>
          
          {/* Alternative quick apply */}
          <div style={{
            textAlign: 'center',
            marginTop: 80,
            padding: '48px 32px',
            background: 'linear-gradient(180deg, rgba(212,175,55,0.03) 0%, rgba(5,10,48,0.5) 100%)',
            borderRadius: 24,
            border: '1px solid rgba(212,175,55,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(212,175,55,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            
            <p style={{ fontSize: 15, color: '#8a8a9a', marginBottom: 24, fontWeight: 500 }}>
              Hungry to start?
            </p>
            <button
              onClick={onSkipToApplication}
              style={{
                padding: '16px 40px',
                fontSize: 14,
                fontWeight: 700,
                color: '#d4af37',
                background: 'transparent',
                border: '2px solid rgba(212,175,55,0.5)',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'all 0.3s',
                letterSpacing: 2,
                textTransform: 'uppercase',
                width: isMobile ? '100%' : 'auto',
                maxWidth: 300,
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(212,175,55,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Go straight to Application
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
            200+ members trained across 12 countries since 2024
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove3D {
          from { background-position: 0 0; }
          to { background-position: 0 80px; }
        }
        @keyframes sweep {
          0% { left: -100%; }
          50% { left: 150%; }
          100% { left: 150%; }
        }
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
    </div>
  );
};

export default SalesLetter;

