package main

import (
	"fmt"
	"net/http"
	"exo-mirror-server/cmd"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "My Website")
	})

	http.ListenAndServe(":3000", nil)
}
