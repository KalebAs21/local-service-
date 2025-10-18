import ProviderApplication from "../models/applicationModel.js";

/**
 * Apply to become a service provider
 */
const applyForProvider = async (req, res) => {
  try {
    // ✅ userId comes from token (set in auth middleware)
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user ID missing" });
    }

    const { fullName, phone, address, skills, experienceYears, documentUrl } = req.body;

    // ✅ Check if user has already applied
    const existing = await ProviderApplication.findOne({ userId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You have already applied to be a provider." });
    }

    // ✅ Create new provider application
    const newApplication = new ProviderApplication({
      userId,
      fullName,
      phone,
      address,
      // convert comma-separated skills string to array if needed
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim()),
      experienceYears,
      documentUrl,
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error submitting provider application:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

/**
 * Get provider application for the logged-in user
 */
const getMyApplication = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user ID missing" });
    }

    const application = await ProviderApplication.findOne({ userId });

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "No application found for this user." });
    }

    res.status(200).json({ success: true, application });
  } catch (error) {
    console.error("Error fetching provider application:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

export default {
  applyForProvider,
  getMyApplication,
};
