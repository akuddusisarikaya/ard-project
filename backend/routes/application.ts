import express from "express";
import {
  createApplication,
  getAllApplications,
  getCasebleApplications,
  getUncasebleApplications,
  getApplicationByID,
  deleteApplication,
  updateApplication,
  patchApplication,
} from "../controller/application";
import { verifyAdminToken, verifyUserToken } from "../middleware/verifyToken";

const router = express.Router();

router.get('/getapplications', getAllApplications);
router.post('/creatapplication', createApplication);
router.get('/admin/getallapplication', verifyAdminToken, getAllApplications);
router.get('/admin/getappbyid/:id', verifyAdminToken, getApplicationByID);
router.get('/lawyer/getappbyid/:id', verifyUserToken, getApplicationByID );
router.get('/admin/getcasebleapplications', verifyAdminToken, getCasebleApplications);
router.get('/admin/getuncasebleapplications', verifyAdminToken, getUncasebleApplications);
router.get('/getapplicationbyid/:id', getApplicationByID);
router.delete('/admin/deleteapplication/:id', verifyAdminToken, deleteApplication);
router.put('/admin/updateapplication/:id', verifyAdminToken, updateApplication);
router.patch('/admin/patchapplication/:id', verifyAdminToken, patchApplication);
router.patch('/denemepatchapp/:id', patchApplication);
export default router;