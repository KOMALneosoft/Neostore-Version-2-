import React, { useEffect, useState } from "react";
import { editUsers, getUsers } from "../config/Myservice";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

function Editprofile(props) {
  const email = localStorage.getItem("userdetails");
  console.log("email:", email);
  const [state, setState] = useState({
    fname: "",
    lname: "",
    gender: "",
    age: "",
    mobile: "",
    address: "",
    email: email,
  });
  ///////////////////////////////////////////
  const [userdata, setUserdata] = useState([]);
  ///////////////////////////////////////////////////

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value }, () => {
      console.log(state);
    });
  };
  console.log(state);
  ////////////////////////////////////////////////////
  useEffect(() => {
    getUsers().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setUserdata(res.data.data);
      }
    });
  }, []);

  const editme = (id) => {
    axios
      .post("http://localhost:9000/api/edituser", {
        id: id,

        fname: state.fname,
        lname: state.lname,
        age: state.age,
        gender: state.gender,
        phone: state.mobile,
      })
      .then((res) => {
        console.log(email);
      });
    alert("profile edited");
  };

  return (
    <div style={{}} className="container-fluid p-4" id="edit">
      {userdata.map((val, index) =>
        val.email === email ? (
          <div className="row">
            <center>
              <div className="container mt-5" style={{ width: "80%" }}>
                <div className="row  justify-content-center">
                  <div className="col-md-12">
                    <div className="card user-card-full" id="inedit2">
                      <div className="row p-1">
                        <div className="col-sm-4 bg-c-lite-green user-profile ">
                          <div className="card-block text-center text-white ">
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

                            <Link to="/myacc">
                              <div
                                className="btn btn-dark"
                                onClick={(props) => editme(val._id)}
                              >
                                Update
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm-8 p-3">
                          <div className="card-block row">
                            <h4
                              className="m-b-20 p-b-5 b-b-default f-w-600 col-sm-7"
                              style={{
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              Information
                            </h4>

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
                                  First name:
                                </p>
                              </div>
                              <input
                                type="text"
                                name="fname"
                                onChange={handler}
                                placeholder={val.fname}
                                className="col-sm-5 ms-2"
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
                                  Last name:
                                </p>
                              </div>
                              <input
                                type="text"
                                name="lname"
                                onChange={handler}
                                placeholder={val.lname}
                                className="col-sm-5 ms-2"
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
                                  Age:
                                </p>
                              </div>
                              <input
                                type="number"
                                name="age"
                                onChange={handler}
                                placeholder={val.age}
                                className="col-sm-5 ms-2"
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
                                  Gender:
                                </p>
                              </div>
                              <input
                                type="text"
                                name="gender"
                                onChange={handler}
                                placeholder={val.gender}
                                className="col-sm-5 ms-2"
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
                                  Phone:
                                </p>
                              </div>
                              <input
                                type="text"
                                name="mobile"
                                onChange={handler}
                                placeholder={val.mobile}
                                className="col-sm-5 ms-2"
                                style={{ borderRadius: "6%", height: "30px" }}
                              />
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
            </center>
          </div>
        ) : null
      )}
    </div>
  );
}

export default Editprofile;
