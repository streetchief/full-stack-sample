import ViteExpress from "vite-express";
import { app } from "./app.ts";

const envPort = Number(process.env.port);
const port = Number.isSafeInteger(envPort) ? envPort : 3000;

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);
