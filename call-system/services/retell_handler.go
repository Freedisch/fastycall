package services

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"fastycall.com/call/utils"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/sashabaranov/go-openai"
)

type Transcripts struct {
	Role string `json:"role"`
	Content string `json:"content"`
}

type Request struct {
	ResponseID int `json:"response_id"`
	Transcript []Transcripts `json:"transcript"`
	InteractionType string `json:"interaction_type"`
}

type Response struct {
	ResponseID int `json:"response_id"`
	Content string `json:"content"`
	ContentComplete bool `json:"content_complete"`
	EndCall bool `json:"end_call"`
}

type CallSession struct {
    InitialResponseID int
    CurrentResponseID int
    Status string
}

var activeSessions = make(map[*websocket.Conn]*CallSession)

func Retellwhandler(c *gin.Context){
	upgrader := websocket.Upgrader{}

	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Fatal(err)
	}

	response := Response{
		ResponseID: 0,
		Content: "fastyCall, what's your emergency?",
		ContentComplete: true,
		EndCall: false,
	}
	activeSessions[conn] = &CallSession{
        InitialResponseID: response.ResponseID,
        CurrentResponseID: response.ResponseID,
        Status: "active",
    }
    defer delete(activeSessions, conn)

	err = conn.WriteJSON(response)
	if err != nil {
		log.Fatal(err)
	}
	var msg Request

	for {
		messageType, ms, err := conn.ReadMessage()
		if err != nil {
			conn.Close()
			break
		}

		if messageType == websocket.TextMessage {
			
			json.Unmarshal(ms, &msg)

			session := activeSessions[conn]
            session.CurrentResponseID = msg.ResponseID

			HandleWebsocketMessages(msg, conn, session)
			log.Println(msg)
		}
	}
	client := openai.NewClient(utils.GetOpenAISecretKey())
	emergencyCall, err := AnalyzeEmergencyCall(msg, client)
	if err != nil {
		log.Printf("Error analyzing emergency call: %v", err)
	} else {
		emergencyCall.CallStatus = "active"

		//save in firestore
		sessionDocRef := utils.FirestoreClient.Collection("calls").NewDoc()
		_, err = sessionDocRef.Set(context.Background(), emergencyCall)
		if err != nil {
			log.Printf("Error saving emergency call: %v", err)
		}
	}
}