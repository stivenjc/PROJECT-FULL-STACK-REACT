import React from "react";
import { useFormik } from "formik";
import { addComent } from "../api/coment";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../actions/posts";
import { getPosts } from "../api/postsAPI";

function initialValues() {
  return {
    title: "",
  };
}

export default function ComentForm(props) {
  const dispatch = useDispatch();
  const miImfo = useSelector((state) => state.userReducer.detail);
  const { idpost } = props;

  const getposts = async () => {
    const respuesta = await getPosts();
    dispatch(setPosts(respuesta));
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    onSubmit: async (formValue, idUser, idpos = idpost) => {
      try {
        await addComent(formValue, (idUser = miImfo?.id), idpos);
        getposts();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div class="input-group mb-3">
          <input
            type="text"
            name="title"
            class="form-control mt-4"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="texto del comentario"
          />

          <button
            type="submit"
            class="input-group-text btn btn-primary mt-4"
            id="basic-addon2"
          >
            Comentar
          </button>
        </div>
      </form>
    </div>
  );
}
