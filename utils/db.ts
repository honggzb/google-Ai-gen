import mongoose from 'mongoose';

export default async function db() {
  if(mongoose.connection.readyState >= 1) return;
  //await mongoose.connect(process.env.DATABASE_URL as string);
  await mongoose.connect('mongodb://localhost:27017/templates');
}
