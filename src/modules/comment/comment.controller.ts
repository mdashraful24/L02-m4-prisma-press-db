import { catchAsync } from "../../utils/catchAsync";

const createComment = catchAsync(async (req, res) => {

});

const getCommentsByAuthor = catchAsync(async (req, res) => {

});

const getSingleComment = catchAsync(async (req, res) => {

});

const updateComment = catchAsync(async (req, res) => {

});

const deleteComment = catchAsync(async (req, res) => {

});

const moderateComment = catchAsync(async (req, res) => {

});


export const commentController = {
    createComment,
    getCommentsByAuthor,
    getSingleComment,
    updateComment,
    deleteComment,
    moderateComment,
};