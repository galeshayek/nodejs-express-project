import Joi, { ValidationError } from "joi";
import e, { ErrorRequestHandler } from "express";

import { MongoServerError } from "mongodb";
import BizCardsError from "../errors/BizCardsError";
import UserError from "../errors/userErrors";
import { MongooseError } from "mongoose";
import { Logger } from "../logs/logger";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BizCardsError) {
    return res.status(err.status).json(err);
  }
  if (err instanceof UserError) {
    return res.status(err.status).json(err)
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json(err.message);
  }

  if (err instanceof MongoServerError && err.code === 11000) {
    return res.status(400).json({
      message: "duplicate key - must be unique",
      value: err.keyValue,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ type: 'Joi schema validation error', message: err.message });
  }
  if (err instanceof MongooseError) {
    Logger.log(err)
    return res.status(400).json({ type: 'Mongoose error', message: err.message })
  }

  //internal server error
  return res.status(500).json(err);
};

export default errorHandler;
