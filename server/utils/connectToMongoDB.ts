import mongoose from 'mongoose';

export const connectToMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI!)
        .then(() => {
            console.log('Connected to MongoDB!');
        })
        .catch((error) => {
            console.log(`Error while Connecting to MongoDB: ${error}`);
        });
};