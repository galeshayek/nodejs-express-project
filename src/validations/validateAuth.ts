import { RequestHandler } from "express";
import BizCardsError from "../errors/BizCardsError";
import Card from "../db/models/card-model";

const validateAuth: RequestHandler = async (req, _, next) => {
    try {
        const { _id, isAdmin } = req.payload;
        const id = req.params.id;
        const card = await Card.findById(id);
        if (card.userId !== _id && isAdmin == false) throw new BizCardsError(401, 'unauthorized to modify this card')
        next()
    } catch (e) {
        next(e)
    }
}

export default validateAuth