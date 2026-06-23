import httpStatus from 'http-status';
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { SelfError } from "./errorResponse";

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {

    const token = jwt.sign(
        payload,
        secret,
        {
            expiresIn
        } as SignOptions
    );

    return token;
};

const verifyToken = (token: string, secret: string) =>{
    try {
        const verifiedToken = jwt.verify(token, secret);
        return verifiedToken;
    } catch (error) {
        throw new SelfError("Invalid signature", httpStatus.UNAUTHORIZED);
    }
}


export const jwtUtils = {
    createToken,
    verifyToken,

};