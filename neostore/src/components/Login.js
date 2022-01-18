import React, { useState } from "react";
import SocialButton from "./SocialButton";
import { login, getSocialUser } from "../config/Myservice";
import { useNavigate, Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  //////////////////////////////////////////////////////////
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const postRegis = (event) => {
    event.preventDefault();
    login(state).then((res) => {
      console.log(res.data);

      if (res.data.err == 0) {
        localStorage.setItem("_token", res.data.token);
        localStorage.setItem("userdetails", state.email);
        localStorage.setItem("password", state.password);
        console.log("email id:", state.email);
        const email = localStorage.getItem("userdetails");
        dispatch({
          type: "ADDUSER",
          payload: {
            email: email,
          },
        });
        alert(res.data.msg);
        navigate("/products");
      } else if (res.data.err == 1) {
        console.log(res.data);
        alert(res.data.msg);
      } else {
        alert("Connection Lost!");
      }
    });
  };
  ////////////////////////////////

  /////////////////////////////////

  const handleSocialLogin = (user) => {
    dispatch({
      type: "ADDUSER",
      payload: {
        email: user._profile.email,
      },
    });
    localStorage.setItem("userdetails", user._profile.email);
    // getSocialUser(user._profile.email).then((res) => {
    axios
      .post("http://localhost:9000/api/getSocialUser", {
        email: user._profile.email,
      })
      .then((res) => {
        if (res.data.err != 0) {
          setShow({ alert: true, message: res.data.msg });
        } else {
          sessionStorage.setItem("user", JSON.stringify(res.data.responseData));
          sessionStorage.setItem("token", JSON.stringify(res.data.token));
        }
      });
    alert("Welcome", user._profile.firstname);
    navigate("/products");
    console.log(user);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  /////////////////////////////////
  return (
    <div className="container-fluid p-5" id="mylog">
      <Row>
        <Col lg={6}>
          <center>
            <SocialButton
              provider="google"
              appId="592593185581-qk5enpiqver56v50kamu0nd3fvimunvu.apps.googleusercontent.com"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="btn btn-danger  text-center"
              style={{
                width: "50%",
                marginTop: "0px",
              }}
            >
              <i
                className="fa fa-google "
                style={{
                  fontSize: "30px",
                  marginRight: "15px",
                }}
              />
              Log in With Google
            </SocialButton>

            <br />

            <SocialButton
              provider="facebook"
              appId="2191160317726234"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="btn text-light text-center"
              style={{
                width: "50%",
                marginTop: "0px",
                backgroundColor: "#4267B2",
              }}
            >
              <i
                className="fa fa-facebook "
                style={{
                  fontSize: "30px",
                  marginRight: "15px",
                }}
              />
              Log in With Facebook
            </SocialButton>
            <br />
          </center>
        </Col>

        <Col className="col-md-6 ">
          <Form
            method="post"
            onSubmit={postRegis}
            id="form1"
            className="p-5 mt-2"
            style={{ backgroundColor: "#f2f3f4", marginLeft: "55px" }}
          >
            <h4 className="text-center  p-1" style={{ marginTop: "-20px" }}>
              LOGIN
            </h4>
            <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={handler}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="......."
                onChange={handler}
              />
            </Form.Group>
            <br />
            <div className="row">
              <Button
                type="submit"
                className="btn btn-warning col-md-2"
                id="formtab"
                style={{
                  backgroundColor: "#FFD700",
                  fontFamily: " 'Nunito Sans', sans-serif",
                }}
              >
                LOGIN
              </Button>
              <br />
              <br />
              <h7 className="col-md-12">
                If not registered,<Link to="/registration">click here</Link>
              </h7>
            </div>
            <br />
            <Link to="/forgotpassword" className="ms-4">
              Forgot Password?
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
