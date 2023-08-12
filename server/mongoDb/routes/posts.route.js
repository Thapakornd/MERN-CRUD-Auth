import {
    getAllPost,
    delPostById,
    updatePostById,
    createPost,
    getPostById,
    getPostByCurrentUser
} from '../controllers/API/post.controller.js'
import express from 'express';
import verifyRoles from '../middlewares/verifyRoles.js';
import ROLES_LIST from '../configs/rolesList.js';

const router = express.Router();

router.get('/', getAllPost);
router.post('/create', createPost);
router.get('/current', getPostByCurrentUser);

export default router;