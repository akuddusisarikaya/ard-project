import express from "express";
import {createDoc, getAllDocs, getDocByID, deleteDoc, updateDoc, patchDoc} from "../controller/doc";
import { verifyUserToken, verifyAdminToken } from "../middleware/verifyToken";

const router = express.Router();

router.post('/createdoc', createDoc);
router.get('/getdocbyid/:id', getDocByID);
router.get('/getalldocs', verifyAdminToken, getAllDocs);
router.get('/admin/getdocbyid/:id',verifyAdminToken, getDocByID);
router.get('/lawyer/getdocbyid/:id', verifyUserToken, getDocByID);
router.delete('/deletedoc/:id',verifyAdminToken, deleteDoc );
router.put('/admin/updatedoc/:id', verifyAdminToken, updateDoc);
router.put('/lawyer/updatedoc/:id', verifyUserToken, updateDoc);
router.patch('/admin/patchdoc/:id',verifyAdminToken, patchDoc );
router.patch('/lawyer/patchdoc/:id', verifyUserToken,patchDoc);

export default router