import React, { useState, useEffect } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const faqs = [
    {
      question: "What are the benefits of joining the Pod vs going to school?",
      answer: [
        { icon: '💰', title: 'Earn While You Learn', desc: 'Get paid from day one instead of accumulating $100K+ in student debt.' },
        { icon: '🎯', title: 'Real Skills, Real Clients', desc: 'Work on actual campaigns with real businesses—not theoretical case studies.' },
        { icon: '⏱️', title: 'Faster Path to Income', desc: 'Start earning in months, not 4+ years. Time is your most valuable asset.' },
        { icon: '🤝', title: 'Built-in Network', desc: 'Join a brotherhood of driven entrepreneurs, not a classroom of strangers.' },
        { icon: '📈', title: 'Ownership Mentality', desc: 'Build assets and income streams you own, not just a resume for someone else.' },
        { icon: '🧠', title: 'Practical Education', desc: 'Learn what actually works in business today—not outdated textbook theory.' },
      ]
    },
    {
      question: "How much does it cost to join?",
      answer: "$0 tuition. You don't pay us—we invest in you. Your commitment is your time and effort. We succeed when you succeed."
    },
    {
      question: "How much time do I need to commit?",
      answer: "20 hours/week minimum. Daily check-ins. Weekly skill sessions. Real client work. This isn't a side hobby—it's a career."
    },
    {
      question: "Do I need marketing experience?",
      answer: "None required. We teach everything from scratch. We look for hunger, coachability, and integrity. Skills can be taught—character cannot."
    },
    {
      question: "What age range is this for?",
      answer: "Primarily 17-24, but we accept exceptional candidates of any age. Mindset matters more than birthdate."
    },
    {
      question: "How do I get paid?",
      answer: "Commission on client work. Book appointments = earn. Close deals = earn more. Top performers hit $3K-$5K/month within their first year."
    },
    {
      question: "What if I get rejected?",
      answer: "Rejection = feedback. We'll tell you exactly why. Many successful members applied 2-3 times. Use the feedback, improve, reapply."
    },
    {
      question: "Can I do this while working or studying?",
      answer: "Part-time job? Usually fine. Full-time university? Pick one or the other. The Pod requires 20+ focused hours/week."
    },
    {
      question: "Where are you located?",
      answer: "100% remote. Members across 12+ countries. Daily digital standups, weekly video calls, and collaborative tools. Some regions have in-person meetups."
    },
    {
      question: "How long is the program?",
      answer: "No fixed end date—this is a career path, not a course. Most hit their first $1K month in 3-6 months. First $5K month in 6-12 months. Many stay for years as they grow into leadership."
    },
    {
      question: "What makes this different from online courses or bootcamps?",
      answer: "Courses = information. The Pod = transformation. You're not watching videos alone—you're on a team, accountable to peers, working with real clients. It's the difference between reading about swimming and getting in the water."
    },
    {
      question: "What if it's not for me?",
      answer: "If it's not the right fit after 30 days, no hard feelings. We'll part ways and you keep everything you learned. We only want people who are all-in."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>❓</div>
        <h2 style={{ color: '#d4af37', fontSize: 20, marginBottom: 6, fontWeight: 700 }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: '#6a6a7a', fontSize: 12 }}>
          Everything you need to know before applying
        </p>
      </div>

      {/* FAQ List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              background: openIndex === index ? 'rgba(212,175,55,0.08)' : '#1a1a22',
              borderRadius: 10,
              border: `1px solid ${openIndex === index ? 'rgba(212,175,55,0.3)' : '#2a2a35'}`,
              overflow: 'hidden',
              transition: 'all 0.2s ease',
            }}
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                textAlign: 'left',
              }}
            >
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: openIndex === index ? '#d4af37' : '#e0e0e0',
                lineHeight: 1.4,
              }}>
                {faq.question}
              </span>
              <span style={{
                fontSize: 18,
                color: openIndex === index ? '#d4af37' : '#6a6a7a',
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                flexShrink: 0,
              }}>
                +
              </span>
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div style={{
                padding: '0 20px 20px',
                animation: 'fadeIn 0.2s ease',
              }}>
                {/* Special formatting for the first question (benefits comparison) */}
                {index === 0 && Array.isArray(faq.answer) ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: 10,
                  }}>
                    {faq.answer.map((benefit, i) => (
                      <div
                        key={i}
                        style={{
                          padding: 14,
                          background: 'rgba(212,175,55,0.05)',
                          borderRadius: 8,
                          border: '1px solid rgba(212,175,55,0.1)',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 6,
                        }}>
                          <span style={{ fontSize: 18 }}>{benefit.icon}</span>
                          <span style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#d4af37',
                          }}>
                            {benefit.title}
                          </span>
                        </div>
                        <p style={{
                          fontSize: 12,
                          color: '#8a8a9a',
                          margin: 0,
                          lineHeight: 1.5,
                        }}>
                          {benefit.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{
                    fontSize: 13,
                    color: '#8a8a9a',
                    margin: 0,
                    lineHeight: 1.7,
                  }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 24,
        padding: 20,
        background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.02) 100%)',
        borderRadius: 12,
        border: '1px solid rgba(212,175,55,0.2)',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 14,
          color: '#d4af37',
          margin: '0 0 8px 0',
          fontWeight: 600,
        }}>
          Still have questions?
        </p>
        <p style={{
          fontSize: 12,
          color: '#6a6a7a',
          margin: 0,
        }}>
          Apply first—we'll answer everything in your interview.
        </p>
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

export default FAQ;

