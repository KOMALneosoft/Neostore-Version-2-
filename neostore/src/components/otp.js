import React, { useEffect, useState } from "react";
import {
  forgotpassword,
  resetpassService,
  forgetService,
} from "../config/Myservice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Otp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp1, setOtp1] = useState();
  const [state, setState] = useState({
    email: "",
  });

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value }, () => {
      console.log(state);
    });
  };
  console.log(state);

  const sendmailotp = (e) => {
    e.preventDefault();
    forgetService({ email: state.email }).then((res) => {
      dispatch({
        type: "ADDOTP",
        payload: res.data,
      });

      setOtp1(res.data.otp);
      alert("otp sent");
      navigate("/forgotpassword");
      console.log(res.data);
    });
  };

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
                          <h4>Enter your email id we will send you OTP </h4>
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

                        <hr />

                        <Link to="/forgotpassword">
                          <div className="btn btn-dark" onClick={sendmailotp}>
                            Submit
                          </div>
                        </Link>
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

export default Otp;
