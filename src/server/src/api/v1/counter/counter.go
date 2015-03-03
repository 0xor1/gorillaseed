package counter

import(
	"encoding/json"
	"log"
	"net/http"
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
)

var (
	globalCounter = 0
)

func Route(r *mux.Router){
	s := r.PathPrefix("/counter").Subrouter()
	s.PathPrefix("/get").HandlerFunc(getHandler)
	s.PathPrefix("/increment").HandlerFunc(incrementHandler)
}

func getHandler(w http.ResponseWriter, r *http.Request){
	log.Printf("get %d", globalCounter)
	m := make(map[string]int)
	m["counter"] = globalCounter
	js, _ := json.Marshal(m)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func incrementHandler(w http.ResponseWriter, r *http.Request){
	log.Println("increment")
	globalCounter++
	getHandler(w, r)
}
