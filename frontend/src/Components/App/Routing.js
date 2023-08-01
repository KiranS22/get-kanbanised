import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Navbar from "../NavBar/Navbar";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoutes from "./Routing/ProtectedRoutes";

const Routing = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" exact element={<Home />} />
          </Route>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
