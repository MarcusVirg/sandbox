package controllers

import (
	"fmt"
	"net/http"
)

// TasksController handles requests for tasks
func TasksController(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "Implement Tasks Controller")
}
