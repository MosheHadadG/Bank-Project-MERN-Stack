import mongoose from "mongoose";

mongoose.connect("mongodb+srv://mosheHadad:adNbSYU4bK74ZOv9@cluster0.os2qc.mongodb.net/bankAPI?retryWrites=true&w=majority", (err, mongoConnection) => {
  if(err) throw new Error('Mongoose Connection!!, Error: ' + err);
  if(!process.env.NODE_ENV) {
    const { port, host, name } = mongoConnection;
    console.log({port, host, name});
  }
});