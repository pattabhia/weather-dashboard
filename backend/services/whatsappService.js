const axios = require('axios');

const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_API_TOKEN;

/**
 * Get weather emoji based on weather condition
 * @param {string} main - Main weather condition
 * @returns {string} Weather emoji
 */
function getWeatherEmoji(main) {
  const emojiMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️'
  };
  return emojiMap[main] || '🌤️';
}

/**
 * Format weather data into a readable message
 * @param {Object} weatherData - Weather data object
 * @returns {string} Formatted message
 */
function formatWeatherMessage(weatherData) {
  const emoji = getWeatherEmoji(weatherData.main);
  
  return `${emoji} *Weather in ${weatherData.city}, ${weatherData.country}*\n\n` +
         `🌡️ Temperature: *${weatherData.temperature}°C*\n` +
         `🤔 Feels like: ${weatherData.feelsLike}°C\n` +
         `📝 Conditions: ${weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}\n` +
         `💧 Humidity: ${weatherData.humidity}%\n` +
         `💨 Wind: ${weatherData.windSpeed} km/h`;
}

/**
 * Send a WhatsApp message
 * @param {string} to - Recipient phone number
 * @param {string} message - Message text
 * @returns {Promise<Object>} API response
 */
async function sendMessage(to, message) {
  try {
    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
      throw new Error('WhatsApp API credentials are not configured');
    }

    const url = `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`;
    
    const response = await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: {
          body: message
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Send weather information via WhatsApp
 * @param {string} to - Recipient phone number
 * @param {Object} weatherData - Weather data object
 * @returns {Promise<Object>} API response
 */
async function sendWeatherMessage(to, weatherData) {
  const message = formatWeatherMessage(weatherData);
  return sendMessage(to, message);
}

/**
 * Send help message
 * @param {string} to - Recipient phone number
 * @returns {Promise<Object>} API response
 */
async function sendHelpMessage(to) {
  const helpMessage = 
    `👋 *Welcome to Weather Bot!*\n\n` +
    `I can help you get weather information for any city.\n\n` +
    `*How to use:*\n` +
    `• "weather in Mumbai"\n` +
    `• "what is the weather in Nellore"\n` +
    `• "Delhi weather"\n` +
    `• Or just send the city name\n\n` +
    `Try it now! 🌤️`;
  
  return sendMessage(to, helpMessage);
}

/**
 * Send error message
 * @param {string} to - Recipient phone number
 * @param {string} errorMessage - Error message
 * @returns {Promise<Object>} API response
 */
async function sendErrorMessage(to, errorMessage) {
  const message = `❌ ${errorMessage}`;
  return sendMessage(to, message);
}

module.exports = {
  sendMessage,
  sendWeatherMessage,
  sendHelpMessage,
  sendErrorMessage,
  formatWeatherMessage
};

