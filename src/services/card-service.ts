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
        const update = await Card.findByIdAndUpdate(id, data, { new: true });
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
        await Card.findByIdAndUpdate(cardId, card, { new: true })
        return card;
    },

    updateBizNum: async (body: { bizNumber: number }, id: string) => {
        const exists = await Card.findOne(body);
        if (exists) throw new BizCardsError(409, 'bizNumber already exists')
        return await Card.findByIdAndUpdate(id, body, { new: true });
    },

    deleteCard: async (req: Request) => {
        return await Card.findByIdAndDelete(req.params.id)
    }
}

export default cardService