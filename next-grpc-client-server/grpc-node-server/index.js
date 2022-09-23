const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../proto/helloworld.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
  const msg = { message: "Hello " + call.request.name };
  console.log("sayHello", msg);

  callback(null, msg);
}

function sayHi(call, callback) {
  const msg = { message: "Hi " + call.request.name };
  console.log("sayHi", msg);
  callback(null, msg);
}

function main() {
  const server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, { sayHello, sayHi });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("Node gRPC server is running....");
      server.start();
    }
  );
}

main();
