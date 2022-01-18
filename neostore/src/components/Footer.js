import React from "react";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";

function Footer() {
  return (
    <div className="container-fluid">
      <Row style={{ background: "#212529" }} className="text-light p-2">
        <Col lg={4} className="text-light  ">
          <h4>About Company</h4>
          <h7 style={{ fontSize: "12px" }}>
            <p>
              NeoSOFT Technologies is here at your quick and easy service for
              shooping
            </p>
            <p>Contact information</p>
            <p>email:contact@neosofttech.com</p>
            <p>Phone: +91 0000000000</p>
            <p>PUNE,INDIA</p>
          </h7>
        </Col>
        <Col lg={4} className="text-light ">
          <h4>Information </h4>
          <h7 style={{ fontSize: "12px" }}>
            {" "}
            <p>Terms and Condition</p>
            <p>Gurantee and Return Policy </p>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
            <p>Locate Us</p>
          </h7>
        </Col>
        <Col lg={4} className="text-light paddingissue">
          <h4>Newsletter </h4>
          <h7 style={{ fontSize: "12px" }}>
            <p>
              Signup to get exclusive offer from our favorite brands and to be
              well up in the news
            </p>
          </h7>
          <Form>
            <FormControl
              type="email"
              placeholder="enter your email..."
              style={{ width: "50%" }}
            />
            <br />
            <Button className="btn btn-outline-light bg-dark">Subscribe</Button>
          </Form>
        </Col>
        <h7 style={{ fontSize: "12px" }}>
          <Col lg={12} className="text-center">
            Copyright 2017 NeoSOFT Technologies All rights reserved |
            <a href="#">Designed By Komal Verma</a>
          </Col>
        </h7>
      </Row>
    </div>
  );
}

export default Footer;
