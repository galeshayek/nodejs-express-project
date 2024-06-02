import { model } from "mongoose";
import cardSchema from "../schemas/card-schema";

const Card = model('Card', cardSchema)
export default Card