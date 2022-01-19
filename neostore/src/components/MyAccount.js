import React, { useEffect, useState } from "react";
import { getUsers } from "../config/Myservice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MyAccount() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userdetails");
  console.log("email:", email);
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setUserdata(res.data.data);
      }
    });
  }, []);
  /////////////////////////////////////
  //////////////////////////////////////
  return (
    <div style={{ height: "440px" }} className="container-fluid" id="acc">
      {userdata.map((val, index) =>
        val.email === email ? (
          <div className="page-content page-container" id="inacc">
            <div className="m-3" style={{ width: "100%" }}>
              <div className="row container d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-5 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="m-b-25 mb-4 text-dark">
                            {val.gender !== "female" ? (
                              <img
                                src="https://img.icons8.com/bubbles/100/000000/user.png"
                                className="img-radius"
                                alt="User-Profile-Image"
                              />
                            ) : (
                              <img
                                src="https://thumbs.dreamstime.com/b/avatar-vector-icon-young-white-girl-dreaming-looking-up-hand-drawn-cartoon-illustration-profile-user-interface-color-165830115.jpg"
                                className="img-radius"
                                alt="User-Profile-Image"
                                style={{ height: "150px" }}
                              />
                            )}
                          </div>

                          <h5
                            className="container text-dark mb-4"
                            style={{
                              textTransform: "capitalize",
                              fontFamily: "cursive",
                            }}
                          >
                            {val.fname} {val.lname}
                          </h5>
                          <Link to="/editprofile">
                            <i
                              className="fa fa-edit  col-sm-6"
                              style={{
                                fontSize: "30px",
                                alignContent: "flex-end",
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div className="card-block row">
                          <h4
                            className="m-b-20 p-b-5 b-b-default f-w-600 col-sm-8"
                            style={{
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Information
                          </h4>

                          <hr />
                          <div className="row">
                            <div className="row">
                              <p
                                className="col-sm-4 "
                                style={{
                                  fontFamily: "cursive",
                                  fontWeight: "bold",
                                }}
                              >
                                Email:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.email}
                              </h6>
                            </div>
                            <br />
                            <div className="row">
                              <p
                                className="col-sm-4 m-b-10 f-w-600 "
                                style={{
                                  fontFamily: "cursive",
                                  fontWeight: "bold",
                                }}
                              >
                                Age:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.age}
                              </h6>
                            </div>
                            <br />
                            <div className="row">
                              <p
                                className="col-sm-4 m-b-10 f-w-600"
                                style={{
                                  fontFamily: "cursive",
                                  fontWeight: "bold",
                                }}
                              >
                                Gender:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.gender}
                              </h6>
                            </div>
                            <br />
                            <div className="row">
                              <p
                                className="col-sm-4 m-b-10 f-w-600"
                                style={{
                                  fontFamily: "cursive",
                                  fontWeight: "bold",
                                }}
                              >
                                Phone:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.mobile}
                              </h6>
                            </div>
                            <div className="row p-3">
                              <Link to="/address">
                                <button className="btn btn-outline-dark btn-sm col-md-12">
                                  See Address
                                </button>
                              </Link>
                            </div>

                            <hr />
                            <ul className="social-link row list-unstyled m-t-40 m-b-10 h3 mt-1">
                              <li className="col-md-5"></li>
                              <li className="col-md-2">
                                <a
                                  href="#!"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title=""
                                  data-original-title="facebook"
                                  data-abc="true"
                                >
                                  <i
                                    className="fa fa-facebook text-success"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </li>
                              <li className="col-md-2">
                                <a
                                  href="#!"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title=""
                                  data-original-title="twitter"
                                  data-abc="true"
                                >
                                  <i
                                    className="fa fa-twitter"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </li>
                              <li className="col-md-2">
                                <a
                                  href="#!"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title=""
                                  data-original-title="instagram"
                                  data-abc="true"
                                >
                                  <i
                                    className="fa fa-google text-danger"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </li>
                            </ul>
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
        ) : null
      )}
    </div>
  );
}

export default MyAccount;
