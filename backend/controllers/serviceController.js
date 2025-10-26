// backend/controllers/serviceController.js
import Service from "../models/serviceModel.js";

const createService = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const service = await Service.create({ name, description, price, category });
    res.status(201).json({ success: true, service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, services });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default { createService, getAllServices, deleteService };
