// backend/routes/serviceAdminRoutes.js
import express from "express";
import serviceController from "../controllers/serviceController.js";
import verifyToken from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, checkRole("customer"), serviceController.getAllServices);
// router.post("/", verifyToken, checkRole("admin"), serviceController.createService);
// router.delete("/:id", verifyToken, checkRole("admin"), serviceController.deleteService);

export default router;
