package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	pb "github.com/MeatCow/protobuf/src/github.com/MeatCow/protobuf"
	"google.golang.org/protobuf/proto"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func getProto(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	fmt.Printf("got %s request\n", r.URL.Path)

	person := pb.Person{
		Name: "Matt",
		Age:  25,
		Id: "1234",
	};

	data, err := proto.Marshal(&person);
	if err != nil {
		fmt.Printf("Issue marshalling person to PROTO: %v\n", data);
		return;
	}

	w.Write(data);
}

func getJson(w http.ResponseWriter, r *http.Request){
	enableCors(&w)
	fmt.Printf("got %s request\n", r.URL.Path)

	person := pb.Person{
		Name: "Matt",
		Age:  25,
		Id: "1234",
	};

	data, err := json.Marshal(person);
	if err != nil {
		fmt.Printf("Issue marshalling person to JSON: %v\n", data);
	}
	
	io.WriteString(w, string(data));
}

func getFallback(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	fmt.Printf("got %s request\n", r.URL.Path)
	
	w.WriteHeader(http.StatusNoContent)
	w.Write(nil);
}

func main() {
	http.HandleFunc("/proto", getProto)
	http.HandleFunc("/json", getJson)
	http.HandleFunc("/", getFallback)

	println("Server is running on port 3333")
	http.ListenAndServe(":3333", nil)
}