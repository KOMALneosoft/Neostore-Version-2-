import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { getOrders, getPosts } from "../config/Myservice";

function Myorder() {
  const [orderdata, setOrderdata] = useState([]);
  const [postdata, setPostdata] = useState([]);
  const [rdata, setRdata] = useState([]);
  const price = localStorage.getItem("price");
  console.log(price);
  useEffect(() => {
    getOrders().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setOrderdata(res.data.data);
      }
    });
    getPosts().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setPostdata(res.data.data);
      }
    });
  }, []);

  const len = 0;
  ///////////////////////////////////////////

  /////////////////////////////////////////////

  return (
    <div style={{ height: "500px" }} className="container-fluid" id="myorder">
      {orderdata.map((val, index) =>
        price == val.price ? (
          <div className="page-content page-container p-1 ">
            <div
              className="m-0"
              //  / style={{ width: "60%", backgroundColor: "lightsteelblue" }}
            >
              <div
                style={{ width: "60%" }}
                className="row container  d-flex justify-content-center"
                id="order"
              >
                <div className="col-md-12">
                  <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-12 text-center">
                        <div className="card-block row">
                          <h4
                            className="col-sm-8"
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
                                Order id:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val._id}
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
                                User:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.user}
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
                                Name:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.name}
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
                                Price:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.price}
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
                                Card:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.card}
                              </h6>
                            </div>
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
                <div className="row ">
                  <div classname="col-md-5">
                    <form action="http://localhost:9000/api/download">
                      <button
                        type="submit"
                        className="btn btn-dark m-2 col-md-5"
                      >
                        Download PDF
                      </button>
                    </form>
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

export default Myorder;
