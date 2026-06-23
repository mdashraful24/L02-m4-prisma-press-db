import httpStatus from 'http-status';
import { TTypeController } from '../../types/express.types';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const loginUser: TTypeController = catchAsync(async (req, res, next) => {
    
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