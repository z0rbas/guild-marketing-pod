// Vercel Serverless Function - GoHighLevel Contact Integration
// Deploy to Vercel and set environment variables:
// GHL_API_KEY and GHL_LOCATION_ID

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, age, experience, goals } = req.body;

    // Validate required fields
    if (!firstName || !email) {
      return res.status(400).json({ error: 'First name and email are required' });
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'dukuSEE0dGxQNQ0MqG80';

    if (!GHL_API_KEY) {
      console.error('GHL_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create contact in GoHighLevel
    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        firstName,
        lastName: lastName || '',
        email,
        phone: phone || '',
        locationId: GHL_LOCATION_ID,
        source: 'Marketing Pod Website',
        tags: ['marketing-pod-application', 'website-lead'],
        customFields: [
          { key: 'age', value: age || '' },
          { key: 'experience', value: experience || '' },
          { key: 'goals', value: goals || '' },
        ],
      }),
    });

    const ghlData = await ghlResponse.json();

    if (!ghlResponse.ok) {
      console.error('GHL API Error:', ghlData);
      return res.status(ghlResponse.status).json({ 
        error: 'Failed to submit application', 
        details: ghlData 
      });
    }

    return res.status(200).json({ 
      success: true, 
      contactId: ghlData.contact?.id,
      message: 'Application submitted successfully!'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

