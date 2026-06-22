import httpStatus from 'http-status';
import { TypeController } from "../../types/express.types";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { errorHandle } from '../../utils/errorResponse';

const loginUser: TypeController = async (req, res) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User logged in successfully",
            data: result
        });
    } catch (error) {
        const err = errorHandle(error);

        sendResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: err.message,
            // error: err,
        });
    }
};

export const authController = {
    loginUser,

};