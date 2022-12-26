import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "../component/Navbar";
import { setDetail } from "../actions";
import { getMe } from "../api/usersAPI";

export default function Layout() {
  const miImfo = useSelector((state) => state.userReducer.detail);
  const dispatch = useDispatch();

  const getUserImfo = async () => {
    try {
      const me = await getMe();
      const { data } = me;
      dispatch(setDetail(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserImfo();
  }, []);

  return (
    <div>
      <Navbar miImfo={miImfo} />
      <Outlet></Outlet>
    </div>
  );
}
