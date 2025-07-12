import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, onUpdateProfile }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    alert("Profile updated!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
        <button
          onClick={() => navigate("/home")}
          className="text-emerald-500 font-semibold hover:underline"
        >
          ← Back to Home
        </button>
        <div className="text-2xl font-bold text-emerald-500">Profile Settings</div>
        <div></div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-emerald-600">Update Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep existing"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white rounded-full px-4 py-3 hover:bg-emerald-600 shadow-lg transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
