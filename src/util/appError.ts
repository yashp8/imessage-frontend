import {AppMessage} from "./appMessage";

export class AppError extends Error {
    private isOperational: boolean;
    constructor(message: any, code: number) {
        super(message);
        this.isOperational = true;
        new AppMessage(this.message, 0, 'top-center')
    }
}