package utils

import (
	"context"
	"log"
	"os"
	"strings"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

type FirebaseConfig struct {
	Type                    string `json:"type"`
	ProjectID              string `json:"project_id"`
	PrivateKeyID          string `json:"private_key_id"`
	PrivateKey            string `json:"private_key"`
	ClientEmail           string `json:"client_email"`
	ClientID              string `json:"client_id"`
	AuthURI               string `json:"auth_uri"`
	TokenURI              string `json:"token_uri"`
	AuthProviderCertURL   string `json:"auth_provider_x509_cert_url"`
	ClientCertURL         string `json:"client_x509_cert_url"`
}

var FirestoreClient *firestore.Client

func InitializeFirebase() {
	// Load credentials from environment variables
	credentials := FirebaseConfig{
		Type:                  "service_account",
		ProjectID:            os.Getenv("FIREBASE_PROJECT_ID"),
		PrivateKeyID:        os.Getenv("FIREBASE_PRIVATE_KEY_ID"),
		PrivateKey:          os.Getenv("FIREBASE_PRIVATE_KEY"),
		ClientEmail:         os.Getenv("FIREBASE_CLIENT_EMAIL"),
		ClientID:            os.Getenv("FIREBASE_CLIENT_ID"),
		AuthURI:             "https://accounts.google.com/o/oauth2/auth",
		TokenURI:            "https://oauth2.googleapis.com/token",
		AuthProviderCertURL: "https://www.googleapis.com/oauth2/v1/certs",
		ClientCertURL:       os.Getenv("FIREBASE_CLIENT_CERT_URL"),
	}

	// Convert private key newlines
	credentials.PrivateKey = strings.ReplaceAll(credentials.PrivateKey, "\\n", "\n")

	// Create a configuration object
	config := &firebase.Config{
		ProjectID: credentials.ProjectID,
	}

	// Create credentials option
	sa := option.WithCredentialsJSON([]byte(`{
		"type": "` + credentials.Type + `",
		"project_id": "` + credentials.ProjectID + `",
		"private_key_id": "` + credentials.PrivateKeyID + `",
		"private_key": "` + credentials.PrivateKey + `",
		"client_email": "` + credentials.ClientEmail + `",
		"client_id": "` + credentials.ClientID + `",
		"auth_uri": "` + credentials.AuthURI + `",
		"token_uri": "` + credentials.TokenURI + `",
		"auth_provider_x509_cert_url": "` + credentials.AuthProviderCertURL + `",
		"client_x509_cert_url": "` + credentials.ClientCertURL + `"
	}`))

	app, err := firebase.NewApp(context.Background(), config, sa)
	if err != nil {
		log.Fatalf("Error initializing Firebase app: %v", err)
	}

	FirestoreClient, err = app.Firestore(context.Background())
	if err != nil {
		log.Fatalf("Error initializing Firestore client: %v", err)
	}

	log.Println("Firebase initialized successfully")
}

func CloseFirestoreConnection() {
	if FirestoreClient != nil {
		FirestoreClient.Close()
	}
}