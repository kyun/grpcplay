import type { NextApiRequest, NextApiResponse } from "next";
import { credentials, ServiceError } from "@grpc/grpc-js";

import parseArgs from "minimist";
import { loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const PROTO_PATH = __dirname + "/codegen/helloworld.proto";

export default function handler(req: any, res: any) {
  console.log(__dirname);
  console.log();
  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const hello_proto = loadPackageDefinition(packageDefinition).helloworld;
  const argv = parseArgs(process.argv.slice(2), {
    string: "target",
  });
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = "localhost:50051";
  }

  const client = new (hello_proto as any).Greeter(
    "localhost:50051",
    credentials.createInsecure()
  );

  client.sayHiCopied(
    {
      name: "John2",
    },
    function (err: any, response: any) {
      console.log("say Hi:", response.message);
      res.status(200).json({
        message: response.message + "::" + Date.now(),
      });
    }
  );
  // client.sayHello(
  //   { name: "John" },
  //   function (err: ServiceError, response: any) {
  //     console.log("Greeting:", response.message);
  //     res.status(200).json({
  //       message: response.message + "::" + Date.now(),
  //     });
  //   }
  // );
}
