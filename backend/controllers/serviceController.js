import User from "../models/userModel.js";
import Service from "../models/serviceModel.js";
 
// Provider can create service
const createService = async (req, res) => {
  try {
    const providerId = req.user._id;
    const { title, description, price, category, location } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!providerId || req.user.role !== "provider") {
      return res.status(403).json({ success: false, message: "Provider access only" });
    }

    if (!title || !description || !price || !category) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const service = await Service.create({
      provider: providerId,
      title,
      description,
      price,
      category, // ✅ now just a plain string (e.g., "Plumbing")
      location,
      image, // ✅ single filename string
    });

    res.status(201).json({ success: true, service });
  } catch (err) {
    console.error("Create service error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// All users: get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).populate("provider", "name");
    res.json({ success: true, services });
  } catch (err) {
    console.error("Get services error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Provider: delete own service
const deleteService = async (req, res) => {
  try {
    const providerId = req.user._id;
    const service = await Service.findOneAndDelete({ _id: req.params.id, provider: providerId });
    if (!service) {
      return res.status(404).json({ success: false, message: "Not found or not your service" });
    }
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Delete service error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default { createService, getAllServices, deleteService };
