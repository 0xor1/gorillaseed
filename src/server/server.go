package main

import (
	"log"
	"net/http"
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/src/api"
)

const (
	domain     = "gorillaseed.net"
	listenPort = "8080"
)

func main() {
	log.Println("Server Starting...")

	r := mux.NewRouter()
	fs := http.FileServer(http.Dir("../client"))

	r.Host(domain).Methods("GET").PathPrefix("/").Handler(fs)
	r.Host("www." + domain).Methods("GET").PathPrefix("/").Handler(fs)

	s1 := r.Host(domain).Methods("POST").Subrouter()
	s2 := r.Host("www." + domain).Methods("POST").Subrouter()

	api.Route(s1)
	api.Route(s2)

	http.Handle("/", r)
	log.Println("Server Listening on Port: " + listenPort)
	http.ListenAndServe(":" + listenPort, nil)
}
