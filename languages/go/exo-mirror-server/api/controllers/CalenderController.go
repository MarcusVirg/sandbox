package controllers

import (
	"fmt"
	"net/http"
)

// CalenderController handles requests for the agenda
func CalenderController(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "Implement Calendar Controller")
}
