// backend/controllers/adminController.js
import ProviderApplication from "../models/applicationModel.js";
import User from "../models/userModel.js";

const getAllApplications = async (req, res) => {
  try {
    const applications = await ProviderApplication.find().populate("userId", "name email role");
    res.json({ success: true, applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await ProviderApplication.findById(req.params.id).populate("userId", "name email role");
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    res.json({ success: true, application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    if (!["approved", "rejected"].includes(status)) return res.status(400).json({ success: false, message: "Invalid status" });

    const application = await ProviderApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    application.status = status;
    if (adminNote) application.adminNote = adminNote;
    await application.save();

    if (status === "approved") {
      const user = await User.findById(application.userId);
      if (user && user.role !== "provider") {
        user.role = "provider";
        await user.save();
      }
    }

    const updated = await ProviderApplication.findById(req.params.id).populate("userId", "name email role");
    res.json({ success: true, message: `Application ${status}`, application: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export default { getAllApplications, getApplicationById, updateApplicationStatus };
