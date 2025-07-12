import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import Room from "./components/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
