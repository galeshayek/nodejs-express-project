import { Logger } from "../logs/logger";
import { authService } from "../services/auth-service";
import { users, cards } from "./initial-data"
import Card from "./models/card-model";
import User from "./models/user-model";

const initDB = async () => {
    try {
        const usersCount = await User.countDocuments();
        if (usersCount === 0) {
            for (let u of users) {
                u.password = await authService.hashPassword(u.password);
                const user = new User(u);
                const saved = await user.save();
                const res = await User.find({}, { password: 0 })
                Logger.verbose(res);
            };
        }
        const cardsCount = await Card.countDocuments();
        if (cardsCount === 0) {
            for (let c of cards) {
                const card = new Card(c);
                const saved = await card.save();
                Logger.verbose(saved);
            }
        }
    } catch (e) {
        Logger.error(e);
    }
};

export default initDB;
