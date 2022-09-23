import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import { grpc } from "@improbable-eng/grpc-web";

import { credentials, ServiceError } from "@grpc/grpc-js";

import {
  HelloRequest,
  HelloReply,
} from "../generated/typescript/proto/helloworld_pb";
import { GreeterClient } from "../generated/typescript/proto/HelloworldServiceClientPb";
import React from "react";

const Home: NextPage = () => {
  React.useEffect(() => {
    const client = new GreeterClient("localhost:50051");
    const req = new HelloRequest();
    req.setName("world");
    client.sayHello(req, {}, (err: any, res: HelloReply) => {
      console.log(err, res);
    });
    // client.sayHi(
    //   {
    //     name: "test from client",
    //   } as any,
    //   (err: any, res: any) => {
    //     console.log(res);
    //   }
    // );
  }, []);
  return (
    <div className={styles.container}>
      <h1>Home2</h1>
    </div>
  );
};

export default Home;
