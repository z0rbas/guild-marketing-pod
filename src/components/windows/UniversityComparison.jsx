import React, { useState, useEffect, useRef } from 'react';

// Animated number component - MUST be outside the main component to prevent remounting
const AnimatedStat = ({ value, suffix = '', delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const target = Number(value) || 0;
  
  useEffect(() => {
    let frameId = null;
    let cancelled = false;
    
    const timer = setTimeout(() => {
      if (cancelled) return;
      
      const duration = 1500;
      const startTime = Date.now();
      
      const animate = () => {
        if (cancelled) return;
        
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * target);
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue(target); // Final value
        }
      };
      
      frameId = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, delay]);
  
  return <>{displayValue.toLocaleString()}{suffix}</>;
};

const UniversityComparison = () => {
  const [isVisible, setIsVisible] = useState(true); // Start visible so animations can begin
  const [chartAnimated, setChartAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
    // Set visible immediately so animations can start
    setIsVisible(true);
    const timer = setTimeout(() => setChartAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
      
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 16 }}>
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
            -$<AnimatedStat value={108000} delay={300} />
          </div>
          <div style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 8 }}>Total 4-year cost (tuition + room & board)</div>
          <div style={{ fontSize: 11, color: '#6a6a7a', lineHeight: 1.5 }}>
            Plus interest. Plus 4 years of lost income potential.
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
            +$<AnimatedStat value={168000} delay={300} />
          </div>
          <div style={{ fontSize: 11, color: '#8a8a9a', marginBottom: 8 }}>Total 4-year earnings potential</div>
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
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr', gap: isMobile ? 8 : 10 }}>
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
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 10 : 12 }}>
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
              -$<AnimatedStat value={Number(108000)} delay={1200} />
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
              +$<AnimatedStat value={Number(168000)} delay={1200} />
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
            $<AnimatedStat value={Number(276000)} delay={1400} />
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

export default UniversityComparison;