import { useNavigate } from "react-router-dom";

export default function FrontPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth?mode=login");
  };

  const handleRegister = () => {
    navigate("/auth?mode=register");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50 px-4">
      <h1 className="text-5xl font-extrabold text-emerald-600 mb-6 text-center">Welcome to CodeLab</h1>
      <p className="max-w-xl text-center text-gray-700 mb-10">
        Real-time collaborative coding platform. Create rooms, share code live, and chat seamlessly with your team.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-emerald-500 text-white rounded-full shadow hover:bg-emerald-600 transition"
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          className="px-6 py-3 bg-sky-500 text-white rounded-full shadow hover:bg-sky-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
