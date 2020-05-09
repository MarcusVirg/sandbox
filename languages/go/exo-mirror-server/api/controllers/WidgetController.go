package controllers

import (
	"fmt"
	"net/http"
)

// WidgetController handles requests for all widgets, spotify, imdb, etc.
func WidgetController(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "Implement Widget Controller")
}
