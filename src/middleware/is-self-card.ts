import { RequestHandler } from "express";
import Card from "../db/models/card-model";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "./validate-token";

const _isSelfCard: RequestHandler = async (req, _, next) => {
    const userId = req.payload._id;
    const card = await Card.findById(req.params.id);
    if (!card) return next(new BizCardsError(404, 'card not found'))
    const cardUserId = card.userId;
    if (userId !== cardUserId) return next(new BizCardsError(403, 'only the user who created the card can alter it'));
    next()
}
export const isSelfCard = [validateToken, _isSelfCard];