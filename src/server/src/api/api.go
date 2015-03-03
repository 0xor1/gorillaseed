package api

import(
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/src/api/v1"
)

func Route(r *mux.Router){
	s := r.PathPrefix("/api").Subrouter()
	v1.Route(s)
}
