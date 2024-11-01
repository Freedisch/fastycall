# Fastycall Responder

## Prerequisites

Before setting up this project, ensure you have the following:

- A [Twilio](https://www.twilio.com/) account and phone number
- An [OpenAI](https://openai.com/) account
- A [Retell AI](https://retellai.com/) account
- [Go](https://golang.org/dl/) installed on your machine
- [ngrok](https://ngrok.com/) (or alternative tunnel service)
- Basic experience with Twilio Voice webhook, Go, and TwiML

## Setup Instructions

### 1. Project Setup

```bash
# Initialize Go module
go mod tidy
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=<your_openai_api_key>
RETELL_API_KEY=<your_retell_ai_api_key>
```

### 3. Create Retell AI Agent

After starting your server and ngrok, create a Retell AI agent using the following curl command:

```bash
curl --request POST \
  --url https://api.retellai.com/create-agent \
  --header 'Authorization: Bearer <RETELL_AI_SECRET_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "llm_websocket_url": "wss://<ngrok_url>/llm-websocket/",
  "voice_id": "11labs-Adrian",
  "enable_backchannel": true,
  "agent_name": "Jarvis"
}'
```

### 4. Configure Twilio

1. Log into your [Twilio Console](https://console.twilio.com)
2. Navigate to Phone Numbers > Manage > Active Numbers
3. Select your Twilio phone number
4. Under Voice Configuration:
   - Set "Configure with" to "Webhook, TwiML Bin, Function, Studio Flow, Proxy Service"
   - Set "A call comes in" to "Webhook"
   - Add your webhook URL: `https://<ngrok_url>/twilio-webhook/<retell_ai_agent_id>`
   - Set HTTP method to POST
5. Save the configuration

### 5. Running the Application

1. Start the Go server:
```bash
go run main.go
```

2. In a new terminal, start ngrok:
```bash
ngrok http 8081
```

## Usage

Once everything is set up, you can call your Twilio phone number to chat with your AI buddy. The AI will respond using natural-sounding speech powered by Retell AI.

## Project Structure

```
call-system/
├── utils
├── services
├── .env
├── go.mod
├── go.sum
└── main.go
```

## Key Features

- Voice-based interaction with AI
- Natural-sounding speech synthesis
- Real-time conversation processing
- Customizable AI personality and responses
- Webhook integration with Twilio
- WebSocket communication for real-time audio streaming


## Troubleshooting

Common issues and solutions:

1. If the call isn't connecting:
   - Verify your ngrok tunnel is running
   - Check your Twilio webhook configuration
   - Ensure your Retell AI agent ID is correct

2. If there's no audio response:
   - Verify your OpenAI API key
   - Check your Retell AI API key
   - Ensure the WebSocket URL is correctly formatted

## License

This project is open-source and available under the MIT License.
