const express = require('express');
const router = express.Router();
const cors = require('cors');

// Allow all origins (adjust if needed)
router.use(cors());
const LINE_CHANNEL_ACCESS_TOKEN = 'OlYwXsqo1RvpSBKFPQuiRVpbtsyIRHFWTxiKkUGxipXhRWmste7XI5oX3Fa8ExbKBgf0a/wMlhhCMc9scj6atVwNUJOLC5Ck/arQSUCPcTT+myxthOrYuCIG8+ApLqr0kjakSVXeUAXCrZwtZ7YXTwdB04t89/1O/w1cDnyilFU=';
// Handle push
router.post('/push', async (req, res) => {
  const { userId, message } = req.body;
 

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
            text: message || 'Hello!',
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
  const{message} = req.body;
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
            text: message || 'Hello all',
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
