import React, { useState } from "react";
import Posts from "../component/Posts";
import Button from "react-bootstrap/Button";
import PostForm from "../component/postForm/PostForm";
import addPost from "../static/iconos/add-outline.svg";
import "./PageIndex.css";

export default function PageIndex() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="d-flex justify-content-center">
        <Posts />
        <Button
          className="d-flex align-items-center width_button rounded-circle shadow p-3 mb-5 bg-secondary rounded bg-opacity-25 border"
          variant=""
          onClick={handleShow}
        >
          <img className="img-fluid" src={addPost} />
        </Button>
        <PostForm show={show} handleClose={handleClose} />
      </div>
    </>
  );
}
