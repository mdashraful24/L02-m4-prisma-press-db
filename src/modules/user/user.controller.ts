import { TypeController } from "../../types/express.types";
import { errorHandle } from "../../utils/errorResponse";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";

const registerUser: TypeController = async (req, res) => {
    try {
        const result = await userService.registerUserIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User registered successfully",
            data: result,
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
}

export const userController = {
    registerUser,

}