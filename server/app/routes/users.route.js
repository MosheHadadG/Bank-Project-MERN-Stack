import express from "express";
import {
  createNewAccount,
  createNewUser,
  loginUser,
  logoutUser,
  getMyProfile,
  logoutAnyDevice,
  getMyAccounts,
  getMySpecificAccount,
  depositToMySpecificAccount,
  transferFromMySpecificAccount,
  withdrawFromMySpecificAccount,
  deleteMySpecificAccount,
  getMyWithdrawals
} from "../controllers/users/user.controller.js";
import { authentication } from "../middleware/authentication.js";

const usersRouter = express.Router();

// POST
usersRouter.post('/create-user', createNewUser);

usersRouter.post('/login', loginUser)

//! Need Authentication
usersRouter.post('/create-account', authentication, createNewAccount);

usersRouter.post('/logout', authentication, logoutUser)

usersRouter.post('/logout-any-device', authentication, logoutAnyDevice)

usersRouter.post('/transfer/:id', authentication, transferFromMySpecificAccount)

usersRouter.post('/withdraw/:id', authentication, withdrawFromMySpecificAccount)


// GET
usersRouter.get('/my-profile', authentication, getMyProfile)

usersRouter.get('/my-accounts', authentication, getMyAccounts)

usersRouter.get('/my-accounts/:id', authentication, getMySpecificAccount)

usersRouter.get('/withdraw' , authentication, getMyWithdrawals)

// PATCH
usersRouter.patch('/my-accounts/:id', authentication, depositToMySpecificAccount)


// DELETE
usersRouter.delete('/my-accounts/:id', authentication, deleteMySpecificAccount)




export { usersRouter }