import React from "react";
import { X } from "lucide-react";

const ProfileSetting = ({ setShowProfile }) => {
  return (
    // Overlay background
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Popup container */}
      <div className="bg-color-card text-color-foreground rounded-2xl shadow-lg p-6 w-full max-w-lg relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-color-border transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Profile Settings
        </h1>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              required
              className="border border-color-border rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="border border-color-border rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Email</label>
            <input
              name="emailConfirm"
              type="email"
              placeholder="Confirm your email"
              required
              className="border border-color-border rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="number"
              placeholder="Your phone number"
              required
              className="border border-color-border rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-color-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Service Type</label>
            <select
              required
              className="border border-color-border rounded-md p-2 w-full mt-1 bg-color-background focus:outline-none focus:ring-2 focus:ring-color-primary"
            >
              <option value="">Select Service</option>
              <option value="cleaning">Cleaning</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="gardening">Gardening</option>
              <option value="handyman">Handyman</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Service Description</label>
            <textarea
              placeholder="Describe your service"
              required
              className="border border-color-border rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-color-primary"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="bg-color-primary text-color-primary-foreground rounded-md py-2 mt-4 hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
 
    </div>
  );
};

export default ProfileSetting;
