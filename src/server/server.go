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

	r.Host("{sub:.*}.{dom:.*}.{tld:.*}").PathPrefix("/").HandlerFunc(redirect)
	ds := r.Host(domain).Subrouter()
	ds.Methods("GET").PathPrefix("/").Handler(fs)
	apis := ds.Methods("POST").Subrouter()
	api.Route(apis)

	http.Handle("/", r)
	log.Println("Server Listening on Port: " + listenPort)
	http.ListenAndServe(":" + listenPort, nil)
}

func redirect(w http.ResponseWriter, r *http.Request){
	http.Redirect(w, r, "http://" + domain, http.StatusMovedPermanently)
}
