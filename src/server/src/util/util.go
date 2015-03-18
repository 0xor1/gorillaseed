package util

import(
	"net/http"
	"encoding/json"
	"net/http/httptest"
)

func WriteJson(w http.ResponseWriter, obj interface{}) error{
	js, err := json.Marshal(obj)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
	return err
}

func ReadJson(w *httptest.ResponseRecorder, obj interface{}) error{
	return json.Unmarshal(w.Body.Bytes(), obj)
}
