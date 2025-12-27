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
      answer: "Minimum 20 hours per week. This isn't a side hobby—it's a serious alternative to university. Daily check-ins, weekly skill sessions, and real client work. If you're not ready to commit fully, this isn't for you."
    },
    {
      question: "Do I need marketing experience?",
      answer: "No prior experience required. We teach you everything from the ground up. What we look for is hunger, coachability, and integrity. Skills can be taught—character cannot."
    },
    {
      question: "What age range is this for?",
      answer: "Primarily 17-24, but we accept exceptional candidates of any age. What matters more than age is your mindset, commitment level, and willingness to grow."
    },
    {
      question: "How do I get paid?",
      answer: "You earn through client work. As you develop skills and take on campaigns, you'll work with real businesses and earn real income. Top performers can earn $3,000-$5,000/month within their first year."
    },
    {
      question: "What if I get rejected?",
      answer: "Rejection isn't permanent—it's feedback. We'll tell you exactly why and what you need to work on. Many successful members applied 2-3 times before getting in. Use the feedback, improve, and reapply."
    },
    {
      question: "Can I do this while working or studying?",
      answer: "It depends on your other commitments. The Pod requires 20+ hours/week of focused work. Some members balance part-time jobs, but we don't recommend trying to do this alongside full-time university. You need to choose your path."
    },
    {
      question: "Where are you located?",
      answer: "The Pod operates primarily online, with members across multiple countries. We use daily digital standups, weekly video calls, and collaborative tools. Some regions have in-person meetups and events."
    },
    {
      question: "How long is the program?",
      answer: "There's no fixed 'graduation date.' The Pod is a community and career path, not a course. Most members hit significant milestones (first client, first $1K month, first $5K month) within 6-12 months. Many stay for years as they grow into leadership roles."
    },
    {
      question: "What makes this different from online courses or bootcamps?",
      answer: "Courses give you information. The Pod gives you transformation. You're not watching videos alone—you're embedded in a team, accountable to peers, working with real clients, and building real reputation. It's the difference between reading about swimming and actually getting in the water."
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

