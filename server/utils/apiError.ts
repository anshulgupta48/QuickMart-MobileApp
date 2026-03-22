export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;

        // Fix prototype chain
        Object.setPrototypeOf(this, ApiError.prototype);
    }
};