import Service from "../models/serviceModel.js"; // make sure this file exists

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const newService = new Service({
      providerId: req.user.id, // assuming you have user auth middleware
      title,
      description,
      price,
      category,
    });

    await newService.save();
    res.json({ success: true, message: "Service created successfully.", service: newService });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("providerId", "fullName"); // optional: populate provider info
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("providerId", "fullName");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ default export
export default {
  createService,
  getAllServices,
  getServiceById,
};
