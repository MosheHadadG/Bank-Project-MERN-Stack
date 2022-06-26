import mongoose from "mongoose";

const withdrawSchema = mongoose.Schema({
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  NameAccountOwner: {
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

export { withdrawSchema };