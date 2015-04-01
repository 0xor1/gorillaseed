package bootstrap

import (
	"github.com/0xor1/gorillaseed/src/server/lib/mux"
	"github.com/0xor1/gorillaseed/src/server/lib/sessions"
	"github.com/0xor1/gorillaseed/src/server/lib/securecookie"
	"github.com/0xor1/gorillaseed/src/server/src/api"
)

func Route(domainRouter *mux.Router){
	authenticationKey := securecookie.GenerateRandomKey(32)
	encryptionKey := securecookie.GenerateRandomKey(32)

	store := sessions.NewCookieStore(authenticationKey, encryptionKey)
	store.Options.HttpOnly = true
	store.Options.MaxAge = 3600

	apiRouter := domainRouter.Methods("POST").Subrouter()
	api.Route(apiRouter, store)
}
