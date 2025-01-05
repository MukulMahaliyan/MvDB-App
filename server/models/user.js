import mongoose from 'mongoose';

// type def for user
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchlist: {type: [Object]}
  //username: { type: String, required: true },
  //likedMovies:{type:List,required: false}
  //dislikedMovies:{type:List,required: false}
  //Watch
  });

export const User = mongoose.model('User', UserSchema);
  

