import mongoose from 'mongoose';

// type def for user
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  //username: { type: String, required: true },
  //e
  });

export const User = mongoose.model('User', UserSchema);
  

