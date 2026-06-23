import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const loginUser = catchAsync(async (req, res) => {
    const result = await authService.loginUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result
    });
});


export const authController = {
    loginUser,

};