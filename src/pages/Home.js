import React, { useState, useEffect, useContext } from 'react'
import { HeaderCard, Chart } from '../components';
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth/AuthProvider';
const Home = () => {

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated, token, } = authContext;

  useEffect(() => {
    !isAuthenticated && navigate("/login")
  }, [isAuthenticated, token])

  return (
    <div className='container-fluid mx-2 pt-2  panel' style={{
      position: "relative"
    }} >
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xs-7">
          <div style={{ borderBottom: "2px solid #511", padding: "0.9rem 1.3rem", fontSize: "2rem", fontWeight: "bolder", color: "#511" }}>
            Dashboard
          </div>
        </div>
        <HeaderCard />
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className='row mt-4 pt-3' style={{ gap: "3rem", justifyContent: "flex-start", alignItems: "center", background: "#fff", borderRadius: "0.7em !important", marginLeft: "0.2rem", marginRight: "0.7rem" }}>
            <div className="col-md-5 col-lg-5 col-sm-12" style={{ background: "#fff" }}>
              <Chart />
            </div>
            <div className="col-md-5 col-lg-5 col-sm-12" style={{ background: "#fff" }} >
              <Chart />
            </div>
          </div>
        </div>
      </div>



    </div>


  );
}

export default Home