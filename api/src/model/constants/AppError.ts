export class AppError extends Error {
    code: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.code = statusCode;
    }
}