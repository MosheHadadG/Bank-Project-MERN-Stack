import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const User = mongoose.model('users', userSchema)

export { User };