import { useState, useEffect } from "react";
import { registerUser, loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  // Auto-clear messages
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
    setMessage({ type: "", text: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        // ✅ Store token
        localStorage.setItem("token", res.data.token);

        // ✅ Set user in parent App
        onLogin(res.data.user);

        setMessage({ type: "success", text: "Login successful! Redirecting to Home..." });
        setTimeout(() => navigate("/home"), 1000);
      } else {
        await registerUser(formData);
        setMessage({ type: "success", text: "Registration successful! Please login." });
        setTimeout(() => handleToggle(), 1500);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setMessage({
        type: "error",
        text: err?.response?.data?.message || err.message || "Error!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-emerald-100">
      <div className="bg-white rounded-3xl shadow-xl flex w-[800px] overflow-hidden ring-1 ring-gray-200">
        {/* Left Panel */}
        <div className="w-1/2 p-8 bg-gradient-to-b from-emerald-300 to-sky-300 text-gray-900 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
            {isLogin ? "👋 Welcome Back!" : "🌟 Join CodeLab"}
          </h2>
          <p className="text-center text-base mb-6 max-w-xs indent-4">
            {isLogin
              ? "Login to continue your journey with us. We're happy to see you again!"
              : "Create a new account"}
          </p>
          <button
            onClick={handleToggle}
            className="border border-white rounded-full px-6 py-2 bg-white/20 backdrop-blur hover:bg-white hover:text-emerald-600 transition shadow-md"
          >
            {isLogin ? "Create Account" : "Back to Login"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold mb-6 text-emerald-600">
            {isLogin ? "Login to Your Account" : "Create a New Account"}
          </h2>

          {message.text && (
            <div
              className={`mb-4 p-3 rounded-xl text-center text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                required
              />
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white rounded-full px-4 py-3 hover:bg-emerald-600 shadow-lg transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
