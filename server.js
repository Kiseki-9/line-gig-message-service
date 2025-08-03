const express = require('express');
const router = express.Router();
const cors = require('cors');

// Allow all origins (adjust if needed)
router.use(cors());
const LINE_CHANNEL_ACCESS_TOKEN = "ryLRnFaEFteN3jDq+3jV6TE1qd7GH1dYGSJPIg3svzgw5xRZyyBtrCgyYc1jJOOTl3eH2F3WBKbsOG+PAqtucOk49DaCJDiY5Gq/SMtQ+uq1l3WXPUohpVoNVkSVf/Q6d7HoNzp6f6oXmlxd4NO09AdB04t89/1O/w1cDnyilFU=";
// Handle push
router.post('/push', async (req, res) => {
  const { userId, engagerName } = req.body;
  const message = `Hey there! user ${engagerName} has accepted your deal!`
  console.log(`${userId}, ${message}`)

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(500).json({ error: 'Failed to send message', details: errorData });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

router.post('/broadcast', async(req,res)=>{
  const{message,engagerName} = req.body;
  const msg = `Hey there! user ${engagerName} has accepted your deal!`
  try {
    const response = await fetch('https://api.line.me/v2/bot/message/broadcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messages: [
          {
            type: 'text',
            text: msg || 'Hello all',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(500).json({ error: 'Failed to send message', details: errorData });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
)
