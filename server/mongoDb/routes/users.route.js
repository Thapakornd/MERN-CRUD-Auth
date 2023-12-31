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

router.use(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor));
router.get('/', getAllUser);
router.get('/:id', getById);
router.put('/:id', updateById);
router.delete('/:id', delById);

export default router;