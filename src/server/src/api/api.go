package api

import(
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/lib/sessions"
	"github.com/0xor1/gorillaseed/src/server/src/api/v1"
)

func Route(router *mux.Router, store sessions.Store){
	subrouter := router.PathPrefix("/api").Subrouter()
	v1.Route(subrouter, store)
}
