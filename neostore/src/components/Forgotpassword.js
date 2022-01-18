import React, { useEffect, useState } from "react";
import {
  forgotpassword,
  resetpassService,
  forgetService,
} from "../config/Myservice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Forgotpassword(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    flag: 0,
    otp: null,
    email: "",
    newpassword: "",
  });
  const [otp, setOtp] = useState(0);
  ///////////////////////////////////////////
  useEffect(() => {
    setOtp(state.otp);
  }, []);
  ///////////////////////////////////////////////////

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value }, () => {
      console.log(state);
    });
  };
  console.log(state);
  const [userdata, setUserdata] = useState([]);
  ////////////////////////////////////////////////////
  ///////////////////////////////////////////////

  const sendmailotp = () => {
    forgetService({ email: state.email }).then((res) => {
      setOtp(res.data);

      console.log(res.data);
      navigate("/forgotpassword");
    });
    state.flag = 1;
    alert("otp sent");
    navigate("/forgotpassword");
  };

  const resetpass = () => {
    if (state.otp !== null) {
      if (state.otp === otp) {
        setState({ ...state });
      } else alert("not match");
    }
    resetpassService({
      email: state.email,
      password: state.newpassword,
    }).then((res) => {
      alert(res.data.msg);
      navigate("/login");
    });
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
                        {state.flag === 0 ? (
                          <div className="m-b-25 mb-1 alert-danger">
                            <h4>Enter your email id we will send you OTP </h4>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className=" container col-sm-8 text-center">
                      <div className="card-block row">
                        <hr />

                        {state.flag === 1 ? (
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
                        ) : null}

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

                        {state.flag === 1 ? (
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
                        ) : null}

                        <hr />
                        {state.flag === 0 ? (
                          <Link to="/forgotpassword">
                            <div className="btn btn-dark" onClick={sendmailotp}>
                              Submit
                            </div>
                          </Link>
                        ) : null}

                        {state.flag === 1 ? (
                          <div className="btn btn-dark" onClick={resetpass}>
                            Update
                          </div>
                        ) : null}
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
