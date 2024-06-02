import { Router } from "express";
import { validateToken } from "../middleware/validate-token";
import { vaildateCard, validateBizNum } from "../middleware/joi";
import cardService from "../services/card-service";
import validateId from "../validations/validateId";
import validateAuth from "../validations/validateAuth";
import { isBusiness } from "../middleware/is-business";
import { isSelfCard } from "../middleware/is-self-card";
import { isAdminOrSelf } from "../middleware/is-admin-or-self";
import { isAdmin } from "../middleware/is-admin";

const router = Router()

//create new card
router.post('/', ...isBusiness, vaildateCard, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const isBiz = req.payload.isBusiness
        await cardService.checkIfUnique(req.body)
        if (req.payload.isBusiness) {
            const result = await cardService.createCard(req.body, userId);
            res.status(201).json(result);
        } else {
            res.status(400).json({ message: 'only business users can create cards' })
        }
    } catch (e) {
        next(e)
    }
});

//get all cards
router.get('/', async (_, res, next) => {
    try {
        const cards = await cardService.getAllCards();
        res.status(200).json(cards)
    } catch (e) {
        next(e)
    }
})

//get all my cards
router.get('/my-cards', validateToken, async (req, res, next) => {
    try {
        const cards = await cardService.getAllMyCards(req.payload._id);
        res.status(200).json(cards)
    } catch (e) {
        next(e);
    }
})

//get card by id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const card = await cardService.getCardById(id);
        res.status(200).json(card);
    } catch (e) {
        next(e)
    }
})

//update card
router.put('/:id', ...isSelfCard, vaildateCard, validateId, async (req, res, next) => {
    try {
        const id = req.params.id
        const newCard = req.body;
        const updated = await cardService.updateCard(newCard, id);
        res.status(202).json(updated);
    } catch (e) {
        next(e);
    }
})

//like/unlike card
router.patch('/:id', validateToken, async (req, res, next) => {
    try {
        const patch = await cardService.patchLike(req.params.id, req.payload._id);
        res.status(200).json(patch)
    } catch (e) {
        next(e);
    }
});

//patch card biz number
router.patch('/biz/:id', ...isAdmin, validateBizNum, async (req, res, next) => {
    try {
        const id = req.params.id;
        const card = await cardService.updateBizNum(req, id);
        res.status(200).json(card)
    } catch (e) {
        next(e);
    }
})

//delete card
router.delete('/:id', ...isAdminOrSelf, async (req, res, next) => {
    try {
        const result = await cardService.deleteCard(req);
        res.status(200).json(result)
    } catch (e) {
        next(e);
    }
})


export { router as cardRouter }