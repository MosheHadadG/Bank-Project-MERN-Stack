import mongoose from "mongoose";
import { withdrawSchema } from "./withdraw.schema.js";



const Withdraw = mongoose.model('withdrawals', withdrawSchema)

export { Withdraw }