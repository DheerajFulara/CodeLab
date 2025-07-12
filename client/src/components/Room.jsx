import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../services/socket";
import CodeEditor from "./CodeEditor";
import ChatBox from "./ChatBox";
import UserList from "./UserList";

export default function Room() {
  const { code } = useParams();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [codeText, setCodeText] = useState("");

  useEffect(() => {
    socket.connect();
    const user = JSON.parse(localStorage.getItem("user"));

    socket.emit("joinRoom", code);
    socket.user = user;

    socket.on("userJoined", (socketId) => {
      console.log(`User joined: ${socketId}`);
    });

    socket.on("codeUpdate", (newCode) => {
      setCodeText(newCode);
    });

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [code]);

  const handleCodeChange = (newCode) => {
    setCodeText(newCode);
    socket.emit("codeChange", { room: code, code: newCode });
  };

  const handleSendMessage = (message) => {
    const chatMsg = { sender: socket.user.name, text: message, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, chatMsg]);
    socket.emit("chatMessage", { room: code, message: chatMsg });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1 bg-gray-800 p-4 rounded-lg">
        <UserList users={users} />
        <ChatBox messages={messages} onSend={handleSendMessage} />
      </div>
      <div className="col-span-3 bg-gray-800 p-4 rounded-lg">
        <CodeEditor code={codeText} onChange={handleCodeChange} />
      </div>
    </div>
  );
}
