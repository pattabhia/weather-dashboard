# Weather WhatsApp Bot - Backend

A Node.js backend service that integrates with WhatsApp Cloud API to provide weather information via WhatsApp messages.

## Features

✅ Natural language processing for city extraction  
✅ Multiple message formats supported  
✅ Real-time weather data from OpenWeatherMap  
✅ Beautiful formatted responses with emojis  
✅ Error handling and user-friendly messages  
✅ Help command for user guidance  

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Run the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3001) | No |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key | Yes |
| `WHATSAPP_API_TOKEN` | WhatsApp Cloud API access token | Yes |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp phone number ID | Yes |
| `WEBHOOK_VERIFY_TOKEN` | Custom token for webhook verification | Yes |

## API Endpoints

### `GET /`
Health check endpoint
```json
{
  "status": "running",
  "service": "Weather WhatsApp Bot",
  "timestamp": "2026-01-02T10:30:00.000Z"
}
```

### `GET /webhook`
Webhook verification endpoint (used by Meta)

### `POST /webhook`
Webhook message handler (receives WhatsApp messages)

### `GET /test/weather/:city`
Test weather API functionality
```bash
curl http://localhost:3001/test/weather/nellore
```

## Supported Message Formats

Users can send messages in various formats:

- `weather in Mumbai`
- `what is the weather in Nellore`
- `Delhi weather`
- `weather for Bangalore`
- `Chennai` (just city name)
- `hi` or `hello` (for help)

## Project Structure

```
backend/
├── server.js                 # Express server & routes
├── webhookHandler.js         # WhatsApp webhook logic
├── services/
│   ├── weatherService.js     # OpenWeatherMap integration
│   ├── messageParser.js      # NLP for city extraction
│   └── whatsappService.js    # WhatsApp message sending
├── .env                      # Environment variables (gitignored)
├── .env.example              # Environment template
├── package.json              # Dependencies
└── README.md                 # This file
```

## Development

### Running with Auto-reload
```bash
npm run dev
```

### Testing Weather Service
```bash
curl http://localhost:3001/test/weather/london
```


