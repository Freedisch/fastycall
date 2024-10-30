package utils

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"

	"google.golang.org/api/option"
)

var FirestoreClient *firestore.Client

func InitializeFirebase() {
	// Use the service account JSON file directly
	opt := option.WithCredentialsFile("/opt/firebase.json")
	
	config := &firebase.Config{}
	
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalf("Error initializing Firebase app: %v", err)
	}

	// Initialize Firestore client
	FirestoreClient, err = app.Firestore(context.Background())
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v", err)
	}

	log.Println("Firebase initialized successfully")
}

func CloseFirestoreConnection() {
	if FirestoreClient != nil {
		if err := FirestoreClient.Close(); err != nil {
			log.Printf("Error closing Firestore connection: %v", err)
		}
	}
}