type TErrorHandleType = {
    message: string;
    statusCode?: number;
};

export class SelfError extends Error {
    statusCode?: number

    constructor(message: string, statusCode?: number) {
        super(message)
        this.statusCode = statusCode
    }
};

export const errorHandle = (error: unknown): TErrorHandleType => {
    if (error instanceof SelfError) {
        return {
            message: error.message,
            statusCode: error.statusCode ?? 500,
        }
    }

    if (error instanceof Error) {
        return {
            message: error.message,
        }
    }

    return {
        message: "Something went wrong!",
    }
};


// ! Experiments
// type TErrorHandleType = {
//     name?: string;
//     message?: string;
//     statusCode?: number;
//     stack?: string;
//     cause?: unknown;
//     code?: string | number;   // Prisma, JWT, etc.
//     details?: unknown;         // Validation details (e.g. Zod)
//     path?: string;             // API endpoint
//     method?: string;           // GET, POST, PUT...
//     timestamp?: string;        // ISO timestamp
// };