import mongoose from "mongoose";

const providerApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // ✅ must match your user model name
      required: true,
    },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    skills: { type: [String], required: true },
    experienceYears: { type: Number, required: true },
    documentUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: { type: String },
  },
  { timestamps: true }
);

const ProviderApplication =
  mongoose.models.ProviderApplication ||
  mongoose.model("ProviderApplication", providerApplicationSchema);

export default ProviderApplication;
