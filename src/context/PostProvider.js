/** @format */

import { createContext, useState, useEffect } from "react";
import {
    createPost,
    editPost,
    getPost,
    getPosts,
    deletePost,
} from "../apis/post";
import axios from "axios";
export const PostContext = createContext();

const PostProvider = (props) => {
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //     errorMsg && setTimeout(() => {
        //       setErrorMsg("")
        //   },5000);
        // successMsg && setTimeout(() => {
        //    setSuccessMsg("")
        // }, 6000);
    }, [errorMsg, successMsg]);

    // // Load User
    const getSinglePost = (id, token) => {
        getPost(id, token)
            .then((res) => {
                //   console.log("single Post", res.data.response)
                setPost(res.data.response);
                //   console.log(post);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Load User
    const getAllPosts = async (token) => {
        try {
            const res = await getPosts(token);
            setPosts(res.data.response);
        } catch (error) {
            console.log(error);
        }
    };

    const submitPost = (form, imgs, token) => {
        setLoading(true);
        try {
            let arr = [];
            let {
                title,
                text,
                websitesLink,
                youtubeLink,
                brand,
                model,
                categoryId,
                subcategoryId,
            } = form;

            if (imgs.length > 0) {
                imgs.forEach((image) => {
                    const formData = new FormData();
                    formData.append("file", image);
                    formData.append("upload_preset", "socila_media");
                    axios
                        .post(
                            `https://api.cloudinary.com/v1_1/da01buahx/image/upload`,
                            formData
                        )
                        .then((response) => {
                            arr.push(response.data.secure_url);
                            if (arr.length === imgs.length) {
                                createPost(token, {
                                    title,
                                    text,
                                    websitesLink,
                                    youtubeLink,
                                    brand,
                                    model,
                                    categoryId,
                                    subcategoryId,
                                    images: arr,
                                }).then((res) => {
                                    setSuccessMsg("Post Added Successfully");
                                    setLoading(false);
                                });
                            }
                        });
                });
            } else {
                createPost(token, {
                    title,
                    text,
                    websitesLink,
                    youtubeLink,
                    brand,
                    model,
                    categoryId,
                    subcategoryId,
                });
                setSuccessMsg("Post Added Successfully");
                setLoading(false);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMsg("Submit Post failed");
        }
    };
    const updatePost = (form, imgs, token) => {
        setLoading(true);
        try {
            let arr = [];
            let {
                title,
                text,
                websitesLink,
                youtubeLink,
                brand,
                model,
                categoryId,
                subcategoryId,
                _id,
            } = form;

            if (imgs.length > 0) {
                imgs.forEach((image) => {
                    const formData = new FormData();
                    formData.append("file", image);
                    formData.append("upload_preset", "socila_media");
                    axios
                        .post(
                            `https://api.cloudinary.com/v1_1/da01buahx/image/upload`,
                            formData
                        )
                        .then((response) => {
                            arr.push(response.data.secure_url);
                            if (arr.length === imgs.length) {
                                editPost(_id, token, {
                                    title,
                                    text,
                                    websitesLink,
                                    youtubeLink,
                                    brand,
                                    model,
                                    categoryId,
                                    subcategoryId,
                                    images: arr,
                                }).then((res) => {
                                    setLoading(false);
                                    setSuccessMsg("Post Updated Successfully");

                                    console.log(res);
                                    console.log(successMsg);
                                });
                            }
                        });
                });
            } else {
                editPost(_id, token, {
                    title,
                    text,
                    websitesLink,
                    youtubeLink,
                    brand,
                    model,
                    categoryId,
                    subcategoryId,
                    images: imgs,
                }).then((res) => {
                    setLoading(false);
                    setSuccessMsg("Post Updated Successfully");
                    console.log(res);
                    console.log(successMsg);
                });
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMsg("Update Post failed");
        }
    };
    const deleteSinglePost = (token, id) => {
        deletePost(token, id)
            .then((res) => {
                // console.log(res);
                setPosts(posts.filter((item) => item._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <PostContext.Provider
            value={{
                loading,
                errorMsg,
                setErrorMsg,
                successMsg,
                posts,
                submitPost,
                getAllPosts,
                deleteSinglePost,
                getSinglePost,
                post,
                setPosts,
                updatePost,
                setSuccessMsg,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
};

export default PostProvider;
