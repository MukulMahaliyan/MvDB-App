
//load environment variables globally
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';


import { connectDB } from './config/database.js';



// Initialize Express 
const app = express();

// connect to db
connectDB();

//read from req.body
app.use(express.json());


app.get('/',(req,res)=>{
    res.writeHead(429,{'retry-after':'10s'});
    res.end();
});

import { apiRouter } from './routes/apiRoutes.js'

//mount apitRoutes to /api endpoint
app.use('/api',apiRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
