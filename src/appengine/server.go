package appengine

import (
	"log"
	"net/http"
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/src/bootstrap"
)

func init() {
	log.Println("Server Starting...")
	baseRouter := mux.NewRouter()
	domainRouter := baseRouter.Host("gorillaseed-1.appspot.com").Subrouter()
	bootstrap.Route(domainRouter)
	http.Handle("/", baseRouter)
}
