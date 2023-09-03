/** @format */

import React, { useState, useEffect, useContext } from "react";
// import { Snackbar, Alert } from "@mui/material";
import { AddNav, ImageUpload, FirstStep, SecondStep } from "../components";
import { AuthContext } from "../context/auth/AuthProvider";
import { PostContext } from "../context/PostProvider";
import { useNavigate } from "react-router-dom";
function AddPost() {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  const postContext = useContext(PostContext);
  const {
    submitPost,
    successMsg,
    errorMsg,
    setErrorMsg,
    setSuccessMsg,
    loading,
  } = postContext;
  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, token]);

  const [value, setValue] = useState(0);
  const [form, setForm] = useState({});
  const [imgs, setImgs] = useState([]);
  const prevStep = () => {
    if (value === 1 || value === 2) {
      setValue(value - 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitPost(form, imgs, token);
  };

  useEffect(() => {
    if (successMsg) {
      setForm({});
      setImgs([]);
      setSuccessMsg("");
      navigate("/posts");
    }
  }, [successMsg]);

  const nextStep = () => {
    if (value === 0) {
      if (form?.title && form?.categoryId && form?.text) {
        setValue(value + 1);
      } else {
        alert("Please fill all the fields with * mark");
      }
    } else if (value === 1) {
      setValue(value + 1);
    }
  };

  return (
    <div className="container-fluid  pt-3   panel">
      {/* {
        successMsg && <Snackbar anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
          open={"open"} autoHideDuration={6000} onClose={() => setSuccessMsg("")}>
          <Alert severity="error" onClose={() => setSuccessMsg("")}>
            {successMsg}
          </Alert>
        </Snackbar> 
    } */}

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
            <div className="card-body">Create New Blog</div>
          </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-9 mt-2">
          <div className="card">
            <div className="card-title">
              <AddNav value={value} />
            </div>

            <div className="card-body overflow-auto">
              <FirstStep
                setForm={setForm}
                form={form}
                token={token}
                value={value}
              />
              <SecondStep
                setForm={setForm}
                form={form}
                token={token}
                value={value}
              />
              <ImageUpload
                setForm={setForm}
                form={form}
                setImgs={setImgs}
                imgs={imgs}
                token={token}
                value={value}
                successMsg={successMsg}
              />
              <div
                className="p-3"
                style={{
                  justifyContent: "flex-end",
                  display: "flex",
                  flexDirection: "row",
                  gap: "2rem",
                }}
              >
                {value !== 0 && (
                  <button
                    className="btn btn-secondary"
                    disabled={loading ? true : false}
                    onClick={() => prevStep()}
                  >
                    Back
                  </button>
                )}

                {value === 0 || value === 1 ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => nextStep()}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    disabled={loading ? true : false}
                    className="btn btn-secondary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? "Proccessing" : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
