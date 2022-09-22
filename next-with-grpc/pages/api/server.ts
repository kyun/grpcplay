import { loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/codegen/helloworld.proto";

function sayHello(call: any, callback: any) {
  callback(null, { message: "Hello " + call.request.name + Date.now() });
}

export default function handler(req: any, res: any) {
  //
  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const hello_proto = loadPackageDefinition(packageDefinition).helloworld;
  const server = new grpc.Server();
  server.addService((hello_proto as any).Greeter.service, {
    sayHello: sayHello,
  });
}
