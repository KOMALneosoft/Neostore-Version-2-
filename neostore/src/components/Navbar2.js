import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function Navbar2() {
  const dispatch = useDispatch();
  let userme = useSelector((state) => state.users);
  let count = useSelector((state) => state.count);
  console.log("Email logged in:", userme);

  const logout = (e) => {
    dispatch({
      type: "REMOVEUSER",
    });

    localStorage.setItem("userdetails", "");
    localStorage.setItem("fname", "");
    localStorage.setItem("lname", "");
    localStorage.setItem("age", "");
    localStorage.setItem("gender", "");
    localStorage.setItem("mobile", "");
    localStorage.setItem("password", "");
  };

  return (
    <div className="">
      <nav className="navbar  bg-dark navbar-expand-sm text-light">
        <Link className="navbar-brand  col-md-3 text-light" to="/">
          <h3 className="ms-3">
            Neo
            <font color="red" weight="bold">
              STORE
            </font>
          </h3>
        </Link>
        <button
          className="navbar-toggler alert-danger m-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuItems"
          aria-controls="menuItems"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-md-7" id="menuItems">
          <ul className="navbar-nav mr-3 ">
            {userme.length > 0 ? (
              <li className="nav-item active">
                <Link to="/" className="nav-link text-light">
                  Home
                </Link>
              </li>
            ) : null}
            {userme.length > 0 ? (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/products">
                  Products
                </Link>
              </li>
            ) : null}

            {userme.length > 0 ? (
              <li className="nav-item  col-md-6">
                <Link
                  className="nav-link text-light"
                  to="/myorder"
                  role="button"
                  style={{}}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Order
                </Link>
              </li>
            ) : null}

            <li className="m-1 text-dark col-md-11" style={{ height: "40px" }}>
              <h1>neostore</h1>
            </li>

            {userme.length > 0 ? (
              <li className="col-md-2 m-1">
                <Dropdown
                  className="nav-item dropdown bg-light "
                  style={{ borderRadius: "10%" }}
                >
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <i className="fa fa-user 2x text-dark h7"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        to="/myacc"
                        style={{
                          color: "blue",
                          textDecoration: "none",
                        }}
                      >
                        My profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        to="/editprofile"
                        style={{
                          color: "blue",
                          textDecoration: "none",
                        }}
                      >
                        Edit Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        to="/settings"
                        style={{
                          color: "blue",
                          textDecoration: "none",
                        }}
                      >
                        Change Password
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        to="/address"
                        style={{
                          color: "blue",
                          textDecoration: "none",
                        }}
                      >
                        Add Address
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        to="/login"
                        className="btn btn-outline-dark"
                        onClick={(e) => logout(e)}
                      >
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : null}
            {userme.length == 0 ? (
              <li className="col-md-10 text-dark">Hello</li>
            ) : null}
            {userme.length == 0 ? (
              <li className="col-md-10 text-dark">Hello</li>
            ) : null}
            {userme.length == 0 ? (
              <li classname="col-md-2">
                <a href="/login" style={{}}>
                  <button className="btn  m-1  btn-outline-warning">
                    Login
                  </button>
                </a>
              </li>
            ) : null}
            {userme.length > 0 ? (
              <li className="col-md-3 m-1">
                <Link to="/cartitem">
                  <button className="btn btn-outline-light">
                    <i className="fa fa-shopping-cart  2x"></i> cart : {count}
                  </button>
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar2;
