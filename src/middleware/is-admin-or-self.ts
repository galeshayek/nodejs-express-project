import { RequestHandler } from "express";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";

const _isAdminOrSelf: RequestHandler = (req, _, next) => {
  const requestedId = req.params.id;
  const { _id, isAdmin } = req.payload;

  if (requestedId === _id || isAdmin) {
    return next();
  }

  next(new BizCardsError(403, "Must be the requested user or admin"));
};

export const isAdminOrSelf = [validateToken, _isAdminOrSelf];