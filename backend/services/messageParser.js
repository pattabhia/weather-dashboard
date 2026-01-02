/**
 * Extract city name from natural language message
 * @param {string} message - User's WhatsApp message
 * @returns {string|null} Extracted city name or null
 */
function extractCityName(message) {
  if (!message || typeof message !== 'string') {
    return null;
  }

  // Convert to lowercase for easier matching
  const lowerMessage = message.toLowerCase().trim();

  // Pattern 1: "weather in [city]" or "what is the weather in [city]"
  let match = lowerMessage.match(/weather\s+in\s+([a-zA-Z\s]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Pattern 2: "[city] weather"
  match = lowerMessage.match(/^([a-zA-Z\s]+)\s+weather/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Pattern 3: "weather [city]"
  match = lowerMessage.match(/^weather\s+([a-zA-Z\s]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Pattern 4: "weather for [city]"
  match = lowerMessage.match(/weather\s+for\s+([a-zA-Z\s]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Pattern 5: "weather at [city]"
  match = lowerMessage.match(/weather\s+at\s+([a-zA-Z\s]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Pattern 6: Just the city name (if it's a simple word/phrase)
  // Only if message is short and doesn't contain common words
  const commonWords = ['hi', 'hello', 'hey', 'thanks', 'thank you', 'ok', 'okay', 'yes', 'no'];
  if (!commonWords.includes(lowerMessage) && lowerMessage.length < 30 && /^[a-zA-Z\s]+$/.test(lowerMessage)) {
    return lowerMessage.trim();
  }

  return null;
}

/**
 * Check if message is a greeting or help request
 * @param {string} message - User's message
 * @returns {boolean}
 */
function isGreeting(message) {
  const greetings = ['hi', 'hello', 'hey', 'help', 'start', 'hola'];
  const lowerMessage = message.toLowerCase().trim();
  return greetings.some(greeting => lowerMessage.includes(greeting));
}

module.exports = {
  extractCityName,
  isGreeting
};

