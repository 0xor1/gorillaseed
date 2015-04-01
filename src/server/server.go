package main

import (
	"log"
	"net/http"
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/src/bootstrap"
)

const (
	domain 		= "gorillaseed.net"
	listenPort  = "8080"
)

func main() {
	log.Println("Server Starting...")

	baseRouter := mux.NewRouter()
	fileServer := http.FileServer(http.Dir("../client"))

	baseRouter.Host("{sub:.*}.{dom:.*}.{tld:.*}").PathPrefix("/").HandlerFunc(redirect)
	domainRouter := baseRouter.Host(domain).Subrouter()
	domainRouter.Methods("GET").PathPrefix("/").Handler(fileServer)
	bootstrap.Route(domainRouter)

	http.Handle("/", baseRouter)
	log.Println("Server Listening on Port: " + listenPort)
	http.ListenAndServe(":" + listenPort, nil)
}

func redirect(w http.ResponseWriter, r *http.Request){
	http.Redirect(w, r, "http://" + domain, http.StatusMovedPermanently)
}
