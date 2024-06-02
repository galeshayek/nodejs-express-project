import mongoose from "mongoose";
import { IJWTPayload, ILogin, IUser } from "../@types/@types";
import User from "../db/models/user-model";
import BizCardsError from "../errors/BizCardsError";
import { authService } from "./auth-service";
import UserError from "../errors/userErrors";
import { Request } from "express";


const userService = {
  createUser: async (data: IUser) => {
    const user = new User(data);
    //replace the password with it's hash
    const hash = await authService.hashPassword(user.password);
    user.password = hash;
    return await user.save();
  },

  getAllUsers: async () => {
    const users = await User.find({}, { password: 0 });
    return users
  },

  loginUser: async ({ email, password }: ILogin) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BizCardsError(401, "Invalid email or password");
    }
    //check the pass:
    const isValid = await authService.comparePassword(password, user.password);
    if (!isValid) {
      throw new BizCardsError(401, "Invalid email or password");
    }
    // payload {isAdmin ,isBusiness, _id}
    const payload: IJWTPayload = {
      _id: user._id.toString(),
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    };
    return authService.generateJWT(payload);
  },

  getUserById: async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UserError(400, 'Invalid user id')
    }
    const user = await User.findById({ _id: id })
    if (user == null) {
      throw new UserError(404, 'user not found')
    }
    return user
  },

  updateUser: async (id: string, requestBody: IUser) => {
    const user = await User.findOneAndUpdate({ _id: id }, requestBody, { new: true });
    if (!user) throw new UserError(404, 'user not found')
    return user
  },

  deleteUser: async (req: Request) => {
    const user = await User.findByIdAndDelete(req.params.id, { projection: { password: 0 } });
    if (!user) throw new UserError(404, 'user not found')
    return user
  },

  updateBusiness: async (params: string) => {
    const userId = params
    const user = await User.findById(userId);
    if (!user) {
      throw new UserError(404, 'user does not exist')
    }
    const status = user.isBusiness === false ? true : false;
    await User.findByIdAndUpdate(userId, { isBusiness: status });
    const updatedUser = await User.findById(userId, { password: 0 });
    return updatedUser
  },
}

export default userService;
