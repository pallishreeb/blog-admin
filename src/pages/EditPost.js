/** @format */

import React, { useState, useContext, useEffect } from "react";
import { AddNav, ImageUpload, FirstStep, SecondStep } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthProvider";
import { PostContext } from "../context/PostProvider";
function EditPost() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  const postContext = useContext(PostContext);
  const {
    getSinglePost,
    successMsg,
    errorMsg,
    setErrorMsg,
    post,
    updatePost,
    setSuccessMsg,
    loading,
  } = postContext;
  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, token]);
  const [value, setValue] = useState(0);
  const [imgs, setImgs] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    title: "",
    text: "",
    brand: "",
    model: "",
    websitesLink: "",
    youtubeLink: "",
    category: {},
    subcategory: {},
  });
  useEffect(() => {
    // console.log(post);

    if (post?._id !== id) {
      getSinglePost(id, token);
    } else {
      setForm({
        _id: post._id,
        title: post?.title,
        text: post?.text,
        brand: post?.brand || "",
        model: post?.model || "",
        websitesLink: post?.websitesLink || "",
        youtubeLink: post?.youtubeLink || "",
        categoryId: post?.category._id,
        subcategoryId: post?.subcategory._id,
        category: post?.category,
        subcategory: post?.subcategory,
      });
    }
  }, [id, token, post, successMsg]);
  useEffect(() => {
    if (successMsg) {
      setForm({});
      setImgs([]);
      setSuccessMsg("");
      navigate("/posts");
    }
  }, [successMsg]);

  const handleUpdate = () => {
    updatePost(form, imgs, token);
  };
  return (
    <div className="container-fluid  pt-3   panel">
      <div
        className="row mt-3"
        style={{
          justifyContent: "center",
        }}
      >
        <div
          className="col-sm-12 col-md-12 col-lg-9 "
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            color: "#511",
          }}
        >
          <div className="card">
            <div className="card-body">Edit Blog</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-9 mt-2">
          <div className="card">
            <div className="card-title">
              <AddNav value={value} setValue={setValue} />
            </div>
            <div className="card-body overflow-auto">
              <FirstStep
                setForm={setForm}
                form={form}
                token={token}
                value={value}
              />
              <SecondStep setForm={setForm} form={form} value={value} />
              <ImageUpload
                successMsg={successMsg}
                imgs={imgs}
                setImgs={setImgs}
                value={value}
              />

              <div
                className="p-3"
                style={{
                  justifyContent: "flex-end",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  disabled={loading ? true : false}
                  className="btn btn-secondary"
                  onClick={() => handleUpdate()}
                >
                  {loading ? "Processing" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
