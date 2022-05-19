package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	Progress int    `json:"progress"`
	Content  string `json:"content"`
	DueDate  int32  `json:"dueDate"` // stores unix ts
}

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

func getTodoHandler() gin.HandlerFunc {
	todoColl := client.Database("todoDB").Collection("todos")

	return func(c *gin.Context) {
		// TODO : get todos from db
		_, _ = todoColl.Find(ctx, bson.M{})
	}
}
func putTodoHandler() gin.HandlerFunc {
	_ = client.Database("todoDB").Collection("todos")

	return func(c *gin.Context) {
		var todo Todo
		err := c.Bind(&todo)
		if err != nil {
			fmt.Println(err)
			return
		}

		todoColl.UpdateOne(ctx, todo)
	}
}
func postTodoHandler() gin.HandlerFunc {
	todoColl := client.Database("todoDB").Collection("todos")

	return func(c *gin.Context) {
		var todo Todo
		err := c.Bind(&todo)
		if err != nil {
			fmt.Println(err)
			return
		}

		todoColl.InsertOne(ctx, todo)
	}
}
func deleteTodoHandler() gin.HandlerFunc {
	_ = client.Database("todoDB").Collection("todos")

	return func(c *gin.Context) {
		// TODO : delete todo from db
	}
}
func optionsTodoHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
	}
}

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
