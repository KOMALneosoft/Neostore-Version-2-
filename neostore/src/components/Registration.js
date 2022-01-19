import React, { useState } from "react";
import { addUser } from "../config/Myservice";
import { Form, Row, Col, Button } from "react-bootstrap";

function Registration() {
  const regForName = RegExp(/^[A-Za-z]/);
  const regForEve = RegExp(/^(?!^ +$)^.+$/);
  const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const regForMobile = RegExp(/^ [1-9] {1} [0-9] {9}$/);

  const [state, setState] = useState({
    fname: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    errors: {
      fname: "",
      mobile: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    err: {
      fname: "",
      mobile: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  //////////////////////////////////////////////////////////
  /////////////////////////////////////
  const handler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    let err = state.err;
    switch (name) {
      case "fname":
        errors.fname = regForName.test(value) ? "" : "Enter Valid first Name";
        if (errors.fname !== "") {
          err.fname = "error";
        } else {
          err.fname = "";
        }
        break;
      case "mobile":
        errors.mobile = regForMobile.test(value)
          ? ""
          : "Enter Valid Mobile Number";
        if (errors.mobile !== "") {
          err.mobile = "error";
        } else {
          err.mobile = "";
        }
        break;

      case "email":
        errors.email = regForEmail.test(value) ? "" : "Enter Valid Email";
        if (errors.email !== "") {
          err.email = "error";
        } else {
          err.email = "";
        }
        break;
      case "password":
        errors.password = regForEve.test(value) ? "" : "Enter Password";
        if (errors.password !== "") {
          err.password = "error";
        } else {
          err.password = "";
        }
        break;
      case "confirm_password":
        errors.confirm_password =
          state.password === value
            ? ""
            : "Password and Confirm Password does not match";
        if (errors.confirm_password !== "") {
          err.confirm_password = "error";
        } else {
          err.fname = "";
        }
        break;
    }
    setState({ err, errors, [name]: value });
  };

  ////////////////////////////////////////////
  const formSubmit = (event) => {
    event.preventDefault();

    if (validate(state.errors)) {
      if (state.email !== "" && state.password !== "" && state.fname !== "") {
        if (add()) {
          alert("Details added successfully !!");
          console.log(state);
        } else {
          alert("something went wrong");
        }
      } else {
        alert("Failed to Register");
      }
    } else {
      alert("Please Enter Valid Details");
    }
  };
  //////////////////////////////////////
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  ////////////////////////////////////////////////////////////////////////
  const add = async (event) => {
    // const URL = "http://localhost:7000/api/adduser";
    // axios
    //   .post(URL, {
    addUser({
      name: state.fname,
      email: state.email,
      password: state.password,
    }).catch((err) => {
      console.log(err);
    });
    console.log(state);
  };
  return (
    <div className="container-fluid p-5" id="mylog">
      <Row>
        <Col lg={6}>
          <center>
            <Button
              className="text-center"
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
              Login with Facebook
            </Button>
            <br />

            <Button
              className="text-center"
              variant="danger"
              style={{ width: "50%", marginTop: "20px" }}
            >
              <i
                className="fa fa-google "
                style={{ fontSize: "30px", marginRight: "15px" }}
              />
              Login with Google
            </Button>
            <br />
            <Button
              className="text-center"
              style={{
                width: "50%",
                marginTop: "20px",
                backgroundColor: "EA4335",
              }}
            >
              <i
                className="fa fa-twitter "
                style={{ fontSize: "30px", marginRight: "15px" }}
              />
              Login with Twitter
            </Button>
          </center>
        </Col>

        <Col className="col-md-6 ">
          <Form
            id="form1"
            className="p-5 mt-2"
            onSubmit={formSubmit}
            method="post"
            style={{ backgroundColor: "#f2f3f4", marginLeft: "55px" }}
          >
            <h4 className="text-center  p-1" style={{ marginTop: "-20px" }}>
              REGISTRATION
            </h4>
            <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                placeholder="first name   last name"
                onChange={handler}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="number" name="mobile" onChange={handler} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="@gmail.com"
                onChange={handler}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handler}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                onChange={handler}
              />
              {errors.confirm_password.length > 0 && (
                <span style={{ color: "red" }}>{errors.confirm_password}</span>
              )}
            </Form.Group>
            <br />
            <Button
              type="submit"
              className="btn btn-warning"
              id="formtab"
              style={{
                backgroundColor: "#FFD700",
                fontFamily: " 'Nunito Sans', sans-serif",
              }}
            >
              REGISTER
            </Button>
            <br />
            <center>
              If already registered,<a href="/login">click here</a>
            </center>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Registration;
