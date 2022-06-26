import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';
import { User } from "./user.model.js";

const userSchema = mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
  
});

userSchema.virtual('accounts', {
  ref: 'accounts',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  
  const token = jsonwebtoken.sign({_id: user._id.toString()}, 'BankAPICode!');

  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({email});
  if(!user) return false;

  const isMatch = await bcryptjs.compare(password, user.password);
  if(!isMatch) return false;

  return user;
}

async function hashPasswordBeforeSaving(next) {
  const user = this;
  
  if(user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next();
}

userSchema.pre('save', hashPasswordBeforeSaving)

export { userSchema }