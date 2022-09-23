import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import parseArgs from "minimist";
import { GreeterClient } from "../../codegen/proto/helloworld_grpc_pb";
import { HelloReply, HelloRequest } from "../../codegen/proto/helloworld_pb";

const client = new GreeterClient(
  "localhost:50051",
  credentials.createInsecure()
);
export default function handler(req: any, res: any) {
  const hq = new HelloRequest();
  hq.setName("world");
  client.sayHi(hq, (err: any, response: HelloReply): any => {
    console.log(response.getMessage());
    console.log("say Hi:", response.getMessage());
    const message = response.getMessage() + "::" + Date.now();
    res.status(200).json({
      message,
    });
    // client.sayHello(hq, function (err: any, response2: any) {
    //   console.log("say Hello:", response2.message);

    //   res.status(200).json({
    //     message,
    //     message2: response2.message + "::" + Date.now(),
    //   });
    // });
  });
}
