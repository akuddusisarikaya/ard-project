import express  from "express";
import { verifyAdminToken, verifyUserToken} from "../middleware/verifyToken";
import {addToUser, createUser, getAllUsers, getAllAdmins, getAllLawyers, getUserByID, deleteUser, updateUser, patchUser} from "../controller/user";

const router = express.Router();


router.post('/test/createuser', createUser);
router.post('/admin/createuser',verifyAdminToken, createUser);//verifyAdminUser ekle
router.get('/admin/getallusers',verifyAdminToken, getAllUsers);//verifyAdminUser ekle
router.get('/admin/getalladmins',verifyAdminToken, getAllAdmins);//verifyAdminUser ekle
router.get('/admin/getalllawyers',verifyAdminToken, getAllLawyers);//verifyAdminUser ekle
router.get('/getuserbyid/:id',verifyAdminToken, getUserByID);
router.get('/admin/getuserbyid/:id', verifyAdminToken, getUserByID);
router.get('/lawyer/getuserbyid/:id', verifyUserToken, getUserByID);
router.delete('/deleteuser/:id', verifyAdminToken, deleteUser);
router.put('/admin/updateuser/:id', verifyAdminToken, updateUser);
router.put('/lawyer/updateuser/:id', verifyUserToken,updateUser);
router.patch('/admin/patchuser/:id', verifyAdminToken, patchUser );
router.patch('/lawyer/patchuser/:id', verifyUserToken, patchUser);
router.patch('/admin/addToLawyerbyid/:id',verifyAdminToken, addToUser)

export default router