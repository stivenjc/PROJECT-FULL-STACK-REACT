import React from "react";
import { getToken } from "../api/token";
import Login from "../pages/Login";
import { Navigate } from "react-router";

export default function RenderLogin() {
  const token = getToken();

  if (token) {
    return <Navigate to="/dashboard/users" replace />;
  }
  return <Login />;
}
