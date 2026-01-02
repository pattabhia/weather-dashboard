require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { verifyWebhook, handleWebhook } = require('./webhookHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    service: 'Weather WhatsApp Bot',
    timestamp: new Date().toISOString()
  });
});

// Webhook verification endpoint (GET)
app.get('/webhook', verifyWebhook);

// Webhook message handler endpoint (POST)
app.post('/webhook', handleWebhook);

// Test endpoint to check if weather service is working
app.get('/test/weather/:city', async (req, res) => {
  try {
    const { fetchWeather } = require('./services/weatherService');
    const weatherData = await fetchWeather(req.params.city);
    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Debug endpoint to check environment variables (without exposing values)
app.get('/test/env', (req, res) => {
  const envCheck = {
    OPENWEATHER_API_KEY: !!process.env.OPENWEATHER_API_KEY,
    WHATSAPP_API_TOKEN: !!process.env.WHATSAPP_API_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID: !!process.env.WHATSAPP_PHONE_NUMBER_ID,
    WEBHOOK_VERIFY_TOKEN: !!process.env.WEBHOOK_VERIFY_TOKEN,
    NODE_ENV: process.env.NODE_ENV
  };

  const allConfigured = Object.entries(envCheck)
    .filter(([key]) => key !== 'NODE_ENV')
    .every(([, value]) => value === true);

  res.json({
    configured: envCheck,
    allSet: allConfigured,
    message: allConfigured
      ? 'All environment variables are configured ✅'
      : 'Some environment variables are missing ❌'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server (only in local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('🚀 Weather WhatsApp Bot Server Started');
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🌐 Webhook URL: http://localhost:${PORT}/webhook`);
    console.log('⏳ Waiting for WhatsApp messages...\n');

    // Check if environment variables are set
    const requiredEnvVars = [
      'OPENWEATHER_API_KEY',
      'WHATSAPP_API_TOKEN',
      'WHATSAPP_PHONE_NUMBER_ID',
      'WEBHOOK_VERIFY_TOKEN'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      console.warn('⚠️  WARNING: Missing environment variables:');
      missingVars.forEach(varName => console.warn(`   - ${varName}`));
      console.warn('   Please check your .env file\n');
    } else {
      console.log('✅ All environment variables configured\n');
    }
  });
}

// Export for Vercel serverless
module.exports = app;

