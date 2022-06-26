import mongoose from "mongoose";

mongoose.connect(process.env.MongoURI, (err, mongoConnection) => {
  if(err) throw new Error('Mongoose Connection!!, Error: ' + err);
  if(!process.env.NODE_ENV) {
    const { port, host, name } = mongoConnection;
    console.log({port, host, name});
  }
});
