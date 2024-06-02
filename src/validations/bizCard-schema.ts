import Joi from "joi";

const bizCardSchem = Joi.object({
    bizNumber: Joi.number().min(1_000_000).max(9_999_999).required()
})
export default bizCardSchem