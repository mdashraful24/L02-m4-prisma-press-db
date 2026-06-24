import { Router } from "express";
import { userController } from "./user.controller";
import { Role } from '../../../generated/prisma/enums';
import authProtected from '../../middleware/auth.protected';

const router = Router();


router.post("/register", userController.registerUser);
router.get("/me", authProtected(Role.ADMIN, Role.USER, Role.AUTHOR), userController.getMyProfile);
router.put("/my-profile", authProtected(Role.ADMIN, Role.AUTHOR, Role.USER), userController.updateMyProfile);


export const userRouter = router;