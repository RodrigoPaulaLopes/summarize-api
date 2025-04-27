class AppError extends Error {
    readonly message: string;
    readonly statusCode: number;

    constructor(message: string, statusCode: number = 400){
        super(message)
        this.message = message
        this.statusCode = statusCode
    }
}

export default AppError