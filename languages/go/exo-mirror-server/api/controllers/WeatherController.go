package controllers

import (
	"fmt"
	"net/http"
)

// WeatherController handles requests for weather
func WeatherController(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "Implement Weather Controller")
}
