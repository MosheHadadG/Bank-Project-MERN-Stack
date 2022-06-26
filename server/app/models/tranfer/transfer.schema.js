import mongoose from "mongoose";

const transferSchema = mongoose.Schema({

  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  nameSender: {
    type: String,
    required: true
  },


  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  NameReceiver: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    default: () => Date.now(),
    required: true
  }
})

export { transferSchema };