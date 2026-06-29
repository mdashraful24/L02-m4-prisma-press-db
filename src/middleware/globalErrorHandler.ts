import httpStatus from 'http-status';
import { ErrorRequestHandler } from "express";
import { errorHandle } from "../utils/errorResponse";
import { sendResponse } from '../utils/sendResponse';
import { Prisma } from '../../generated/prisma/client';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    // const err = errorHandle(error);

    // sendResponse(res, {
    //     statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    //     success: false,
    //     message: err.message || "Something went wrong",
    //     // error: process.env.NODE_ENV === 'development' ? err : undefined,
    // });

    console.log("Error : ", error);

    let statusCode;
    let errorMessage = error.message || "Internal Server Error";
    let errorName = error.name || "Internal Server Error";

    if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = httpStatus.BAD_REQUEST;
        errorMessage = "You have provided incorrect field type or missing fields";
    }
    else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Duplicate key error";
        }
        else if (error.code === "P2003") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Foreign key constant failed";
        }
        else if (error.code === "P2025") {
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "An operation failed because it depends on one or more records that were required but not found";
        }
    }
    else if (error instanceof Prisma.PrismaClientInitializationError) {
        if (error.errorCode === "P1000") {
            statusCode = httpStatus.UNAUTHORIZED;
            errorMessage = `Authentication failed against database server at ${config.appUrl}. Please check your credentials.`;
        }
        else if(error.errorCode === "P1001"){
            statusCode = httpStatus.UNAUTHORIZED;
            errorMessage = "Can't reach database server";
        }
    }
    else if(error instanceof Prisma.PrismaClientUnknownRequestError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = "Error occurred during query execution";
    }


    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        name: errorName,
        error: error.stack
        // errorCode: error.code || null,
    })
};

export default globalErrorHandler;
