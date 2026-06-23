import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { SelfError } from "../../utils/errorResponse";

const registerUser = catchAsync(async (req, res) => {
    const result = await userService.registerUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});

const getMyProfile = catchAsync(async (req, res) => {

    const { "access-token": accessToken } = req.cookies;

    if (!accessToken) {
        throw new SelfError("Access token is required", httpStatus.UNAUTHORIZED);
    }

    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt.accessSecret);

    if (typeof verifiedToken === "string") {
        throw new SelfError(verifiedToken);
    }

    const result = await userService.getMyProfileIntoDB(verifiedToken.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile fetched successfully",
        data: result,
    });
})


export const userController = {
    registerUser,
    getMyProfile,

}