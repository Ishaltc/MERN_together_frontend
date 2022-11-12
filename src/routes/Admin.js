import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../AdminPages/home";
import AdminLogin from "../AdminPages/login";

export default function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLogin />}></Route>

        <Route path="/home" element={<AdminHome />}></Route>
      </Routes>
    </div>
  );
}
