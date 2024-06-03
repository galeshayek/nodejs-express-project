import { RequestHandler } from "express";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";
import Card from "../db/models/card-model";

const _isAdminOrSelf: RequestHandler = async (req, _, next) => {
    const requestedId = req.params.id;
    const userId = req.payload._id;
    const card = await Card.findById(requestedId);
    const cardOwner = card.userId;
    if (cardOwner === userId || req.payload?.isAdmin) {
        return next();
    }

    next(new BizCardsError(403, "Must be the requested user or admin"));
};

export const isCardOwnerOrAdmin = [validateToken, _isAdminOrSelf];