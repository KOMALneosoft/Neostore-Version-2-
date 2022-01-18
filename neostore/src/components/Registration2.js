import React, { useState, Component } from "react";
import { addUser } from "../config/Myservice";
import { Link, Navigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const regForName = RegExp(/^[A-Za-z]/);
const regForEve = RegExp(/^(?!^ +$)^.+$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForMobile = RegExp(/^ [1-9] {1} [0-9] {9}$/);

export class Registration2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodata: [],

      fname: "",
      lname: "",
      mobile: "",
      email: "",
      age: "",
      gender: "",
      password: "",
      confirm_password: "",

      errors: {
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        confirm_password: "",
      },
      err: {
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        confirm_password: "",
      },
      flag: 0,
    };
  }

  /////////////////////////////////////
  handler = (event) => {
    const { name, value } = event.target;

    let errors = this.state.errors;
    let err = this.state.err;
    switch (name) {
      case "fname":
        errors.fname = regForName.test(value) ? "" : "Enter Valid first Name";
        if (errors.fname !== "") {
          err.fname = "error";
        } else {
          err.fname = "";
        }
        break;
      case "lname":
        errors.lname = regForName.test(value) ? "" : "Enter Valid last Name";
        if (errors.lname !== "") {
          err.lname = "error";
        } else {
          err.lname = "";
        }
        break;
      case "mobile":
        errors.mobile =
          this.state.mobile.length === 9
            ? ""
            : "Enter Valid first mobile number";
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
      case "age":
        errors.age = this.state.age < 10 ? "" : "Minimum age should be 10";
        if (errors.age !== "") {
          err.age = "error";
        } else {
          err.age = "";
        }
        break;
      case "gender":
        errors.gender = this.state.gender !== "" ? "" : "Select gender";
        if (errors.gender !== "") {
          err.gender = "error";
        } else {
          err.gender = "";
        }
        break;
      case "password":
        errors.password =
          this.state.password.length < 8
            ? ""
            : "Password minimum length should be 8";
        if (errors.password !== "") {
          err.password = "error";
        } else {
          err.password = "";
        }
        break;
      case "confirm_password":
        errors.confirm_password =
          this.state.password === value
            ? ""
            : "Password and Confirm Password does not match";
        if (errors.confirm_password !== "") {
          err.confirm_password = "error";
        } else {
          err.fname = "";
        }
        break;
    }
    this.setState({ err, errors, [name]: value }, () => {
      console.log(this.state);
    });
  };
  ////////////////////////
  formSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
    console.log(this.state.errors);
    if (this.validate(this.state.errors)) {
      if (
        this.state.email !== "" &&
        this.state.password !== "" &&
        this.state.fname !== "" &&
        this.state.lname !== ""
      ) {
        console.log(this.state.errors);
        if (this.add()) {
          alert("Details added successfully !!");

          localStorage.setItem("firstname", this.state.fname);
          localStorage.setItem("lastname", this.state.lname);
          localStorage.setItem("mobile", this.state.mobile);

          localStorage.setItem("age", this.state.age);
          localStorage.setItem("gender", this.state.gender);
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
  validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  ////////////////////////////////////////////////////////////////////////
  add = async (event) => {
    await addUser({
      fname: this.state.fname,
      lname: this.state.lname,
      mobile: this.state.mobile,
      email: this.state.email,
      age: this.state.age,
      gender: this.state.gender,
      password: this.state.password,
    }).catch((err) => {
      console.log(err);
    });
    this.state.flag = 1;
    this.setState({ ...this.state });
  };
  ////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { errors } = this.state;
    return (
      <div>
        {this.state.flag == 1 && <Navigate to="/login" />}
        <div className="container-fluid p-5" id="mylog">
          <Row>
            <Col lg={1}>
              <center>
                <br />
              </center>
            </Col>

            <Col className="col-md-6">
              <Form
                id="form1"
                className="p-5 mt-2"
                onSubmit={this.formSubmit}
                method="post"
                style={{ backgroundColor: "#f2f3f4", marginLeft: "55px" }}
              >
                <h4 className="text-center  p-1" style={{ marginTop: "-20px" }}>
                  REGISTRATION
                </h4>
                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="first name"
                    onChange={this.handler}
                  />
                  <h7>
                    {errors.fname.length > 0 && (
                      <span style={{ color: "red" }}>{errors.fname}</span>
                    )}
                  </h7>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="last name"
                    onChange={this.handler}
                  />
                  <h7>
                    {errors.lname.length > 0 && (
                      <span style={{ color: "red" }}>{errors.lname}</span>
                    )}
                  </h7>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile"
                    onChange={this.handler}
                  />
                  <h7>
                    {errors.mobile.length > 0 && (
                      <span style={{ color: "red" }}>{errors.mobile}</span>
                    )}
                  </h7>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    placeholder="your age"
                    onChange={this.handler}
                  />
                  <h7>
                    {errors.age.length > 0 && (
                      <span style={{ color: "red" }}>{errors.age}</span>
                    )}
                  </h7>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>Gender</Form.Label>
                  <Form.Label>Select Norm Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    placeholder="select gender"
                    onChange={this.handler}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                  <h7>
                    {errors.gender.length > 0 && (
                      <span style={{ color: "red" }}>{errors.gender}</span>
                    )}
                  </h7>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="@gmail.com"
                    onChange={this.handler}
                  />
                  <h7>
                    {errors.email.length > 0 && (
                      <span style={{ color: "red" }}>{errors.email}</span>
                    )}
                  </h7>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={this.handler}
                  />
                  <h7>
                    {errors.password.length > 0 && (
                      <span style={{ color: "red" }}>{errors.password}</span>
                    )}
                  </h7>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1" id="formtab">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    onChange={this.handler}
                  />
                  <h7>
                    {errors.confirm_password.length > 0 && (
                      <span style={{ color: "red" }}>
                        {errors.confirm_password}
                      </span>
                    )}
                  </h7>
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
      </div>
    );
  }
}

export default Registration2;
