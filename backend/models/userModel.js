import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "provider", "admin"], default: "customer" },
  phone: { type: String },
  location: { type: String },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }]
}, { minimize: false, timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
