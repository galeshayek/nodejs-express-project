import { Router } from "express";
import userService from "../services/users-service";
import { validateLogin, validateUpdate, validateUser } from "../middleware/joi";
import { validateToken } from "../middleware/validate-token";
import { isAdminOrSelf } from "../middleware/is-admin-or-self";
import { Logger } from "../logs/logger";
import { isAdmin } from "../middleware/is-admin";
import { isSelf } from "../middleware/is-self";
const router = Router();

//create user
router.post("/", validateUser, async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    const { password, ...saved } = result.toJSON();
    //return all data but saved!
    res.status(201).json(saved);
  } catch (e) {
    Logger.log(e)
    next(e);
  }
});

//login user
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const jwt = await userService.loginUser(req.body);
    res.send(jwt);
  } catch (e) {
    next(e);
  }
});

//get all users
router.get('/', ...isAdmin, async (_, res, next) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
})

//get user by id
router.get('/:userId', ...isAdminOrSelf, async (req, res, next) => {
  try {
    const id = req.params.userId
    const user = await userService.getUserById(id)
    const { password, ...rest } = user.toJSON()
    return res.status(200).json(rest)
  } catch (e) {
    next(e)
  }
})

//update user
router.put('/:id', validateUpdate, ...isSelf, async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body)
    res.status(201).json(user)
  } catch (e) {
    next(e)
  }
})

//delete user
router.delete('/:id', ...isAdminOrSelf, async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req);
    res.status(200).json(user)
  } catch (e) {
    next(e)
  }
})

//change biz status
router.patch('/:id', ...isSelf, async (req, res, next) => {
  try {
    const user = await userService.updateBusiness(req.params.id)
    res.status(202).json(user);
  } catch (e) {
    next(e)
  }
})

export default router;
