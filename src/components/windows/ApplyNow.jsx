import React, { useState, useEffect } from 'react';

const ApplyNow = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    goals: '',
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send to our serverless function
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            tags: ['pod-application'],
          },
          // Pass the full form data so the backend can process custom fields if configured
          customField: {
            age: formData.age,
            experience: formData.experience,
            goals: formData.goals
          }
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStep(2);
      } else {
        throw new Error(data.error || 'Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#1a1a22',
    border: '1px solid #2a2a35',
    borderRadius: 8,
    color: '#e0e0e0',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    color: '#8a8a9a',
    marginBottom: 6,
    fontWeight: 500,
  };

  const fieldContainerStyle = {
    marginBottom: 16,
  };

  // Success State
  if (submitStatus === 'success') {
    return (
      <div style={{ color: '#e0e0e0', fontFamily: 'system-ui', textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
        <h2 style={{ color: '#d4af37', fontSize: 24, marginBottom: 12, fontWeight: 700 }}>
          Application Received!
        </h2>
        <p style={{ color: '#8a8a9a', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
          We've received your application and will review it within 48 hours.
          <br />Check your email for next steps.
        </p>
        
        <div style={{
          padding: 20,
          background: 'rgba(212,175,55,0.1)',
          borderRadius: 12,
          border: '1px solid rgba(212,175,55,0.2)',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 13, color: '#d4af37', fontWeight: 600, marginBottom: 12 }}>
            Next Steps:
          </div>
          <div style={{ fontSize: 13, color: '#8a8a9a', textAlign: 'left', lineHeight: 1.8 }}>
            1. Check your inbox for a confirmation email<br />
            2. Prepare a 2-minute video intro<br />
            3. We'll reach out to schedule your interview
          </div>
        </div>
        
        <button
          onClick={() => {
            setStep(1);
            setSubmitStatus(null);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              age: '',
              experience: '',
              goals: '',
            });
          }}
          style={{
            padding: '12px 24px',
            background: 'transparent',
            border: '1px solid #3a3a45',
            borderRadius: 8,
            color: '#8a8a9a',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div style={{ color: '#e0e0e0', fontFamily: 'system-ui' }}>
      <h2 style={{ color: '#d4af37', fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        Your Application (2 min)
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: 12, marginBottom: 16 }}>
        Not everyone gets in. That's by design. Show us you're serious.
      </p>
      
      {/* Urgency Banner */}
      <div style={{
        padding: 12,
        background: 'rgba(255,200,50,0.1)',
        border: '1px solid rgba(255,200,50,0.2)',
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 12,
        color: '#f0c030',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span>⚡</span>
        <span><strong>Summer 2025 Cohort:</strong> Only 12 spots remaining. Applications close July 15.</span>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div style={{
          padding: 16,
          background: 'rgba(255,50,50,0.1)',
          border: '1px solid rgba(255,50,50,0.3)',
          borderRadius: 8,
          marginBottom: 20,
          color: '#ff6b6b',
          fontSize: 13,
        }}>
          ⚠️ Something went wrong. Please try again or contact us directly.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: 12,
          marginBottom: isMobile ? 0 : 16,
        }}>
          <div style={fieldContainerStyle}>
            <label style={labelStyle}>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Your first name"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#d4af37';
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#2a2a35';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Your last name"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#d4af37';
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#2a2a35';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = '#d4af37';
              e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#2a2a35';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Phone and Age Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: 12,
          marginBottom: isMobile ? 0 : 16,
        }}>
          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#d4af37';
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#2a2a35';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Age</label>
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#d4af37';
                e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#2a2a35';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select age range</option>
              <option value="16-18">16-18</option>
              <option value="19-24">19-24</option>
              <option value="25-30">25-30</option>
              <option value="31+">31+</option>
            </select>
          </div>
        </div>

        {/* Experience */}
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>Marketing Experience</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer' }}
            onFocus={(e) => {
              e.target.style.borderColor = '#d4af37';
              e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#2a2a35';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Select your experience level</option>
            <option value="none">No experience yet</option>
            <option value="beginner">Beginner (learning the basics)</option>
            <option value="intermediate">Intermediate (some campaigns run)</option>
            <option value="advanced">Advanced (running profitable campaigns)</option>
          </select>
        </div>

        {/* Goals */}
        <div style={fieldContainerStyle}>
          <label style={labelStyle}>What's your #1 goal? *</label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            required
            placeholder="In 2-3 sentences: What do you want your life to look like in 12 months? Why the Pod?"
            rows={4}
            style={{ 
              ...inputStyle, 
              resize: 'vertical',
              minHeight: 100,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#d4af37';
              e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#2a2a35';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '18px 24px',
            background: isSubmitting 
              ? '#3a3a45' 
              : 'linear-gradient(135deg, #d4af37 0%, #aa8a2a 100%)',
            border: 'none',
            borderRadius: 8,
            color: isSubmitting ? '#6a6a7a' : '#0a0a0f',
            fontSize: 15,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            marginTop: 8,
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 24px rgba(212,175,55,0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {isSubmitting ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ 
                width: 16, 
                height: 16, 
                border: '2px solid #6a6a7a',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              Submitting...
            </span>
          ) : (
            'Submit Application →'
          )}
        </button>

        <p style={{ fontSize: 11, color: '#4a4a5a', marginTop: 16, textAlign: 'center', lineHeight: 1.5 }}>
          By submitting, you agree to be contacted about your application.
          <br />Applications reviewed within 48 hours.
        </p>
      </form>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder, textarea::placeholder {
          color: #4a4a5a;
        }
        select option {
          background: #1a1a22;
          color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default ApplyNow;
