import express from "express";
import { verifyAdminToken, verifyUserToken } from "../middleware/verifyToken";
import {
  createCase,
  getAllCases,
  getCaseByID,
  deleteCase,
  updateCase,
  patchCase,
  addToCase,
  addToCaseNewDocs
} from "../controller/case";

const router = express.Router();

router.post("/admin/createcase", verifyAdminToken, createCase);
router.post("/createcase",verifyAdminToken, createCase);
router.get('/getallcasetest', getAllCases);
router.get('/gettestcase/:id', getCaseByID);
router.get("/admin/getallcases", verifyAdminToken, getAllCases);
router.get("/admin/getcasebyid/:id", verifyAdminToken, getCaseByID);
router.get("/lawyer/getcasebyid/:id", verifyUserToken, getCaseByID);
router.delete("/admin/deletecase/:id", verifyAdminToken, deleteCase);
router.put("/admin/updatecase/:id", verifyAdminToken, updateCase);
router.put("/lawyer/updatecase/:id", verifyUserToken, updateCase);
router.patch("/admin/patchcase/:id", verifyAdminToken, patchCase);
router.patch("/lawyer/patchcase/:id", verifyUserToken, patchCase);
router.patch("/addtocase/:id",addToCase);
router.patch("/addtocasedocs/:id",addToCaseNewDocs);

export default router;
