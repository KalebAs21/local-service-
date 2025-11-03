import express from "express";
import serviceController from "../controllers/serviceController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// ✅ Make sure "uploads" folder exists in your project root
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post(
  "/create",
  protect,
  authorizeRoles("provider"),
  upload.single("image"),
  serviceController.createService
);

router.get("/get", serviceController.getAllServices);

router.delete(
  "/:id",
  protect,
  authorizeRoles("provider"),
  serviceController.deleteService
);

export default router;
