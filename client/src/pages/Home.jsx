import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const navigate = useNavigate();

  const handleProfileClick = () => setShowMenu(!showMenu);

  const handleUpdateProfile = () => {
    navigate("/profile");
    setShowMenu(false);
  };

  const handleCreateMeet = () => {
    setShowCreateOptions(!showCreateOptions);
  };

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateLater = () => {
    const code = generateCode();
    setGeneratedCode(code);
    setShowCodeModal(true);
    setShowCreateOptions(false);
  };

  const handleInstantMeet = () => {
    const code = generateCode();
    navigate(`/room/${code}`);
    setShowCreateOptions(false);
  };

  const handleJoinMeet = () => {
    if (joinCode.trim()) {
      navigate(`/room/${joinCode.trim()}`);
    } else {
      alert("Please enter a valid session code.");
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/auth");
  };

  const getInitial = () => {
    if (user && user.name && user.name.length > 0) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 flex flex-col relative">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-emerald-500">CodeLab</div>

        <div className="flex items-center space-x-4">
          <div className="relative inline-block text-left">
            <div onClick={handleProfileClick} className="cursor-pointer select-none">
              <div className="w-10 h-10 rounded-full bg-white border border-emerald-500 flex items-center justify-center font-bold text-lg shadow-md uppercase text-emerald-600">
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
              </div>
            )}
          </div>
          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 bg-red-500 text-white rounded-full shadow hover:shadow-lg transition transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-4">
          Real-time Coding Collaboration
        </h1>
        <p className="max-w-xl text-gray-700 mb-10">
          Start a new CodeLab session and build together with your team. Collaborate live, share ideas, and code seamlessly in one place.
        </p>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 relative">
          {/* New session button with dropdown */}
          <div className="relative">
            <button
              onClick={handleCreateMeet}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-white px-6 py-3 rounded-full shadow hover:shadow-lg transition"
            >
              <span className="text-xl">➕</span>
              <span className="font-semibold">New CodeLab Session</span>
            </button>
            {showCreateOptions && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20 text-left">
                <button
                  onClick={handleCreateLater}
                  className="w-full px-4 py-3 hover:bg-emerald-50 text-gray-700 text-sm md:text-base"
                >
                  🔗 Create a session for later
                </button>
                <button
                  onClick={handleInstantMeet}
                  className="w-full px-4 py-3 hover:bg-emerald-50 text-gray-700 text-sm md:text-base"
                >
                  ⚡ Start an instant session
                </button>
              </div>
            )}
          </div>

          {/* Join session input and button */}
          <input
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Enter a session code"
            className="px-4 py-3 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-emerald-300 w-64"
          />
          <button
            onClick={handleJoinMeet}
            className="px-6 py-3 bg-emerald-500 text-white rounded-full shadow hover:bg-emerald-600 transition"
          >
            Join
          </button>
        </div>
      </main>

      {/* Modal for Generated Link */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">Here's your joining info</h2>
            <p className="text-gray-700 mb-4">
              Send this link to people you want to meet with. Be sure to save it so you can use it later, too.
            </p>
            <div className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mb-4 break-all text-emerald-700 font-mono">
              {`${window.location.origin}/room/${generatedCode}`}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/room/${generatedCode}`);
                alert("Link copied to clipboard!");
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-full shadow hover:bg-emerald-600 transition mb-2"
            >
              Copy Link
            </button>
            <button
              onClick={() => setShowCodeModal(false)}
              className="block w-full mt-2 text-sm text-gray-600 hover:text-emerald-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
