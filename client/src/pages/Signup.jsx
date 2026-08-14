import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // HANDLE SIGNUP
  // =========================
  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("SIGNUP RESPONSE:", response.data);

      alert("Account created successfully!");

      // Login page par bhejo
      navigate("/login");

    } catch (error) {
      console.log("SIGNUP ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Signup failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

          {/* Heading */}

          <h1 className="text-3xl font-bold mb-6 text-center">
            Create Account
          </h1>


          {/* Error */}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}


          {/* Form */}

          <form onSubmit={handleSignup}>

            {/* Name */}

            <input
              type="text"
              placeholder="Name"
              className="border w-full p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            {/* Email */}

            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            {/* Password */}

            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 rounded mb-5 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            {/* Signup Button */}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white w-full p-3 rounded"
            >
              {loading ? "Creating Account..." : "Signup"}
            </button>

          </form>


          {/* Login Link */}

          <p className="text-center text-gray-600 mt-5">

            Already have an account?{" "}

            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>

          </p>

        </div>

      </div>
    </>
  );
}

export default Signup;