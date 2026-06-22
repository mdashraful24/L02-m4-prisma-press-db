import httpStatus from 'http-status';
import { prisma } from "../../lib/prisma";
import { SelfError } from "../../utils/errorResponse";
import { IUser } from "../user/user.interface";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from '../../config';

const loginUserIntoDB = async (payload: IUser) => {
    const { email, password } = payload;

    const findUser = await prisma.user.findUnique({
        where: { email }
    });

    if (!findUser) {
        throw new SelfError("User does not exist!", httpStatus.NOT_FOUND);
    }

    const matchPassword = await bcrypt.compare(
        password,
        findUser.password
    )

    if (!matchPassword) {
        throw new SelfError("Incorrect password!", httpStatus.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({
        where: { email },
        omit: { password: true }
    });

    const jwtPayload = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt.accessSecret,
        {
            expiresIn: "1d"
        }
    );

    const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt.refreshSecret,
        {
            expiresIn: "30d"
        }
    );

    return {
        accessToken,
        refreshToken
    }
}

export const authService = {
    loginUserIntoDB,

}