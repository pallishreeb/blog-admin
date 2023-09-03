import { createContext, useState, useEffect } from "react";
import { userLogin, getUser, getUsers, removeUser } from '../../apis/user'

export const AuthContext = createContext();

const AuthProvider = props => {
    let authToken = JSON.parse(localStorage.getItem("token"))
    let userInfo = localStorage.getItem("user")
    const initialState = {
        token: authToken || null,
        isAuthenticated: authToken ? true : false,
        loading: authToken ? true : false,

    }
    const [info, setInfo] = useState(initialState);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([])
    const [error, setError] = useState("");
    useEffect(() => {
        !info.token &&
            setInfo(info => ({
                ...info,
                token: authToken,
                isAuthenticated: authToken ? true : false,
                loading: authToken ? true : false,
            }))
    }, [authToken, info.token])

    useEffect(() => {
        if (!userInfo) {
            info.token && loadUser();
        } else {
            setUser(userInfo)
        }
    }, [user, info.token])




    // Load User
    const loadUser = async () => {

        try {

            const res = await getUser(info.token)
            console.log("login response", res.data.response)

            const userData = JSON.stringify(res.data.response)

            setUser(userData);
            localStorage.setItem("user", userData)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    };
    // Login User
    const login = async (formData) => {

        try {
            const res = await userLogin(formData)
            setInfo({
                token: res.data.token,
                isAuthenticated: true,
                loading: false
            })
            localStorage.setItem("token", JSON.stringify(res.data.token));
            info.token && loadUser()
        } catch (error) {
            console.log(error)
            setError(error.response.data.msg);


        }
    };
    // get all users
    const getAllUsers = (token) => {
        getUsers(token)
            .then(res => {
                //    console.log(res.data.response);
                setUsers(res.data.response)
            })
            .catch(err => {
                console.log(err);
            })

    }
    // delete a user
    const deleteUser = (id, token) => {
        try {
            removeUser(id, token);
        } catch (error) {
            console.log(error)
        }

    }
    //Logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setInfo(initialState);
        setUser(null);
        setError("");
    };
    // Clear Errors
    const clearErrors = () => setError("");


    return (
        <AuthContext.Provider
            value={{
                token: info.token,
                isAuthenticated: info.isAuthenticated,
                loading: info.loading,
                user: user,
                error: error,
                loadUser,
                login,
                logout,
                clearErrors,
                getAllUsers,
                users,
                setUsers,
                deleteUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider


