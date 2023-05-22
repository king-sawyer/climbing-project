// src/app.ts
import express, {NextFunction, json, urlencoded, Response as ExResponse, Request as ExRequest} from "express";
import { RegisterRoutes } from "./routes/generated/routes";
import { ValidateError } from "tsoa";

const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: `Internal Server Error ${err.message}`,
    });
  }

  next();
});

export default app