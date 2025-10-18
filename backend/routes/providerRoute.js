import express from "express";
import applicationController from "../controllers/providerController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ use controller methods through the default object
router.post("/apply", protect,  applicationController.applyForProvider);
router.get("/my-application", applicationController.getMyApplication);

export default router;