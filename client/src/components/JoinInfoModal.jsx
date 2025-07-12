import { useState } from "react";
import { Copy } from "lucide-react"; // optional icon, or replace with text

export default function JoinInfoModal({ link, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-3">Here’s your joining info</h2>
        <p className="text-gray-600 mb-4">
          Share this link so others can join your CodeLab session.
        </p>

        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 mb-4">
          <span className="text-sm text-gray-800 truncate">{link}</span>
          <button
            onClick={handleCopy}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            {copied ? "Copied!" : <Copy size={18} />}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
}
