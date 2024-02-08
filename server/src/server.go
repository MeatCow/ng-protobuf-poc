package main

import (
	"fmt"
	"net/http"

	pb "github.com/MeatCow/protobuf/src/github.com/MeatCow/protobuf"
	"google.golang.org/protobuf/proto"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func getRoot(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	fmt.Printf("got / request\n")

	person := pb.Person{
		Name: "Matt",
		Age:  25,
		Id: 1,
	};

	data, err := proto.Marshal(&person);
	if err != nil {
		fmt.Printf("Issue marshalling person: %v\n", data);
		return;
	}

	w.Write(data);
}

func main() {
	http.HandleFunc("/", getRoot)

	println("Server is running on port 3333")
	http.ListenAndServe(":3333", nil)
}