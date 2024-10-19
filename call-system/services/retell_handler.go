package services

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
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

	err = conn.WriteJSON(response)
	if err != nil {
		log.Fatal(err)
	}

	for {
		messageType, ms, err := conn.ReadMessage()
		if err != nil {
			conn.Close()
			break
		}

		if messageType == websocket.TextMessage {
			var msg Request
			json.Unmarshal(ms, &msg)

			HandleWebsocketMessages(msg, conn)
		log.Println(msg)
		}
	}
}