import mongoose from 'mongoose';

export const connectDB = async () => {

try{    
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
             useNewUrlParser: true,
             useUnifiedTopology: true
             });
        console.log('Connected to MongoDB');
}
catch(error){ 
    console.error('Database connection error: ',error.message);

}

};

