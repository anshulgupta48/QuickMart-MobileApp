import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import { ApiError } from './utils/apiError.js';
import { connectToMongoDB } from './utils/connectToMongoDB.js';


// <======== Dotenv & Database-Setup ========>
dotenv.config({ path: '.env.local'});
connectToMongoDB();


// <======== Server-Setup ========>
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is Running on Port ${process.env.SERVER_PORT}!`);
});


// <======== Routes-Setup ========>
app.use('/api/auth', authRouter);


// <======== Error-Middleware ========>
app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error?.statusCode || 500;
    const errorMessage = error?.message || 'Internal Server Error';
    return res.status(statusCode).json({ isSuccess: false, statusCode, message: errorMessage });
});