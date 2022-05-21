package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	// initalize router and handlers
	r := initRouter()

	// connect to local mongodb
	err := initDB()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error connecting to mongodb: %v\n", err)
		os.Exit(1)
	}

	// listen and serve on default port 8080
	r.Run()
}

// initializes the gin router with the necessary middleware
func initRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", pingHandler())

	r.GET("/todo", getTodoHandler())
	r.PUT("/todo", putTodoHandler())
	r.POST("/todo", postTodoHandler())
	r.DELETE("/todo", deleteTodoHandler())
	r.OPTIONS("/todo", optionsTodoHandler())
	return r
}

// pingHandler returns a simple string response
func pingHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	}
}

// TODO : do not store these globally
var client mongo.Client
var ctx context.Context
var cancelFunc context.CancelFunc

// initalizes connection to db (namely the variables client, ctx, and cancelFunc)
// where the db is hardcoded as localhost:27017/todoDB
func initDB() error {
	fmt.Println("Connecting to mongodb")

	mongoClient, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017/todoDB"))
	if err != nil {
		return err
	}
	client = *mongoClient

	ctx, cancelFunc = context.WithTimeout(context.Background(), 2000*time.Second)

	err = client.Connect(ctx)
	if err != nil {
		return err
	}

	return nil
}
