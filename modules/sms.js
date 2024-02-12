const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Twilio credentials
const accountSid = 'AC827106dde4a01211cd44895260d4ae06';
const authToken = '895a6dbe6c6727b683056a61fa1cd995';
const twilioPhoneNumber = '+19895000164';

const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { recipientPhoneNumber, messages } = req.body;

  messages.forEach(async (message) => {
    try {
      await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: recipientPhoneNumber
      });
      console.log(`SMS sent to ${recipientPhoneNumber}: ${message}`);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  });

  res.send('SMS sent successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
