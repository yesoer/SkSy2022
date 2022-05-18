package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := initRouter()

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
	return func(c *gin.Context) {
		// TODO : get todo from db
	}
}
func putTodoHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO : update todo in db
	}
}
func postTodoHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO : create todo in db
	}
}
func deleteTodoHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO : delete todo from db
	}
}
