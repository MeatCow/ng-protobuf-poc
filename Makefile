all: go ts

go:
	protoc --proto_path protos --go_out=./server/src/ ./protos/definitions.proto
	cd server && go build -o ./dist/server ./src/server.go

ts:
	npm run client-protos