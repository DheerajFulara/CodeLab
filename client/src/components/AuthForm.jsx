import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, loginUser } from "../services/api";

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialMode = params.get("mode") === "register" ? true : false;

  const [isRegister, setIsRegister] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Watch query param changes
  useEffect(() => {
    const mode = new URLSearchParams(location.search).get("mode");
    setIsRegister(mode === "register");
    setError("");
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        const res = await registerUser({ name, email, password });
        alert(res.message || "Registration successful! Please login.");
        navigate("/auth?mode=login");
      } else {
        const res = await loginUser({ email, password });
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/home");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-emerald-600">
          {isRegister ? "Register to CodeLab" : "Login to CodeLab"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
            required
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => navigate(isRegister ? "/auth?mode=login" : "/auth?mode=register")}
            className="text-emerald-600 hover:underline font-medium"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </div>
      </div>
    </div>
  );
}
