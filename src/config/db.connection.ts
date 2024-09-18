import mongoose from "mongoose";

export const dbconnection = () =>{
mongoose.connect(process.env.MONGO_DEV_URI!);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to db successful!');
});
} 