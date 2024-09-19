import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Indexpage from "./pages/Indexpage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:4000";
function App() {
  return (
    <UserContextProvider>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Indexpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
          </Route>
        </Routes>
      </>
    </UserContextProvider>
  );
}

export default App;
