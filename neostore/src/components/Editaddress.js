import React, { useEffect, useState } from "react";
import { getUsers, getAddress } from "../config/Myservice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Editaddress(props) {
  const navigate = useNavigate();
  const email = localStorage.getItem("userdetails");
  console.log("email:", email);
  const [state, setState] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
  });
  const editid = localStorage.getItem("editaddressid:");
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
  const [addressdata, setAddressdata] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setUserdata(res.data.data);
      }
    });
    getAddress().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setAddressdata(res.data.data);
      }
    });
  }, []);

  const editme = (id) => {
    axios
      .post("http://localhost:9000/api/editaddress", {
        id: id,
        street: state.street,
        city: state.city,
        state: state.state,
        country: state.country,
      })
      .then((res) => {
        console.log(email);
      });
    alert("address updated");
    navigate("/address");
  };

  return (
    <div className="container-fluid " id="set">
      {userdata.map((val, index) =>
        val.email === email ? (
          <div className="page-content page-container ">
            <div className="" style={{ width: "100%" }}>
              <div className="row container d-flex justify-content-center">
                <div className="col-md-6">
                  <div className="card user-card-full container m-5">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-12 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="col-md-12">
                            <div className="m-b-25 mb-1 col-md-12 text-dark">
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
                                  style={{ height: "100px" }}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {addressdata !== []
                          ? addressdata.map((addr, index) =>
                              editid == addr._id ? (
                                <div className="col-md-12 ">
                                  <h4
                                    className="col-md-12 text-center"
                                    style={{
                                      fontFamily: "sans-serif",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Edit Your Address
                                  </h4>
                                  <div className="row text-center justify-content-center">
                                    <a className="col-md-12 text-center m-4 p-2">
                                      <form className="col-md-12 text-center">
                                        <div className="row ">
                                          <div className="col-sm-5">
                                            <p
                                              className=""
                                              style={{
                                                fontFamily: "cursive",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              Street:
                                            </p>
                                          </div>
                                          <input
                                            type="text"
                                            name="street"
                                            placeholder={addr.street}
                                            onChange={handler}
                                            className="col-sm-3"
                                            style={{
                                              borderRadius: "6%",
                                              height: "30px",
                                            }}
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
                                              City:
                                            </p>
                                          </div>
                                          <input
                                            type="text"
                                            name="city"
                                            placeholder={addr.city}
                                            onChange={handler}
                                            className="col-sm-3"
                                            style={{
                                              borderRadius: "6%",
                                              height: "30px",
                                            }}
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
                                              State:
                                            </p>
                                          </div>
                                          <input
                                            type="text"
                                            name="state"
                                            placeholder={addr.state}
                                            onChange={handler}
                                            className="col-sm-3"
                                            style={{
                                              borderRadius: "6%",
                                              height: "30px",
                                            }}
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
                                              Country:
                                            </p>
                                          </div>
                                          <input
                                            type="text"
                                            placeholder={addr.country}
                                            name="country"
                                            onChange={handler}
                                            className="col-sm-3"
                                            style={{
                                              borderRadius: "6%",
                                              height: "30px",
                                            }}
                                          />
                                        </div>

                                        <hr />

                                        <div
                                          className="btn btn-dark"
                                          onClick={(props) => editme(addr._id)}
                                        >
                                          Update
                                        </div>
                                      </form>
                                    </a>
                                  </div>
                                </div>
                              ) : null
                            )
                          : null}
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

export default Editaddress;
