package main

import (
	"log"

	"fastycall.com/call/services"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Cannot retrieve call \n")
	}
	app := gin.Default()
	app.POST("/twilio-webhook/:agent_id", services.Twiliowebhookhandler)
	app.Run("localhost:8081")
}