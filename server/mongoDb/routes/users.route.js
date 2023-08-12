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

router.use(verifyRoles(ROLES_LIST.Admin));
router.get('/', getAllUser);
router.delete('/:id', delById);

router.use(verifyRoles(ROLES_LIST.Editor))
router.get('/:id', getById);
router.put('/:id', updateById);


export default router;