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

//router.use(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor)).get('/', getAllPost);
//router.use(verifyRoles(ROLES_LIST.Admin)).delete('/del/:id', delPostById);

//router.put('/update', updatePostById);
//router.use(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor)).get('/roles/:id', getPostById);
//router.get('/:id', getPostByCurrentUser);
//router.post('/create', createPost);

export default router;