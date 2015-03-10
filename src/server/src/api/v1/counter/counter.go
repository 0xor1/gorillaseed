package counter

import(
	"encoding/json"
	"log"
	"net/http"
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/lib/sessions"
)

var (
	globalCounter = 0
	myCounter = "myCounter"
	counterSession = "counterSession"
	sessionStore sessions.Store
)

func Route(router *mux.Router, store sessions.Store){
	sessionStore = store
	subrouter := router.PathPrefix("/counter").Subrouter()
	subrouter.PathPrefix("/getGlobalCounter").HandlerFunc(getGlobalCounter)
	subrouter.PathPrefix("/incrementGlobalCounter").HandlerFunc(incrementGlobalCounter)
	subrouter.PathPrefix("/getMyCounter").HandlerFunc(getMyCounter)
	subrouter.PathPrefix("/incrementMyCounter").HandlerFunc(incrementMyCounter)
}

func getGlobalCounter(w http.ResponseWriter, r *http.Request){
	log.Printf("getGlobalCounter %d", globalCounter)
	m := make(map[string]int)
	m["counter"] = globalCounter
	js, _ := json.Marshal(m)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func incrementGlobalCounter(w http.ResponseWriter, r *http.Request){
	log.Println("incrementGlobalCounter")
	globalCounter++
	getGlobalCounter(w, r)
}

func getMyCounter(w http.ResponseWriter, r *http.Request){
	session, _ := sessionStore.Get(r, counterSession)
	if session.IsNew {
		session.Values[myCounter] = 0
	}
	val := session.Values[myCounter].(int)
	log.Printf("getMyCounter %d", val)
	m := make(map[string]int)
	m["counter"] = val
	js, _ := json.Marshal(m)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func incrementMyCounter(w http.ResponseWriter, r *http.Request){
	log.Println("incrementMyCounter")
	session, _ := sessionStore.Get(r, counterSession)
	if session.IsNew {
		session.Values[myCounter] = 0
	}
	val := session.Values[myCounter].(int)
	session.Values[myCounter] = val + 1
	getMyCounter(w, r)
}
