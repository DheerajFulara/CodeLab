import { useState } from "react";

export default function ChatBox({ messages, onSend }) {
  const [msg, setMsg] = useState("");

  const send = () => {
    if (msg.trim()) {
      onSend(msg);
      setMsg("");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Live Chat</h2>
      <div className="bg-gray-700 h-40 overflow-y-auto p-2 rounded mb-2 space-y-1">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.sender}:</strong> {m.text}
            <span className="text-xs text-gray-300 ml-2">[{m.time}]</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-2 py-1 rounded bg-gray-800 text-white"
        />
        <button onClick={send} className="bg-sky-600 px-3 py-1 rounded text-white">Send</button>
      </div>
    </div>
  );
}
