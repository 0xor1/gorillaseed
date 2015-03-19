package counter

import(
	"strings"
	"testing"
	"net/http"
	"net/http/httptest"
	"github.com/0xor1/gorillaseed/src/server/lib/assert"
	"github.com/0xor1/gorillaseed/src/server/src/util"
	"github.com/0xor1/gorillaseed/src/server/lib/sessions"
)

func Test__returnCounter(t *testing.T){
	var c _counter
	w := httptest.NewRecorder()

	_returnCounter(w, 123)

	util.ReadJson(w, &c)
	assert.Equal(t, strings.Contains(w.Body.String(), "value"), true, "'Value' should be encoded to 'value' in json")
	assert.Equal(t, c.Value, 123, "Value should equal second parameter")
}

func Test_getGlobalCounter(t *testing.T){
	var c _counter
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "", nil)
	globalCounter = 123

	getGlobalCounter(w, req)

	util.ReadJson(w, &c)
	assert.Equal(t, globalCounter, 123, "globalCounter should be unchanged")
	assert.Equal(t, c.Value, globalCounter, "Value should equal globalCounter")
}

func Test_incrementGlobalCounter(t *testing.T){
	var c _counter
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "", nil)
	globalCounter = 123

	incrementGlobalCounter(w, req)

	util.ReadJson(w, &c)
	assert.Equal(t, globalCounter, 124, "globalCounter should have been incremented")
	assert.Equal(t, c.Value, globalCounter, "Value should equal globalCounter")
}

func Test_getMyCounter(t *testing.T){
	var c _counter
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "", nil)
	sessionStore = sessions.NewCookieStore()

	getMyCounter(w, req)

	util.ReadJson(w, &c)
	assert.Equal(t, c.Value, 0, "Value should be initialised to 0")
}

func Test_incrementMyCounter(t *testing.T){
	var c _counter
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "", nil)
	sessionStore = sessions.NewCookieStore()

	incrementMyCounter(w, req)

	util.ReadJson(w, &c)
	assert.Equal(t, c.Value, 1, "Value should be initialised to 0 and then incremented to 1")
}
