package main

import (
	"log"

	"fastycall.com/call/services"
	"fastycall.com/call/utils"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Cannot retrieve call %s", err)
	}
	// Initialize Firebase
	utils.InitializeFirebase()
	defer utils.CloseFirestoreConnection()

	app := gin.Default()
	app.Any("/llm-websocket/:call_id", services.Retellwhandler)
	app.POST("/twilio-webhook/:agent_id", services.Twiliowebhookhandler)
	app.Run("localhost:8081")
}