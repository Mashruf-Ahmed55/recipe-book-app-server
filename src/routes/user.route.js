import { Router } from 'express';
import {
  createUser,
  getMyProfile,
  loginUser,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.route('/create-user').post(createUser);
userRouter.route('/my-profile/:id').get(getMyProfile);
// userRouter.route('/login').get(getMyProfile);
userRouter.route('/login').post(loginUser);
userRouter.route('/update-user/:id').get(getMyProfile);

export default userRouter;
