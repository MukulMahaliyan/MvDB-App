
//load environment variables globally
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './config/database.js';

import { MongoClient } from "mongodb";


// Initialize Express 
const app = express();

// connect to db
connectDB();

//read from req.body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.get('/',(req,res)=>{
    res.writeHead(429,{'retry-after':'10s'});
    res.end();
});

app.post('/',(req,res)=>{
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    res.end();
})
import { apiRouter } from './routes/apiRoutes.js'

//mount apiRoutes to /api endpoint
app.use('/api',apiRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
