package utils

import "os"

func GetRetellAISecretKey() string {
	return os.Getenv("RETELL_API_KEY")
}

func GetOpenAISecretKey() string {
	return os.Getenv("OPENAI_API_KEY")
}

func GetFirebaseSDKConfig() string {
	return os.Getenv("FIREBASE_SDK_ADMIN")
}
