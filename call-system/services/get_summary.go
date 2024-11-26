package services

import (
	"context"
	"encoding/json"
	"time"

	"github.com/sashabaranov/go-openai"
)

type CallLocation struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type CallMessage struct {
	Role    string `json:"role"`
	Message string `json:"message"`
}

type EmergencyCall struct {
	ID              int           `json:"id"`
	ShortSummary    string        `json:"shortSummary"`
	DetailedSummary string        `json:"detailedSummary"`
	Icon            string        `json:"icon"`
	CallStatus      string        `json:"callStatus"`
	CreatedDate     int64         `json:"createdDate"`
	FearLevel       int           `json:"fearLevel"`
	StressLevel     int           `json:"stressLevel"`
	Location        CallLocation  `json:"location"`
	Transcript      []CallMessage `json:"transcript"`
}

func AnalyzeEmergencyCall(msg Request, client *openai.Client) (*EmergencyCall, error) {
	// Convert transcript to conversation string
	conversation := ""
	transcript := make([]CallMessage, 0)
	
	for _, t := range msg.Transcript {
		conversation += t.Role + ": " + t.Content + "\n"
		transcript = append(transcript, CallMessage{
			Role:    t.Role,
			Message: t.Content,
		})
	}

	// Generate analysis using GPT
	analysisPrompt := `Analyze this emergency call transcript and provide a JSON response with the following:
	1. A short summary (max 10 words)
	2. A detailed summary (2-3 sentences)
	3. Fear level (0-100)
	4. Stress level (0-100)
	5. Location details (extract lat/lng)
	6. Appropriate icon (one of: Car, Medical, Fire, Police)

	regarding Location details (extract lat/lng) set it to -1.9303844748850307, 30.15291759691398 if Location is a University
	and -1.949377894156091, 30.126107587392756 if it's a market and if the place is different set it to -1.9344642081495684, 30.14847027961296

	Conversation transcript:
	` + conversation + `

	Provide the response in this JSON format:
	{
		"shortSummary": "",
		"detailedSummary": "",
		"icon": "",
		"fearLevel": 0,
		"stressLevel": 0,
		"location": {
			"lat": null,
			"lng": null
		}
	}`

	response, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    "system",
					Content: "You are a system analyzing emergency calls to extract key information.",
				},
				{
					Role:    "user",
					Content: analysisPrompt,
				},
			},
			Temperature: 0.3,
		},
	)

	if err != nil {
		return nil, err
	}

	// Parse GPT response
	var analysis struct {
		ShortSummary    string `json:"shortSummary"`
		DetailedSummary string `json:"detailedSummary"`
		Icon            string `json:"icon"`
		FearLevel       int    `json:"fearLevel"`
		StressLevel     int    `json:"stressLevel"`
		Location        struct {
			Lat float64 `json:"lat"`
			Lng float64 `json:"lng"`
		} `json:"location"`
	}

	err = json.Unmarshal([]byte(response.Choices[0].Message.Content), &analysis)
	if err != nil {
		return nil, err
	}

	// Create emergency call summary
	emergencyCall := &EmergencyCall{
		ID:              msg.ResponseID,
		ShortSummary:    analysis.ShortSummary,
		DetailedSummary: analysis.DetailedSummary,
		Icon:            analysis.Icon,
		CallStatus:      "active",
		CreatedDate:     time.Now().Unix(),
		FearLevel:       analysis.FearLevel,
		StressLevel:     analysis.StressLevel,
		Location: CallLocation{
			Lat: analysis.Location.Lat,
			Lng: analysis.Location.Lng,
		},
		Transcript: transcript,
	}

	return emergencyCall, nil
}