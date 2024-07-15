import express from "express";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  addPostToGroup,
  updatePostInGroup,
  deletePostFromGroup,
  addCommentToPost,
  updateCommentInGroup,
  deleteCommentFromPost,
  upvotePost,
  downvotePost,
  upvoteComment,
  downvoteComment,
} from "../controller/group.controller";
import authenticated from "../middleware/authentication.middleware";

const router = express.Router();


router.use(authenticated);
router.post("/groups", createGroup);
router.get("/groups", getAllGroups);
router.get("/groups/:id", getGroupById);
router.put("/groups/:id", updateGroupById);
router.delete("/groups/:id", deleteGroupById);
router.post("/groups/:id/posts", addPostToGroup);
router.put("/groups/:groupId/posts/:postId", updatePostInGroup);
router.delete("/groups/:groupId/posts/:postId", deletePostFromGroup);
router.post("/groups/:groupId/posts/:postId/comments", addCommentToPost);
router.put(
  "/groups/:groupId/posts/:postId/comments/:commentId",
  updateCommentInGroup
);
router.delete(
  "/groups/:groupId/posts/:postId/comments/:commentId",
  deleteCommentFromPost
);
router.post("/groups/:groupId/posts/:postId/upvote", upvotePost);
router.post("/groups/:groupId/posts/:postId/downvote", downvotePost);
router.post(
  "/groups/:groupId/posts/:postId/comments/:commentId/upvote",
  upvoteComment
);
router.post(
  "/groups/:groupId/posts/:postId/comments/:commentId/downvote",
  downvoteComment
);

export default router;
