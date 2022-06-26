import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  cash: { 
    default: 0,
    type: Number
  },

  credit: {
    default: 0,
    type: Number
  },
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
  }
}, {
  timestamps: true
})

export { accountSchema }