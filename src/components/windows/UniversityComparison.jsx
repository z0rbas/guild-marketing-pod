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

      {/* 4-Year Trajectory Chart - Bar + Line */}
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
          {/* Bar + Line Chart */}
          <div style={{ position: 'relative', height: 240, marginBottom: 16 }}>
            {/* Y-axis labels */}
            <div style={{ position: 'absolute', left: 0, top: 5, fontSize: 9, color: '#4a4a5a' }}>+$168K</div>
            <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#5a5a6a', fontWeight: 600 }}>$0</div>
            <div style={{ position: 'absolute', left: 0, bottom: 25, fontSize: 9, color: '#4a4a5a' }}>-$108K</div>
            
            {/* Chart area */}
            <div style={{ 
              position: 'absolute', 
              left: 45, 
              right: 0, 
              top: 0, 
              bottom: 25,
              borderLeft: '1px solid #3a3a45',
              borderBottom: '1px solid #3a3a45',
            }}>
              {/* Zero line */}
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '60.87%', // 168/(168+108) = 60.87%
                height: 2,
                background: '#4a4a5a',
                zIndex: 5,
              }} />
              
              {/* Grid lines */}
              {[25, 50, 75].map((pct, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${pct}%`,
                  height: 1,
                  background: '#2a2a35',
                  opacity: 0.5,
                }} />
              ))}
              
              {/* Bars container */}
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'stretch',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
                {[1, 2, 3, 4].map((year) => {
                  const uniAmount = universityPath[year].amount;
                  const podAmount = podPath[year].amount;
                  const zeroLinePos = 60.87; // percentage from top
                  const chartHeight = 100; // percentage
                  
                  // Calculate bar heights (percentage of chart)
                  const uniBarHeight = Math.abs(uniAmount) / 276000 * 100 * 0.9;
                  const podBarHeight = Math.abs(podAmount) / 276000 * 100 * 0.9;
                  
                  return (
                    <div key={year} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1,
                      position: 'relative',
                      height: '100%',
                    }}>
                      {/* Pod bar (above zero line) */}
                      <div style={{
                        position: 'absolute',
                        bottom: `${100 - zeroLinePos}%`,
                        width: isMobile ? 16 : 24,
                        height: chartAnimated ? `${podBarHeight}%` : '0%',
                        background: 'linear-gradient(180deg, #f4d03f 0%, #d4af37 100%)',
                        borderRadius: '4px 4px 0 0',
                        boxShadow: '0 0 10px rgba(212,175,55,0.3)',
                        transition: `height 0.8s ease ${0.3 + year * 0.15}s`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingTop: 4,
                      }}>
                        {chartAnimated && podAmount > 30000 && (
                          <span style={{ 
                            fontSize: 8, 
                            color: '#0a0a0f', 
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                          }}>
                            +${(podAmount / 1000).toFixed(0)}K
                          </span>
                        )}
                      </div>
                      
                      {/* University bar (below zero line) */}
                      <div style={{
                        position: 'absolute',
                        top: `${zeroLinePos}%`,
                        width: isMobile ? 16 : 24,
                        marginLeft: isMobile ? 18 : 28,
                        height: chartAnimated ? `${uniBarHeight}%` : '0%',
                        background: 'linear-gradient(180deg, #ff6b6b 0%, #ff4757 100%)',
                        borderRadius: '0 0 4px 4px',
                        boxShadow: '0 0 10px rgba(255,107,107,0.3)',
                        transition: `height 0.8s ease ${0.2 + year * 0.15}s`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingBottom: 4,
                      }}>
                        {chartAnimated && Math.abs(uniAmount) > 20000 && (
                          <span style={{ 
                            fontSize: 8, 
                            color: '#fff', 
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                          }}>
                            -${(Math.abs(uniAmount) / 1000).toFixed(0)}K
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* SVG for trend lines overlay - using viewBox for proper scaling */}
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: 0, 
                  width: '100%', 
                  height: '100%', 
                  overflow: 'visible', 
                  pointerEvents: 'none', 
                  zIndex: 10 
                }}
              >
                <defs>
                  <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Pod trend line (gold) - going UP */}
                <polyline
                  points={podPath.slice(1).map((p, i) => {
                    const x = 12.5 + (i * 25); // 12.5, 37.5, 62.5, 87.5
                    const y = 60.87 - (p.amount / 276000 * 55); // Scale to fit
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#lineGlow)"
                  style={{
                    strokeDasharray: chartAnimated ? 'none' : '200',
                    strokeDashoffset: chartAnimated ? 0 : 200,
                    transition: 'stroke-dashoffset 1.2s ease-out 0.8s',
                  }}
                />
                
                {/* University trend line (red) - going DOWN */}
                <polyline
                  points={universityPath.slice(1).map((p, i) => {
                    const x = 12.5 + (i * 25) + 5; // Offset slightly
                    const y = 60.87 + (Math.abs(p.amount) / 276000 * 55);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#ff6b6b"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#lineGlow)"
                  style={{
                    strokeDasharray: chartAnimated ? 'none' : '200',
                    strokeDashoffset: chartAnimated ? 0 : 200,
                    transition: 'stroke-dashoffset 1.2s ease-out 0.6s',
                  }}
                />
                
                {/* Data points - Pod (gold circles going up) */}
                {podPath.slice(1).map((p, i) => {
                  const x = 12.5 + (i * 25);
                  const y = 60.87 - (p.amount / 276000 * 55);
                  return (
                    <circle
                      key={`pod-${i}`}
                      cx={x}
                      cy={y}
                      r="1.5"
                      fill="#0a0a0f"
                      stroke="#d4af37"
                      strokeWidth="0.5"
                      style={{
                        opacity: chartAnimated ? 1 : 0,
                        transition: `opacity 0.3s ease ${1.2 + i * 0.1}s`,
                      }}
                    />
                  );
                })}
                
                {/* Data points - University (red circles going down) */}
                {universityPath.slice(1).map((p, i) => {
                  const x = 12.5 + (i * 25) + 5;
                  const y = 60.87 + (Math.abs(p.amount) / 276000 * 55);
                  return (
                    <circle
                      key={`uni-${i}`}
                      cx={x}
                      cy={y}
                      r="1.5"
                      fill="#0a0a0f"
                      stroke="#ff6b6b"
                      strokeWidth="0.5"
                      style={{
                        opacity: chartAnimated ? 1 : 0,
                        transition: `opacity 0.3s ease ${1 + i * 0.1}s`,
                      }}
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 45, 
              right: 0, 
              display: 'flex', 
              justifyContent: 'space-around',
              fontSize: 10,
              color: '#6a6a7a',
              fontWeight: 500,
            }}>
              <span>Year 1</span>
              <span>Year 2</span>
              <span>Year 3</span>
              <span>Year 4</span>
            </div>
          </div>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 16 : 32, marginTop: 20, paddingTop: 16, borderTop: '1px solid #2a2a35', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, background: 'linear-gradient(180deg, #ff6b6b 0%, #ff4757 100%)', borderRadius: 3 }} />
              <span style={{ fontSize: 11, color: '#8a8a9a' }}>University (Debt)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, background: 'linear-gradient(180deg, #f4d03f 0%, #d4af37 100%)', borderRadius: 3 }} />
              <span style={{ fontSize: 11, color: '#8a8a9a' }}>Marketing Pod (Earnings)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 2, background: '#6a6a7a', borderRadius: 1 }} />
              <span style={{ fontSize: 11, color: '#8a8a9a' }}>Trend Line</span>
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