
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User }  from '../models/user.js';




//  /api/ endpoints
export const apiRouter = express.Router();

apiRouter.get('/test', (req,res)=> {
    res.status(200).json({message:'This is the sample test data'});
});

// Register Route
apiRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
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
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access denied!" });
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token!" });
    }
  };
  
  // Protected Route (Example)
  apiRouter.get('/profile', verifyToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  });


 