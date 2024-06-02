import mongoose from "mongoose"
import BizCardsError from "../errors/BizCardsError"
import { RequestHandler } from "express"
import Card from "../db/models/card-model"

const validateId: RequestHandler = async (req, _, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BizCardsError(400, 'Invalid mongoose id')
        };
        const card = await Card.findById(id);
        if (!card) throw new BizCardsError(404, 'card not found');
        next()
    } catch (e) {
        next(e)
    }
}

export default validateId