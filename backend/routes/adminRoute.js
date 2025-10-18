import express from "express";
import adminController from "../controllers/adminController.js";
import  verifyToken  from "../middleware/authMiddleware.js"; // your token middleware
import  checkRole   from "../middleware/roleMiddleware.js"; // require admin

const router = express.Router();

router.get("/applications", verifyToken, checkRole("admin"), adminController.getAllApplications);
router.get("/applications/:id", verifyToken, checkRole("admin"), adminController.getApplicationById);
router.patch("/applications/:id", verifyToken, checkRole("admin"), adminController.updateApplicationStatus);

export default router;
