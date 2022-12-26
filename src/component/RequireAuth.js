import React from "react";
import { getToken } from "../api/token";
import Layout from "../layout";
import { Navigate } from "react-router";

export default function RequireAuth() {
  const token = getToken();
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Layout />
    </>
  );
}
