import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      // =========================
      // SAVE JWT TOKEN
      // =========================

      const token = response.data.token;

      if (!token) {
        setError("Login successful but token was not received");
        return;
      }

      localStorage.setItem("token", token);

      // Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
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
            Login
          </h1>


          {/* Error */}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}


          {/* Form */}

          <form onSubmit={handleLogin}>

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


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white w-full p-3 rounded"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          {/* Signup Link */}

          <p className="text-center text-gray-600 mt-5">

            Don't have an account?{" "}

            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline"
            >
              Signup
            </button>

          </p>

        </div>

      </div>
    </>
  );
}

export default Login;