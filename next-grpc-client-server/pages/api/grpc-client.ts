import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import parseArgs from "minimist";

const PROTO_PATH = __dirname + "/../../proto/helloworld.proto";

export default function handler(req: any, res: any) {
  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const hello_proto = loadPackageDefinition(packageDefinition).helloworld;
  const client = new (hello_proto as any).Greeter(
    "localhost:50051",
    credentials.createInsecure()
  );
  client.sayHi(
    {
      name: "John2",
    },
    function (err: any, response: any) {
      console.log("say Hi:", response.message);
      const message = response.message + "::" + Date.now();
      client.sayHello(
        {
          name: "John3",
        },
        function (err: any, response2: any) {
          console.log("say Hello:", response2.message);

          res.status(200).json({
            message,
            message2: response2.message + "::" + Date.now(),
          });
        }
      );
    }
  );
}
