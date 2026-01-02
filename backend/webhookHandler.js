const { fetchWeather } = require('./services/weatherService');
const { extractCityName, isGreeting } = require('./services/messageParser');
const { sendWeatherMessage, sendHelpMessage, sendErrorMessage } = require('./services/whatsappService');

/**
 * Verify webhook for WhatsApp
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function verifyWebhook(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      console.log('❌ Webhook verification failed');
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
}

/**
 * Handle incoming WhatsApp messages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleWebhook(req, res) {
  try {
    const body = req.body;

    // Log all incoming webhook requests for debugging
    console.log('📥 Webhook received:', JSON.stringify(body, null, 2));

    // Check if this is a WhatsApp message event
    if (body.object === 'whatsapp_business_account') {
      // Extract message details
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;

      if (messages && messages.length > 0) {
        const message = messages[0];
        const from = message.from; // Sender's phone number
        const messageBody = message.text?.body;
        const messageId = message.id;

        console.log(`📩 Received message from ${from}: "${messageBody}"`);

        // Process the message
        await processMessage(from, messageBody, messageId);
      } else {
        console.log('⚠️ No messages found in webhook payload');
      }

      // Always respond with 200 OK to acknowledge receipt
      res.sendStatus(200);
    } else {
      console.log('⚠️ Webhook object is not whatsapp_business_account:', body.object);
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('❌ Error handling webhook:', error);
    res.sendStatus(500);
  }
}

/**
 * Process incoming message and send appropriate response
 * @param {string} from - Sender's phone number
 * @param {string} messageBody - Message text
 * @param {string} messageId - Message ID
 */
async function processMessage(from, messageBody, messageId) {
  try {
    // Check if it's a greeting or help request
    if (isGreeting(messageBody)) {
      await sendHelpMessage(from);
      console.log(`✅ Sent help message to ${from}`);
      return;
    }

    // Extract city name from message
    const cityName = extractCityName(messageBody);

    if (!cityName) {
      await sendErrorMessage(
        from,
        "I couldn't understand which city you're asking about. Please try:\n• 'weather in Mumbai'\n• 'Delhi weather'\n• Or just send the city name"
      );
      console.log(`⚠️ Could not extract city from message: "${messageBody}"`);
      return;
    }

    console.log(`🔍 Fetching weather for: ${cityName}`);

    // Fetch weather data
    const weatherData = await fetchWeather(cityName);

    // Send weather information
    await sendWeatherMessage(from, weatherData);
    console.log(`✅ Sent weather data for ${cityName} to ${from}`);

  } catch (error) {
    console.error('Error processing message:', error);

    // Send error message to user
    await sendErrorMessage(from, error.message || 'Sorry, something went wrong. Please try again.');
  }
}

module.exports = {
  verifyWebhook,
  handleWebhook
};

