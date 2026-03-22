import { ApiError } from './apiError.js';

export const errorHandler = (statusCode: number, errorMessage: string) => {
    const error = new ApiError(statusCode, errorMessage);
    throw error;
};