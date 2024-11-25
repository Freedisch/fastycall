package services

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HealthCheck (c *gin.Context) {
	log.Println("Health check request received")
	c.String(http.StatusOK, "OK")
	c.JSON(http.StatusOK,[]byte("OK"))
}