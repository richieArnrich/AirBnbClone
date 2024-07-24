import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Indexpage from "./pages/Indexpage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Indexpage />} />
      </Routes>
    </>
  );
}

export default App;
