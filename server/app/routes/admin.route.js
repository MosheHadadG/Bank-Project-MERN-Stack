import express from "express";
import { createNewUser, createNewAccount, getSpecificAccount, getSpecificUser } from "../controllers/admin/admin.controller.js";
const adminRouter = express.Router();

// create new User
adminRouter.post('/create-user', createNewUser);

adminRouter.post('/create-account', createNewAccount);


adminRouter.get('/users/:id', getSpecificUser)

adminRouter.get('/accounts/:id', getSpecificAccount)



export { adminRouter };