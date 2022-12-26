import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImfoProfile from "../component/Profile/ImfoProfile";
import { getMe } from "../api/usersAPI";
import { setDetail } from "../actions";

export default function Profile() {
  const miImfo = useSelector((state) => state.userReducer.detail);
  const dispatch = useDispatch();

  const getUserImfo = async () => {
    const me = await getMe();
    const { data } = me;
    dispatch(setDetail(data));
  };

  // useEffect(() => {
  //   console.log("change miinfo");
  // }, [miImfo]);

  return (
    <>
      <div>
        {miImfo && <ImfoProfile getUserImfo={getUserImfo} miImfo={miImfo} />}
      </div>
    </>
  );
}
