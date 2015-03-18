package counter

import(
	"strings"
	"testing"
	"net/http"
	"net/http/httptest"
	"github.com/0xor1/gorillaseed/src/server/lib/assert"
	"github.com/0xor1/gorillaseed/src/server/src/util"
)

func Test__returnCounter(t *testing.T){
	w := httptest.NewRecorder()
	_returnCounter(w, 1)
	assert.Equal(t, strings.Contains(w.Body.String(), "value"), true, "'Value' should be encoded to 'value' in json")
}

func Test_getGlobalCounter(t *testing.T){
	var c _counter
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "", nil)
	globalCounter = 123

	getGlobalCounter(w, req)

	util.ReadJson(w, &c)
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

//TODO write myCounter tests
