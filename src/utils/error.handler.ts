export class ErrorHandler extends Error {
    status: number;
    constructor(status: number, message: string) {
        super();
        (this.status = status), (this.message = message);
    }

    static notFound(message: string) {
        return new ErrorHandler(404, message);
    }

    static serverError(message: string) {
        return new ErrorHandler(500, message);
    }

    static incorrectRequest(message: string) {
        return new ErrorHandler(400, message);
    }

    static unauthorized(message: string) {
        return new ErrorHandler(401, message);
    }

    static forbidden(message: string) {
        return new ErrorHandler(403, message);
    }
}
