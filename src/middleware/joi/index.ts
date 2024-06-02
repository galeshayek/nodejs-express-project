import bizCardSchem from "../../validations/bizCard-schema";
import cardSchema from "../../validations/card-schema";
import loginSchema from "../../validations/login-schema";
import userSchema, { updateUserSchema } from "../../validations/user-schema";
import { validateSchema } from "./validate-schema";

const validateUser = validateSchema(userSchema);
const validateLogin = validateSchema(loginSchema);
const vaildateCard = validateSchema(cardSchema);
const validateUpdate = validateSchema(updateUserSchema);
const validateBizNum = validateSchema(bizCardSchem);

export { validateUser, validateLogin, vaildateCard, validateUpdate, validateBizNum };
