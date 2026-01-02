require('dotenv').config();

console.log('🔍 Testing WhatsApp Weather Bot Setup\n');

// Check environment variables
const requiredVars = {
  'OPENWEATHER_API_KEY': process.env.OPENWEATHER_API_KEY,
  'WHATSAPP_API_TOKEN': process.env.WHATSAPP_API_TOKEN,
  'WHATSAPP_PHONE_NUMBER_ID': process.env.WHATSAPP_PHONE_NUMBER_ID,
  'WEBHOOK_VERIFY_TOKEN': process.env.WEBHOOK_VERIFY_TOKEN
};

let allConfigured = true;

console.log('📋 Environment Variables Check:\n');
for (const [key, value] of Object.entries(requiredVars)) {
  if (value && value !== `your_${key.toLowerCase()}_here`) {
    console.log(`✅ ${key}: Configured`);
  } else {
    console.log(`❌ ${key}: NOT configured`);
    allConfigured = false;
  }
}

console.log('\n');

if (!allConfigured) {
  console.log('⚠️  Some environment variables are missing!');
  console.log('📝 Please edit backend/.env and add your credentials.\n');
  process.exit(1);
}

// Test weather service
console.log('🌤️  Testing Weather Service...\n');

const { fetchWeather } = require('./services/weatherService');

fetchWeather('Nellore')
  .then(data => {
    console.log('✅ Weather API is working!');
    console.log(`   City: ${data.city}, ${data.country}`);
    console.log(`   Temperature: ${data.temperature}°C`);
    console.log(`   Conditions: ${data.description}\n`);
    
    console.log('🎉 All tests passed!');
    console.log('✅ Your backend is ready to use!\n');
    console.log('Next steps:');
    console.log('1. Run: npm start');
    console.log('2. Set up ngrok: ngrok http 3001');
    console.log('3. Configure webhook in Meta WhatsApp settings\n');
  })
  .catch(error => {
    console.log('❌ Weather API test failed!');
    console.log(`   Error: ${error.message}\n`);
    console.log('Please check:');
    console.log('- OPENWEATHER_API_KEY is correct');
    console.log('- You have internet connection');
    console.log('- OpenWeatherMap API is accessible\n');
    process.exit(1);
  });

