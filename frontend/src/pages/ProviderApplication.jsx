import React, { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";

const ProviderApplicationPage = () => {
  const { url, token } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    skills: "",
    experienceYears: "",
    documentUrl: "",
  });

  const [message, setMessage] = useState("");

  // handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/provider/apply`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        skills: "",
        experienceYears: "",
        documentUrl: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-card gradient-border card-hover">
        <h2 className="text-2xl font-semibold mb-6 text-glow">
          Become a Service Provider
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-1 font-medium">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          
          {/* Experience */}
          <div>
            <label className="block mb-1 font-medium">Experience (Years)</label>
            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Document URL */}
          <div>
            <label className="block mb-1 font-medium">Document URL</label>
            <input
              type="text"
              name="documentUrl"
              value={formData.documentUrl}
              onChange={handleChange}
              placeholder="Paste your document link"
              className="w-full p-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="cosmic-button w-full mt-4">
            Submit Application
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-primary">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ProviderApplicationPage;
