import React, { useState, useEffect } from "react";
import { getOrders, getPosts } from "../config/Myservice";

function Myorder() {
  const [orderdata, setOrderdata] = useState([]);
  const [postdata, setPostdata] = useState([]);

  const price = localStorage.getItem("price");
  const prevprice = localStorage.getItem("prevsprice");
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
    <div className="container-fluid" id="myorder">
      <div>
        <div className="row">
          {orderdata.map((val, index) =>
            price == val.price ? (
              <div className="row">
                <div
                  style={{ width: "60%" }}
                  className="container d-flex justify-content-center"
                >
                  <div className="row col-md-12 p-4">
                    <div className="row p-4">
                      <div className="card  text-center p-4">
                        <div className="row">
                          <h4
                            className="text-center"
                            style={{
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            BILL
                          </h4>

                          <hr />
                          <div className="row ">
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
                            <hr />
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
                            <hr />
                            <div className="row p-0 mb-0">
                              <p
                                className="col-sm-4 m-b-10 f-w-600"
                                style={{
                                  fontFamily: "cursive",
                                  fontWeight: "bold",
                                }}
                              >
                                Product Name:
                              </p>
                              <h6 className="col-sm-8 text-muted f-w-400">
                                {val.name.map((ele, index) => (
                                  <font color="purple">
                                    <h6
                                      style={{
                                        borderBlockEnd: "0.2px solid black",
                                      }}
                                    >
                                      {ele}
                                    </h6>
                                  </font>
                                ))}
                              </h6>
                            </div>
                            <br />
                            <hr />

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

                              <h6 className="col-sm-8  f-w-400">
                                <b className="text-danger"> Rs. {price}</b>
                              </h6>
                            </div>
                            <br />
                            <hr />
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
                          <div className="row p-4">
                            <div classname="col-md-3 ">
                              <form action="http://localhost:9000/api/download">
                                <button
                                  type="submit"
                                  className="btn btn-dark m-2 col-md-4"
                                >
                                  Download PDF
                                </button>
                              </form>
                            </div>
                          </div>
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
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default Myorder;
