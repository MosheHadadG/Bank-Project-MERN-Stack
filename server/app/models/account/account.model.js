import mongoose from "mongoose";
import { accountSchema } from "./account.schema.js";

const Account = mongoose.model('accounts', accountSchema) 

export { Account }