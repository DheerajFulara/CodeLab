import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => setShowMenu(!showMenu);

  const handleUpdateProfile = () => {
    navigate("/profile");  // You can later implement this route
    setShowMenu(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  const getInitial = () => {
    if (user && user.name && user.name.length > 0) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-emerald-500 cursor-pointer" onClick={() => navigate('/home')}>
        CodeLab
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative inline-block text-left">
          <div
            onClick={handleProfileClick}
            className="cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-lg text-white shadow uppercase">
              {getInitial()}
            </div>
          </div>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={handleUpdateProfile}
                className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-gray-700"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogoutClick}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
