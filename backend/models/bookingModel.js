import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "completed", "cancelled"], 
    default: "pending" 
  },
  totalPrice: Number,
  notes: String
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
