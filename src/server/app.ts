import express from "express";
import { router as githubRouter } from "./routes/github/github.router.ts";

// types
import { ErrorRequestHandler } from "express";

// build
console.log("*** Building Express App... ***");

export const app = express();

app.use((req, _res, next) => {
  console.log(`${Date.now()} [${req.method}] ${req.originalUrl}`);
  next();
});

app.use("/gh", githubRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(err.code ?? 500).send(`Something went wrong.`);
};

app.use(errorHandler);
