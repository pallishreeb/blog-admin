/** @format */

import { createContext, useState, useEffect } from "react";
import {
    getCategories,
    getSubCategories,
    addSubCategory,
    addCategory,
    getAllSubCategories,
    editCategory,
    editSubCategory,
    deleteCategory,
    deleteSubCategory,
} from "../apis/category";

export const CategoryContext = createContext();

const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [subcategory, setSubcategory] = useState(null);
    const [category, setCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    const [errorMsg, setErrorMsg] = useState("");

    // // Load User
    const getAllCategories = async (token) => {
        try {
            const res = await getCategories(token);
            setCategories(res?.data?.response);
            // console.log(categories);
        } catch (error) {
            console.log(error);
        }
    };

    // create Category
    const createCategory = (form, token) => {
        try {
            addCategory(token, form);
            setCategory({});
            getAllCategories(token);
        } catch (error) {
            console.log(error);
        }
    };
    // update category
    const updateCategory = (form, token) => {
        try {
            const res = editCategory(token, form);
            console.log(res.data);
            setCategory({});
            getAllCategories(token);
        } catch (error) {
            console.log(error);
        }
    };
    // get category by Id
    //    const getCategory = (id , token ) =>{
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    //    }

    // delete category
    const removeCategory = (id, token) => {
        try {
            const res = deleteCategory(id, token);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // get subcategories
    const allSubcategores = (token) => {
        getAllSubCategories(token)
            .then((res) => {
                setSubcategories(res.data.response);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // create subcategories
    const createSubcategory = (form, token) => {
        try {
            const res = addSubCategory(form, token);
            console.log(res.data);
            setSubcategory({});
            allSubcategores(token);
        } catch (error) {
            console.log(error);
        }
    };
    // update subcategory
    const updateSubcategory = (form, token) => {
        try {
            const res = editSubCategory(form, token);
            console.log(res.data);
            setSubcategory({});
            allSubcategores(token);
        } catch (error) {
            console.log(error);
        }
    };
    // get subcategory by categoryId
    const getSubcategoryByCategoryId = (id, token) => {
        try {
            const res = getSubCategories(id, token);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    // delete subcategory
    const removeSubcategory = (id, token) => {
        try {
            const res = deleteSubCategory(id, token);
            console.log(res.data.log);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <CategoryContext.Provider
            value={{
                getAllCategories,
                createCategory,
                updateCategory,
                removeCategory,
                removeSubcategory,
                getSubcategoryByCategoryId,
                updateSubcategory,
                createSubcategory,
                allSubcategores,
                categories,
                subcategories,
                setCategory,
                category,
                setSubcategory,
                subcategory,
                setSubcategories,
                setCategories,
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
