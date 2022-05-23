package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Todo struct {
	Id       string `json:"_id"`
	Progress int    `json:"progress"`
	Content  string `json:"content"`
	DueDate  int32  `json:"dueDate"` // stores unix ts
}

func getTodoHandler() gin.HandlerFunc {

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		todoColl := client.Database("todoDB").Collection("todos")

		// get todos from db
		todosCusor, err := todoColl.Find(ctx, bson.M{})
		if err != nil {
			fmt.Println(err)
			return
		}

		var todos []bson.M
		if err = todosCusor.All(ctx, &todos); err != nil {
			fmt.Println(err)
		}

		c.JSON(200, todos)
	}
}

func putTodoHandler() gin.HandlerFunc {

	return func(c *gin.Context) {
		todoColl = client.Database("todoDB").Collection("todos")

		var todo Todo
		err := c.Bind(&todo)
		if err != nil {
			fmt.Println(err)
			return
		}
		id, err := primitive.ObjectIDFromHex(todo.Id)
		if err != nil {
			fmt.Println(err)
			return
		}

		todoColl.UpdateOne(ctx, bson.M{"_id": id})
	}
}

func postTodoHandler() gin.HandlerFunc {
	todoColl := client.Database("todoDB").Collection("todos")

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

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
	todoColl := client.Database("todoDB").Collection("todos")

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		// TODO : delete todo from db
		var todo Todo
		err := c.Bind(&todo)
		if err != nil {
			fmt.Println(err)
			return
		}

		id, err := primitive.ObjectIDFromHex(todo.Id)
		if err != nil {
			fmt.Println(err)
			return
		}

		todoColl.DeleteOne(ctx, bson.M{"_id": id})
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
