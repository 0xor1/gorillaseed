package v1

import(
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/src/api/v1/counter"
)

func Route(r *mux.Router){
	s := r.PathPrefix("/v1").Subrouter()
	counter.Route(s)
}
