package services

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"strconv"

	"fastycall.com/call/utils"
	"github.com/gorilla/websocket"
	"github.com/sashabaranov/go-openai"
)

func HandleWebsocketMessages(msg Request, conn *websocket.Conn) {
	client := openai.NewClient(utils.GetOpenAISecretKey())

	if msg.InteractionType == "update_only" {
		log.Println("update interaction, do nothing ")
		return
	}
	fmt.Println("founnfnfnf %v", msg.InteractionType)

	if msg.InteractionType == "end_call" {
		emergencyCall, err := AnalyzeEmergencyCall(msg, client)
		if err != nil {
			log.Printf("Error analyzing emergency call: %v", err)
		} else {
			emergencyCall.CallStatus = "active"

			//save in firestore
			doc_ref := utils.FirestoreClient.Collection("calls").Doc(strconv.Itoa(msg.ResponseID))
			_, err = doc_ref.Set(context.Background(), emergencyCall)
			if err != nil {
				log.Printf("Error saving emergency call: %v", err)
			}
		}
	}

	emergencyCall, err := AnalyzeEmergencyCall(msg, client)
	if err != nil {
		log.Printf("Error analyzing emergency call: %v", err)
	} else {
		// Save to database
		doc_ref := utils.FirestoreClient.Collection("calls").Doc(strconv.Itoa(msg.ResponseID))
		_, err = doc_ref.Set(context.Background(), emergencyCall)
		if err != nil {
			log.Printf("Error saving emergency call: %v", err)
		}
	}

	prompt := GenerateAIRequest(msg)
	req := openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: prompt,
		Stream: true,
		MaxTokens: 200,
		Temperature: 1.0,
	}
	stream, err := client.CreateChatCompletionStream(context.Background(), req)
	if err != nil {
		log.Println(err)
		conn.Close()
	}
	defer stream.Close()
	var i int
	for {
		response, err := stream.Recv()
		if err != nil {
			var s string
			if (errors.Is(err, io.EOF) && i == 0) || (!errors.Is(err, io.EOF)){
				s = "[ERROR] NO RESPONSE, PLEASE RETRY"
			}

			if errors.Is(err, io.EOF) && i != 0{
				s = "\n\n###### [END] ######"
			}
			airesponse := Response{
				ResponseID: msg.ResponseID,
				Content: s,
				ContentComplete: false,
				EndCall: false,
			}

			out, err := json.Marshal(airesponse)
			if err != nil {
				log.Println(err)
				conn.Close()
			}

			err = conn.WriteMessage(websocket.TextMessage, out)
			if err != nil {
				log.Println(err)
				conn.Close()
			}
			break
		}
		if len(response.Choices) > 0 {
			s := response.Choices[0].Delta.Content
			airesponse := Response{
				ResponseID: msg.ResponseID,
				Content: s,
				ContentComplete: false,
				EndCall: false,
			}
			log.Println(airesponse)

			out, _ := json.Marshal(airesponse)
			err = conn.WriteMessage(websocket.TextMessage, out)
			if err != nil {
				log.Println(err)
				conn.Close()
			}
		}
		i = i + 1
	}
}

func GenerateAIRequest(msg Request) []openai.ChatCompletionMessage {
	var airequest  []openai.ChatCompletionMessage

	systemprompt := openai.ChatCompletionMessage{
		Role: "system",
		Content: "You are a 911 operator, handling behavioral health crisis calls. Ask different question to learn more about the current situation, when done assure the caller that dispatch will be provider",
	}

	airequest = append(airequest, systemprompt)
	for _, response := range msg.Transcript {
		var p_response openai.ChatCompletionMessage
		if response.Role == "agent"{
			p_response.Role = "assistant"
		} else {
			p_response.Role = "user"
		}
		p_response.Content = response.Content
		airequest = append(airequest, p_response)
	}
	return airequest
}