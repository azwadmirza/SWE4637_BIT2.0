import express from 'express';
import {
  createForumPost,
  getAllForumPosts,
} from '../controller/forum.controller'; // Adjust the import path as needed
import authenticated from '../middleware/authentication.middleware';

const router = express.Router();

router.use(authenticated);
router.post('/forum', createForumPost);
router.get('/forum', getAllForumPosts);

export default router;
