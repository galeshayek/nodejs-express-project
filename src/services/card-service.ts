import mongoose from "mongoose";
import { ICard, ICardInput } from "../@types/@types";
import Card from "../db/models/card-model";
import BizCardsError from "../errors/BizCardsError";
import { Request } from "express";
import _ from "underscore";
import { Logger } from "../logs/logger";

const generateCardNum = async (card: ICard) => {
    while (true) {
        const r = _.random(1_000_000, 9_999_999);
        const dbRes = await Card.findOne({ bizNumber: r });
        if (!dbRes) {
            card.bizNumber = r
            break
        }
    };
}

const cardService = {

    createCard: async (data: ICardInput, userId: string) => {
        const card = new Card(data);
        card.userId = userId;
        await generateCardNum(card);
        return card.save();
    },

    checkIfUnique: async (data: ICardInput) => {
        const cards = await Card.find();
        const newCard = data;
        cards.forEach((c) => {
            if (c.title == newCard.title || c.email == newCard.email) {
                throw new BizCardsError(409, 'card with the same title or email exists')
            }
        })
    },

    getAllCards: async () => {
        const cards = await Card.find();
        return cards
    },

    getCardById: async (data: string) => {
        if (!mongoose.Types.ObjectId.isValid(data)) {
            throw new BizCardsError(400, 'Invalid mongoose id')
        };
        const card = await Card.findById(data);
        if (!card) throw new BizCardsError(404, 'card not found')
        return card
    },

    getAllMyCards: async (id: string) => {
        const cards = await Card.find({ userId: id });
        return cards
    },

    updateCard: async (data: ICardInput, id: string) => {
        const update = await Card.updateOne({ _id: id }, data);
        if (update.matchedCount === 0) throw new BizCardsError(404, 'card not found')
        return update
    },

    patchLike: async (cardId: string, userId: string) => {
        const card = await Card.findById(cardId);
        if (!card) throw new BizCardsError(404, "card doesn't exists");

        const likes = card.likes;
        const index = likes.indexOf(userId);
        if (index !== -1) {
            likes.splice(index, 1);
        } else {
            likes.push(userId);
        }
        await Card.findByIdAndUpdate(cardId, card)
        return card;
    },

    updateBizNum: async (req: Request, id: string) => {
        return await Card.findByIdAndUpdate(id, req.body, { new: true });
    },

    deleteCard: async (req: Request) => {
        return await Card.findByIdAndDelete(req.params.id)
    }
}

export default cardService