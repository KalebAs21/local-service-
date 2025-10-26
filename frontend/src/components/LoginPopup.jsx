import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    // Compute URL & payload depending on current state
    let newUrl = url;
    let payload = {};

    if (currState === "Login") {
      newUrl += "/api/user/login";
      payload = {
        email: data.email,
        password: data.password,
      };
    } else {
      newUrl += "/api/user/register";
      payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
    }

    // Debug logs (remove in production)
    console.log("Calling:", newUrl);
    console.log("Payload:", payload);

    try {
      const response = await axios.post(newUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data); // ← Add this to see what backend sends

      if (response?.data?.success) {
        const { token, user } = response.data;

        // ✅ Store token
        setToken(token);
        localStorage.setItem("token", token);

        // ✅ Store user object
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Set Authorization header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // ✅ Close login popup
        setShowLogin(false);

        // ✅ Navigate based on role (INSIDE success check!)
        if (user.role === "provider") {
          navigate("/provider-dashboard");
        }  else {
          navigate("/browseservices");
        }

        console.log("Login successful! Token stored:", token);
      } else {
        // Backend returned success: false
        alert(response?.data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      
      // Show backend message if available
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please check your credentials.";
      
      alert(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={onLogin}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6 relative"
      >
        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currState}
          </h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {currState === "Login" ? null : (
            <input
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              autoComplete="name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          )}

          <input
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            autoComplete="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
            autoComplete={currState === "Login" ? "current-password" : "new-password"}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input type="checkbox" className="mt-1" required />
          <p>
            By continuing, I agree to the{" "}
            <span className="text-primary">Terms of Use</span> and{" "}
            <span className="text-primary">Privacy Policy</span>.
          </p>
        </div>

        {/* Toggle between login / signup */}
        {currState === "Login" ? (
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-primary cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-primary cursor-pointer font-medium"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
