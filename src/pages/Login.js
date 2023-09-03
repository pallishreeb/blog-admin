import React,{useState,useEffect,useContext} from 'react'
import { Avatar,} from '@mui/material'
import {Person,RemoveRedEye} from "@mui/icons-material"
import{ AuthContext }from '../context/auth/AuthProvider';
import { useNavigate } from "react-router-dom"
const Login = () => {
  const [type, setType] = useState(false);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState(error)
  const { email, password } = user;


  useEffect(() => {
    isAuthenticated && navigate("/");
    error && setTimeout(() => {
      clearErrors()
    }, 3000);
    errorMsg && setTimeout(() => {
      setErrorMsg(null)
    }, 3000);
   
  }, [isAuthenticated,  error, errorMsg])

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit function called')
    if (email === "" || password === "") {
      setErrorMsg("please fill in all fields")
    } else {
      login({
        email, password
      });
      navigate("/")
    }
  };
  return (

  
   <div className='login'>
     
      <div className='form' >
        <h1 className='heading-login'>Sign In</h1>
          <Avatar src='https://cdn-icons-png.flaticon.com/512/295/295128.png'
            sx={{ width: 90, height: 90 }}

          />
          <div className='form-group mt-4'>
            <input 
            type={"text"} 
            name="email"
            placeholder="Email..." 
            value={email}
            onChange={(e) => onChange(e)}
            />
            <Person />
          </div>
          <div className='form-group mt-4'>
            <input 
            type={ type?"password":"text"} 
            placeholder="Password..." 
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            />
       
            <RemoveRedEye onClick={() => setType(!type)} />
         
            
          </div>
        <button type='submit' className='btn-login' onClick={(e) => onSubmit(e)}>Sign In</button>
     
    </div>
        
    </div> 


  )
}

export default Login