import httpStatus from 'http-status';
import { ErrorRequestHandler } from "express";
import { errorHandle } from "../utils/errorResponse";
import { sendResponse } from '../utils/sendResponse';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const err = errorHandle(error);

    sendResponse(res, {
        statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: err.message || "Something went wrong",
        // error: process.env.NODE_ENV === 'development' ? err : undefined,
    });
};

export default globalErrorHandler;
