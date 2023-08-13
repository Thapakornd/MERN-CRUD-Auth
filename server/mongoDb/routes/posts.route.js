import {
    getAllPost,
    delPostById,
    updatePostById,
    createPost,
    getPostById,
    getPostByCurrentUser
} from '../controllers/API/post.controller.js'
import express from 'express';

const router = express.Router();

router.get('/', getAllPost);
router.post('/create', createPost);
router.get('/current', getPostByCurrentUser);
router.get('/:id', getPostById);
router.put('/:id', updatePostById);
router.delete('/:id', delPostById);

export default router;