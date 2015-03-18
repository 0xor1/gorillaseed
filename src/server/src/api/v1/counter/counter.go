package counter

import(
	"log"
	"net/http"
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/lib/sessions"
	"github.com/0xor1/gorillaseed/src/server/src/util"
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
	subrouter.Path("/getGlobalCounter").HandlerFunc(getGlobalCounter)
	subrouter.Path("/incrementGlobalCounter").HandlerFunc(incrementGlobalCounter)
	subrouter.Path("/getMyCounter").HandlerFunc(getMyCounter)
	subrouter.Path("/incrementMyCounter").HandlerFunc(incrementMyCounter)
}

func getGlobalCounter(w http.ResponseWriter, r *http.Request){
	log.Printf("getGlobalCounter: %d", globalCounter)
	_returnCounter(w, globalCounter)
}

func incrementGlobalCounter(w http.ResponseWriter, r *http.Request){
	globalCounter++
	log.Printf("incrementGlobalCounter: %d", globalCounter)
	_returnCounter(w, globalCounter)
}

func getMyCounter(w http.ResponseWriter, r *http.Request){
	session, _ := sessionStore.Get(r, counterSession)
	if session.IsNew {
		session.Values[myCounter] = 0
		session.Save(r, w)
	}
	v := session.Values[myCounter].(int)
	log.Printf("getMyCounter: %d", v)
	_returnCounter(w, v)
}

func incrementMyCounter(w http.ResponseWriter, r *http.Request){
	session, _ := sessionStore.Get(r, counterSession)
	if session.IsNew {
		session.Values[myCounter] = 0
	}
	v := session.Values[myCounter].(int) + 1
	session.Values[myCounter] = v
	session.Save(r, w)
	log.Printf("incrementMyCounter: %d", v)
	_returnCounter(w, v)
}

type _counter struct{
	Value int `json:"value"`
}

func _returnCounter(w http.ResponseWriter, v int){
	util.WriteJson(w, _counter{v})
}
