import React, { useState, useEffect, useRef } from 'react';

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

export default Curriculum;