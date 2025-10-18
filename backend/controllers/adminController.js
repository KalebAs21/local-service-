// backend/controllers/adminController.js
import ProviderApplication from "../models/ApplicationModel.js"; // your provider application model
import User from "../models/userModel.js"; // your user model

// GET all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await ProviderApplication.find()
      .populate("userId", "name email role"); // populate user info (name, email, role)
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("getAllApplications error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET single application by ID
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await ProviderApplication.findById(id)
      .populate("userId", "name email role");
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    console.error("getApplicationById error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PATCH: approve or reject (and update user role on approve)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body; // expected: "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Find application first
    const application = await ProviderApplication.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // If already the same status, return
    if (application.status === status) {
      // populate and return
      const populated = await ProviderApplication.findById(id).populate("userId", "name email role");
      return res.status(200).json({ success: true, message: `Application already ${status}`, application: populated });
    }

    // Update application fields
    application.status = status;
    if (adminNote) application.adminNote = adminNote;
    await application.save();

    // If approved -> change user role to 'provider' (if not already)
    if (status === "approved") {
      // Only update if user exists and is not already provider
      const user = await User.findById(application.userId);
      if (user && user.role !== "provider") {
        user.role = "provider";
        await user.save();
      }
      // optional: create initial provider profile, or send notification/email here
    }

    // After change, return the populated application object
    const updated = await ProviderApplication.findById(id).populate("userId", "name email role");

    res.status(200).json({
      success: true,
      message: `Application ${status}`,
      application: updated,
    });
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default {
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
};
