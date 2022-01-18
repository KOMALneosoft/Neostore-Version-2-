import React, { useEffect, useState } from "react";
import { getUsers } from "../config/Myservice";
import axios from "axios";

function Settings(props) {
  const email = localStorage.getItem("userdetails");
  console.log("email:", email);
  const [state, setState] = useState({
    oldpassword: "",
    newpassword: "",
  });
  ///////////////////////////////////////////

  ///////////////////////////////////////////////////

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value }, () => {
      console.log(state);
    });
  };
  console.log(state);
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

  const changepassword = (id) => {
    console.log(id);
    console.log(state.newpassword);
    axios
      .post("http://localhost:9000/api/changepassword", {
        id: id,
        oldpassword: state.oldpassword,
        newpassword: state.newpassword,
      })
      .then((res) => {
        console.log(cart);
      });
    alert("Password updated");
  };

  return (
    <div style={{ height: "500px" }} className="container-fluid" id="set">
      {userdata.map((val, index) =>
        val.email === email ? (
          <div className="page-content page-container" id="inset">
            <div className="m-3" style={{ width: "100%" }}>
              <div className="row container d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="card user-card-full container">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-12 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="m-b-25 mb-1 text-dark">
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
                        </div>
                      </div>
                      <div className=" container col-sm-12 text-center">
                        <div className="card-block row">
                          <h4
                            className="m-b-20 p-b-5 b-b-default f-w-600 col-sm-12"
                            style={{
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Change Your Password
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
                                Old Password:
                              </p>
                            </div>
                            <input
                              type="password"
                              name="oldpassword"
                              placeholder={val.password}
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
                          <a>
                            <div
                              className="btn btn-dark"
                              onClick={(props) => changepassword(val._id)}
                            >
                              Update Password
                            </div>
                          </a>
                          <ul className="social-link row list-unstyled m-t-40 m-b-10 h3 mt-1">
                            <li className="col-md-9"></li>
                            <li className="col-md-1">
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
                            <li className="col-md-1">
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
                            <li className="col-md-1">
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
        ) : null
      )}
    </div>
  );
}

export default Settings;
