import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import DetalleUser from "./DetalleUser";
import Profile from "./Profile";

export default function ValidadorDetail() {
  const miImfo = useSelector((state) => state.userReducer.detail);
  const { id } = useParams();

  return (
    <>
      {miImfo && (
        <div>{miImfo.id == id ? <Profile /> : <DetalleUser id={id} />}</div>
      )}
    </>
  );
}
