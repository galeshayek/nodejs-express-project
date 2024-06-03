import { RequestHandler } from "express";
import { ObjectSchema } from "joi";
import BizCardsError from "../../errors/BizCardsError";

type ValidateSchema = (schema: ObjectSchema) => RequestHandler;

export const validateSchema: ValidateSchema =
  (schema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (e) {
      next(e);
    }
  };

