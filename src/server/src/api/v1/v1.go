package v1

import(
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/lib/sessions"
	"github.com/0xor1/gorillaseed/src/server/src/api/v1/counter"
)

func Route(router *mux.Router, store sessions.Store){
	subrouter := router.PathPrefix("/v1").Subrouter()
	counter.Route(subrouter, store)
}
