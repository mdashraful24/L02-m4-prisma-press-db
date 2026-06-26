import { Router } from "express";
import { commentController } from "./comment.controller";
import authProtected from "../../middleware/auth.protected";
import { Role } from "../../../generated/prisma/enums";

const router = Router();


router.get("/author/:authorId", commentController.getCommentsByAuthor);
router.get("/:commentId", commentController.getSingleComment);
router.post("/", authProtected(Role.USER, Role.ADMIN, Role.AUTHOR), commentController.createComment);
router.patch("/:commentId", authProtected(Role.USER, Role.ADMIN, Role.AUTHOR), commentController.updateComment);
router.delete("/:commentId", authProtected(Role.USER, Role.ADMIN, Role.AUTHOR), commentController.deleteComment);
router.patch("/:commentId/moderate", authProtected(Role.ADMIN), commentController.moderateComment);


export const commentRoutes = router;