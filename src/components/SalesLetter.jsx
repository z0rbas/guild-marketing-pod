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
              gap: 16,
              marginBottom: 24,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.3s',
            }}>
              <span style={{ fontSize: 11, color: '#6a6a7a' }}>200+ members</span>
              <span style={{ color: '#3a3a4a' }}>•</span>
              <span style={{ fontSize: 11, color: '#6a6a7a' }}>12 countries</span>
              <span style={{ color: '#3a3a4a' }}>•</span>
              <span style={{ fontSize: 11, color: '#6a6a7a' }}>$89K generated this month</span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(48px, 10vw, 84px)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1,
              margin: '0 0 32px 0',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
              textAlign: 'center',
            }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 50%, #b8962e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(212,175,55,0.3)',
                letterSpacing: 12,
                paddingLeft: 12,
                display: 'block',
                marginBottom: 12,
              }}>Y.A.P.</span>
              <span style={{ 
                fontSize: 'clamp(18px, 4vw, 32px)',
                fontWeight: 500,
                color: '#ffffff',
                letterSpacing: 1,
                display: 'block',
                textTransform: 'uppercase',
                opacity: 0.9,
              }}>Youth Apprentice Program</span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(18px, 3vw, 24px)',
              color: '#8a8a9a',
              lineHeight: 1.6,
              margin: '0 0 48px 0',
              maxWidth: 580,
              marginLeft: 'auto',
              marginRight: 'auto',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.6s',
            }}>
              <strong>"Stop paying for a lecture. Get paid for a career."</strong><br />
              The hyper-modern alternative to the $108,422 university scam. Build a real business in 12 months—starting with $0 debt.
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
                ⚔️ Y.A.P. (4 yrs) = +$168K
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
          padding: isMobile ? '40px 16px 80px' : '80px 24px 120px',
        }}>
          {/* Paper effect container */}
          <div style={{
            background: `
              linear-gradient(90deg, transparent 79px, rgba(212,175,55,0.1) 79px, rgba(212,175,55,0.1) 81px, transparent 81px),
              repeating-linear-gradient(transparent, transparent 35px, #e8e8e8 35px, #e8e8e8 36px)
            `,
            backgroundSize: '100% 100%, 100% 36px',
            backgroundColor: '#faf8f3',
            borderRadius: 2,
            padding: 'clamp(32px, 8vw, 64px)',
            paddingTop: '80px',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
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
              background: '#faf8f3',
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
                  THE SO WHAT? CHAIN (YOUR FUTURE):
                </div>
                <div style={{ marginBottom: 20, fontSize: 14 }}>
                  <div style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: '#d4af37', fontWeight: 700 }}>1.</span> 
                    <div><strong>Skill Mastery:</strong> Learn AI automation and sales (The "How").</div>
                  </div>
                  <div style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: '#d4af37', fontWeight: 700 }}>2.</span> 
                    <div><strong>Financial:</strong> Get paid from Day 1. No debt. (The "What").</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: '#d4af37', fontWeight: 700 }}>3.</span> 
                    <div><strong>Emotional:</strong> Total sovereignty. You control your time, your location, and your worth. (The "Why").</div>
                  </div>
                </div>
                
                <div style={{ height: 1, background: 'rgba(212,175,55,0.2)', marginBottom: 20 }} />
                
                <div style={{ fontWeight: 700, marginBottom: 12, color: '#d4af37', fontSize: 13, letterSpacing: 1 }}>
                  HARD SKILLS (WHAT CLIENTS PAY FOR):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px 24px', marginBottom: 20 }}>
                  {['Cold DM & Email Systems', 'AI Workflow Automation', 'High-Ticket Closing', 'CRM Architecture', 'Appointment Setting', 'Lead Research AI', 'Business Strategy', 'Client Management'].map((skill, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#d4af37' }}>→</span> {skill}
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
              
              <div style={{ marginTop: 48 }}>
                <p style={{ fontSize: 28, marginBottom: 4 }}>— Stephan</p>
                <p style={{ fontSize: 18, color: '#6a6a7a' }}>Founder, Guild of Honour</p>
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
                padding: isMobile ? '18px 32px' : '20px 48px',
                fontSize: isMobile ? 15 : 16,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: isMobile ? 2 : 3,
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
                width: isMobile ? '100%' : 'auto',
                maxWidth: 320,
                minHeight: 56,
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.transform = 'translateY(-4px) scale(1.02)';
                  e.target.style.boxShadow = '0 16px 48px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 32px rgba(212,175,55,0.3), 0 0 0 0 rgba(212,175,55,0.4)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Learn More →</span>
            </button>
            
            <p style={{
              fontSize: 12,
              color: '#4a4a5a',
              marginTop: 16,
            }}>
              Explore the full experience. No commitment.
            </p>
            
            <div style={{
              marginTop: 24,
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 8,
              display: 'inline-block',
            }}>
              <p style={{ fontSize: 13, color: '#8a8a9a', margin: 0, fontStyle: 'italic' }}>
                "Best decision I ever made. Wish I found this at 18."
              </p>
              <p style={{ fontSize: 11, color: '#6a6a7a', margin: '4px 0 0 0' }}>
                — Marcus T., 19, Pod Member
              </p>
            </div>
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
              onClick={onSkipToApplication}
              style={{
                padding: isMobile ? '16px 28px' : '14px 32px',
                fontSize: 14,
                fontWeight: 600,
                color: '#d4af37',
                background: 'transparent',
                border: '2px solid #d4af37',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: isMobile ? '100%' : 'auto',
                maxWidth: 280,
                minHeight: 50,
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.background = '#d4af37';
                  e.target.style.color = '#0a0a0f';
                }
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
            200+ members trained across 12 countries since 2024
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
    </div>
  );
};

export default SalesLetter;

