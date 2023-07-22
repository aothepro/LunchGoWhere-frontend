import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import SessionsTable from "./components/SessionsTable";
import VotePage from "./components/VotePage";
import Home from "./components/Home";
import CreateSessionPage from "./components/CreateSessionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sessions/new" element={<CreateSessionPage />} />
        <Route path="/sessions/:sessionId" element={<VotePage />} />
        <Route path="/sessions" element={<SessionsTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
