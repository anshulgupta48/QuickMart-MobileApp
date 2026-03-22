import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/errorHandler.js';
import { SignInRequestBody, SignUpRequestBody } from '../utils/interfaces.js';

export const handleSignUp = async (req: Request<{}, {}, SignUpRequestBody>, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body;

    try {
        const isOldUser = await User.findOne({ email });
        if (isOldUser) {
            return next(errorHandler(406, 'This Email is already Linked with another Account'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 14);
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ isSuccess: true, message: 'User Created Successfully' });
    } catch (error) {
        next(error);
    }
};

export const handleSignIn = async (req: Request<{}, {}, SignInRequestBody>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User Not Found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid Email or Password'));
        }

        const { password: pass, ...validUserWithoutPassword } = validUser.toObject();
        const jwtToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET as string, { expiresIn: '8d' });
        res.cookie('access_token', jwtToken, { expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), httpOnly: true }).status(200).json({ isSuccess: true, userData: validUserWithoutPassword });
    } catch (error) {
        next(error);
    }
};

export const handleSignOut = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({ isSuccess: true, message: 'User Signed-Out Successfully' });
    } catch (error) {
        next(error);
    }
};