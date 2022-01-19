import React, { useEffect, useState } from "react";
import { getUsers, getAddress } from "../config/Myservice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Address(props) {
  const navigate = useNavigate();
  const email = localStorage.getItem("userdetails");
  console.log("email:", email);
  const [state, setState] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
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

  const addnew = (id) => {
    console.log(id);
    console.log(state);
    axios
      .post("http://localhost:9000/api/addaddress", {
        userid: id,
        street: state.street,
        city: state.city,
        state: state.state,
        country: state.country,
      })
      .then((res) => {
        console.log(state);
      });
    alert("Address added");
    navigate("/myacc");
  };

  const edit = (id) => {
    localStorage.setItem("editaddressid:", id);
    navigate("/editaddress");
  };

  const deleteadd = (addid) => {
    console.log(addid);

    axios
      .post("http://localhost:9000/api/deleteaddress", {
        id: addid,
      })
      .then((res) => {
        console.log(cart);
      });
    alert("Address deleted");
    navigate("/myacc");
  };

  return (
<<<<<<< HEAD
    <div className="container-fluid" id="addr">
=======
    <div className="container-fluid " id="addr">
>>>>>>> 1162676ef1674188161bb320b576fe48c435fbaa
      {userdata.map((val, index) =>
        val.email === email ? (
          <div className="page-content page-container ">
            <div className="row" style={{ width: "100%" }}>
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
                          ? addressdata.map((addr, index) => (
                              <div className=" container col-md-12 text-center">
                                <div className="card m-2">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {val.fname} {val.lname}
                                    </h5>
                                    <h6 className="card-title">
                                      <b>Street :</b> {addr.street}
                                    </h6>
                                    <h6 className="card-title">
                                      <b>City :</b> {addr.city}
                                    </h6>
                                    <h6 className="card-title">
                                      <b>State :</b> {addr.state}
                                    </h6>
                                    <h6 className="card-title">
                                      <b>Country :</b> {addr.country}
                                    </h6>

                                    <div className="text-center row">
                                      <center>
                                        {" "}
                                        <button
                                          type="button"
                                          className="btn btn-dark m-1 ms-3 col-md-5"
                                          onClick={(props) =>
                                            deleteadd(addr._id)
                                          }
                                        >
                                          <Link
                                            to="/address"
                                            style={{
                                              color: "white",
                                              textDecoration: "none",
                                            }}
                                          >
                                            Delete
                                          </Link>
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-dark m-1 col-md-5"
                                          onClick={(props) => edit(addr._id)}
                                        >
                                          Edit
                                        </button>
                                      </center>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : null}
                        <div className="col-md-12 ">
                          <h4
                            className="col-md-12 text-center"
                            style={{
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Add New address
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
                                  className="btn btn-danger"
                                  onClick={(props) => addnew(val._id)}
                                >
                                  <Link
                                    to="/address"
                                    style={{
                                      color: "white",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {" "}
                                    Add +
                                  </Link>
                                </div>
                              </form>
                            </a>
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
        ) : null
      )}
    </div>
  );
}

export default Address;
