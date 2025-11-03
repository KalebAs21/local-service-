import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

// Example categories (you can modify them as needed)
const serviceCategories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Mechanic",
  "Tutoring",
  "Gardening",
  "Per Care"
];

const initialForm = {
  fullName: "",
  title: "",
  description: "",
  price: "",
  serviceType: "",
  location: "",
};

const ProfileSetting = ({ setShowProfile }) => {
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login as provider.");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("fullName", form.fullName);
      payload.append("title", form.title);
      payload.append("description", form.description);
      payload.append("price", form.price);
      payload.append("category", form.serviceType);
      payload.append("location", form.location);
      if (imageFile) payload.append("image", imageFile);

      await axios.post("http://localhost:5000/api/service/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMsg("Service created successfully!");
      setForm(initialForm);
      setImageFile(null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-color-card text-color-foreground rounded-2xl shadow-lg p-6 w-full max-w-lg relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-color-border transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Provider: Create Service
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="border border-color-border rounded-md p-2 w-full mt-1"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium">Service Title</label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className="border border-color-border rounded-md p-2 w-full mt-1"
              placeholder="Enter service title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border border-color-border rounded-md p-2 w-full mt-1"
              placeholder="Describe your service"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="border border-color-border rounded-md p-2 w-full mt-1"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              className="border border-color-border rounded-md p-2 w-full mt-1"
              required
            >
              <option value="">Select Category</option>
              {serviceCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium">Location</label>
            <input
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              className="border border-color-border rounded-md p-2 w-full mt-1"
              placeholder="Enter your service location"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">Service Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-color-border rounded-md p-2 w-full mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-color-primary text-color-primary-foreground rounded-md py-2 mt-4 hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Success & Error Messages */}
        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 rounded px-4 py-2 mt-3">
            {successMsg}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 rounded px-4 py-2 mt-3">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetting;
