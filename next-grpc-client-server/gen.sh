# mkdir -p generated/typescript

# protoc -I. \
#     --js_out=import_style=commonjs,binary:generated/typescript \
#     --grpc-web_out=import_style=typescript,mode=grpcwebtext:generated/typescript proto/*.proto


# generate for node.js
yarn run grpc_tools_node_protoc \
    --plugin=./node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:codegen \
    --grpc_out=grpc_js:codegen \
    --ts_out=grpc_js:codegen \
    -I.\
    proto/helloworld.proto