import { 
    getAllUser, 
    getById,
    delById,
    updateById,
} from "../controllers/API/user.controller.js";
import express from 'express';
import ROLES_LIST from "../configs/rolesList.js";
import verifyRoles from "../middlewares/verifyRoles.js";

const router = express.Router();

router.use(verifyRoles(ROLES_LIST.Admin)).get('/', getAllUser);
router.use(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor)).get('/:id', getById);
router.use(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor)).delete('/:id', delById);
router.use(verifyRoles(ROLES_LIST.Editor)).put('/:id', updateById);

export default router;