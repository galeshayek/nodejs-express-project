import express, { json } from "express";
import usersRouter from "./routes/users";
import notFound from "./middleware/not-found";
import connect from "./db/connection";
import configDevEnv from "../config";
import errorHandler from "./middleware/error-handler";
import morgan from "morgan";
import { cardRouter } from "./routes/cards";
import { Logger } from "./logs/logger";

configDevEnv();
connect();

const app = express();

app.use(json());
app.use(morgan("dev"));

app.use("/api/v1/users", usersRouter);
app.use('/api/v1/cards', cardRouter);
app.use(express.static('public'));
app.use(errorHandler);
app.use(notFound);

app.listen(8080, () => {
  Logger.log("Server is running on http://localhost:8080");
  Logger.log(`App is running in ${process.env.NODE_ENV} mode`);
});
