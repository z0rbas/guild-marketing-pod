export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { contact, customField } = req.body;
  const apiKey = process.env.GHL_API_KEY; // Securely accessed from environment variables

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
  }

  try {
    // Forward the request to GoHighLevel
    // Note: Adjust the endpoint below to the specific GHL API endpoint you need (e.g., contacts, opportunities)
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...contact,
        customField: customField || {}
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit to GHL');
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('GHL Submission Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
