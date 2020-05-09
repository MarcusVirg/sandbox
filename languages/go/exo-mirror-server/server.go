package server

import "fmt"

// Weather holds weather data from the Weather API
type Weather struct {
	WeatherType string
	TempFahr    int
	// tempCelc    string
	// high        string
	// low         string
}

func main() {
	w := &Weather{WeatherType: "Rain", TempFahr: 68}
	fmt.Println(w.WeatherType)
}
