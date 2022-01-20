import React, { useEffect, useState } from "react";
import { resetpassService } from "../config/Myservice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Forgotpassword(props) {
  const navigate = useNavigate();
  const newemail = useSelector((state) => state.otp);

  console.log("new:", newemail);

  const [state, setState] = useState({
    flag: 0,
    otp: null,
    otp1: newemail[0].otp,
    email: newemail[0].email,
    newpassword: "",
  });

  ///////////////////////////////////////////

  ///////////////////////////////////////////////////

  const handler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState({ ...state, [name]: value }, () => {
      console.log(state);
    });
  };
  console.log(state);

  ////////////////////////////////////////////////////
  ///////////////////////////////////////////////

  const resetpass = (e) => {
    e.preventDefault();
    if (state.otp !== null) {
      if (state.otp == state.otp1) {
        setState({ ...state });
        console.log("otp matched");
        resetpassService({
          email: state.email,
          password: state.newpassword,
        }).then((res) => {
          alert(res.data.msg);
        });
      } else alert("not match");
    }
    navigate("/login");
  };
  /////////////////////////////////////////////////
  //////////////////////////////////////////////

  return (
    <div id="forget">
      <div style={{ height: "500px" }} className="container-fluid">
        <div className="page-content page-container">
          <div className="" style={{ width: "100%" }}>
            <div className="row container d-flex justify-content-center">
              <div className="col-md-6">
                <div className="card user-card-full container m-5 p-3">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-12 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25 mb-1 alert-danger">
                          <h4>Enter OTP </h4>
                        </div>
                      </div>
                    </div>
                    <div className=" container col-sm-8 text-center">
                      <div className="card-block row">
                        <hr />

                        <div className="row">
                          <div className="col-sm-5">
                            <p
                              className=""
                              style={{
                                fontFamily: "cursive",
                                fontWeight: "bold",
                              }}
                            >
                              OTP:
                            </p>
                          </div>
                          <input
                            type="password"
                            name="otp"
                            onChange={handler}
                            className="col-sm-6"
                            style={{ borderRadius: "6%", height: "30px" }}
                          />
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <p
                              className=""
                              style={{
                                fontFamily: "cursive",
                                fontWeight: "bold",
                              }}
                            >
                              Email:
                            </p>
                          </div>
                          <input
                            type="email"
                            name="email"
                            onChange={handler}
                            className="col-sm-6"
                            style={{ borderRadius: "6%", height: "30px" }}
                          />
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <p
                              className=""
                              style={{
                                fontFamily: "cursive",
                                fontWeight: "bold",
                              }}
                            >
                              New Password:
                            </p>
                          </div>
                          <input
                            type="text"
                            onChange={handler}
                            name="newpassword"
                            className="col-sm-6"
                            style={{ borderRadius: "6%", height: "30px" }}
                          />
                        </div>

                        <hr />

                        <div className="btn btn-dark" onClick={resetpass}>
                          Update
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
