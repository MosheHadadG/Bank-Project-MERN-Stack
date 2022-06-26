import mongoose from "mongoose";
import { transferSchema } from "./transfer.schema.js";


const Tranfer = mongoose.model('transfers', transferSchema)

export { Tranfer }