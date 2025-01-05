
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User }  from '../models/user.js';


import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI);


//  /api/ endpoints
export const apiRouter = express.Router();

apiRouter.get('/test', (req,res)=> {
    console.log("in test controller");
    res.status(200).json({message:'This is the sample test data'});
});

// Register Route
apiRouter.post('/register', async (req, res) => {
    console.log("inside register controller");
    const { email, password } = req.body;
    console.log({email,password});
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    
    console.log(`existingUser=${existingUser}`);
    if (existingUser) return res.status(400).json({ message: "User already exists!" });
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ email, password: hashedPassword });
    
    try { 
      await newUser.save();
      res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Login Route
  apiRouter.post('/login', async (req, res) => {
    console.log("inside login controller");

    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });
  
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials!" });
  
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  });
  
  // Middleware to verify JWT token
  const verifyToken = (req, res, next) => {
    console.log("inside verify token");
    const token = req.header('Authorization');
    console.log("token");
    if (!token) return res.status(401).json({ message: "Access denied!" });
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded token "+JSON.stringify(decoded));
      req.user = {id : decoded.userId};
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token!" });
    }
  };
  
  // Protected Route Gives the user data
  apiRouter.get('/profile', verifyToken, (req, res) => {
    console.log("inside api/profile");
    res.json({ message: "This is a protected route", user: req.user });
  });



// user watchlist persistence endpoint
  apiRouter.post('/user/watchlist',verifyToken, async (req,res)=>{
    console.log("inside /user/watchlist controller")
  
    const { watchlist } = req.body; // Extract watchlist from the request
    const userId = req.user.id; 
    console.log(watchlist);
    console.log(userId);

    try {
      // Update user's watchlist
      const result = await User.findByIdAndUpdate(
        userId,
        { $set: { watchlist: watchlist } }, // Set the new watchlist
        { new: true, upsert: true } // Return the updated document, create if not exists
      );
      
      console.log("result " + result);
      if (!result) {
        console.log("no result");
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Watchlist successfully updated" });
    } catch (err) {
      console.error("Error updating watchlist:", err);
      res.status(500).json({ message: "Database update error" });
    }
 

  })

 apiRouter.get('/user/watchlist',verifyToken,async (req,res)=>{
  console.log("inside get /user/watchlist");

  const userId = req.user.id; 

  try {
    const result = await User.findById(userId);
    console.log(result.watchlist);
     return res.status(200).json({watchlist: result.watchlist});
  }
  catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({ message: "Database update error" });
  }

 })