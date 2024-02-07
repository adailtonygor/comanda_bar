import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import Comanda from "./pages/comanda";
import CozinhaPage from "./pages/cozinha";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/comanda/:mesa" element={<Comanda />} />
        <Route path="/cozinha/:mesa" element={<CozinhaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
