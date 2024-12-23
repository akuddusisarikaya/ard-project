import express from "express";
import { verifyAdminToken, verifyUserToken } from "../middleware/verifyToken";
import {
  createCourt,
  getCourtByID,
  getCourtByCaseID,
  deleteCourt,
  updateCourt,
  patchCourt,
} from "../controller/court";

const router = express.Router();

router.post("/admin/createcourt", verifyAdminToken, createCourt);
router.post('/createcourt', createCourt);
router.post("/lawyer/createcourt", verifyUserToken, createCourt);
router.get("/getcourtbyid/:id", getCourtByID);
router.get("/admin/getcourtbycaseid/:id", verifyAdminToken, getCourtByCaseID);
router.get("/lawyer/getcourtbycaseid/:id", verifyUserToken, getCourtByCaseID);
router.get("/admin/getcourtbyid/:id", verifyAdminToken, getCourtByID);
router.get("/lawyer/getcourtbyid/:id", verifyUserToken, getCourtByID);
router.delete("/deletecourt/:id", verifyAdminToken, deleteCourt);
router.put("/updatecourt/:id", verifyAdminToken, updateCourt);
router.patch("/patchcourt/:id", verifyAdminToken, patchCourt);

export default router;
