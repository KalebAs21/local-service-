import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    category: { type: String, required: true }, // ✅ changed from ObjectId to String
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String },
    image: { type: String }, // ✅ changed from "images: [String]" to single image
    averageRating: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
