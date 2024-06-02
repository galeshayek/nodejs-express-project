import Joi from "joi";
import { passwordRegex, phoneRegex } from "./patterns";
import { IAddress, IImage, IName, IUser } from "../@types/@types";

const addressSchema = Joi.object<IAddress>({
  city: Joi.string().min(2).max(50).required(),
  country: Joi.string().min(2).max(50).required(),
  houseNumber: Joi.number(),
  street: Joi.string().min(2).max(50).required(),
  zip: Joi.string().min(2).max(10).required(),
  state: Joi.string().min(2).max(50),
}).required();
const imageSchema = Joi.object<IImage>({
  url: Joi.string().uri().max(100).required(),
  alt: Joi.string().min(2).max(50).required(),
});

const userSchema = Joi.object<IUser>({
  isBusiness: Joi.boolean().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
  //address
  address: addressSchema,
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(50).required(),
    middle: Joi.string().min(0),
    last: Joi.string().min(2).max(50).required(),
  }).required(),
  //image //Joi string uri
  image: imageSchema
});

const updateUserSchema = Joi.object({
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(50).required(),
    middle: Joi.string().min(0),
    last: Joi.string().min(2).max(50).required(),
  }).required(),
  image: imageSchema,
  phone: Joi.string().pattern(phoneRegex).required(),
  address: addressSchema,
});
export default userSchema;
export { addressSchema, imageSchema, updateUserSchema }