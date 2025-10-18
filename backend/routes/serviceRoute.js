import express from "express";
import serviceController from "../controllers/serviceController.js";

const router = express.Router();

// Routes
router.post("/create", serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);

export default router;
