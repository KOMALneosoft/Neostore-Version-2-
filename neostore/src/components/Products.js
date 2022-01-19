import React, { useEffect, useState } from "react";
import { getProducts, getColors, getCategory } from "../config/Myservice";

import { useNavigate, Link } from "react-router-dom";

//////////////////////////////////////////////////////

function Products() {
  const [state, setState] = useState({
    color: "",
    category: "",
  });
  ///////////////////////////////////////////
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value }, () => {});
  };
  console.log(state);
  /////////////////////////////////////////////////
  let navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const [postdata, setPostdata] = useState([]);
  const [colordata, setColordata] = useState([]);
  const [categorydata, setCategorydata] = useState([]);

  console.log("Email : ", localStorage.getItem("userdetails"));
  console.log("Token : ", localStorage.getItem("_token"));
  //////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (localStorage.getItem("_token") !== undefined) {
      let token = localStorage.getItem("_token");
      let email = localStorage.getItem("userdetails");
      console.log(token);
      console.log(email);

      getProducts().then((res) => {
        console.log(res.data);
        console.log(res.data.err);
        if (res.data.err == 0) {
          setPostdata(res.data.data);
        }
      });
      getColors().then((res) => {
        console.log(res.data);
        console.log(res.data.err);
        if (res.data.err == 0) {
          setColordata(res.data.data);
        }
      });
      getCategory().then((res) => {
        console.log(res.data);
        console.log(res.data.err);
        if (res.data.err == 0) {
          setCategorydata(res.data.data);
        }
      });
    }
  }, []);
  /////////////////////////////////////////////////////

  const viewproduct = (id) => {
    const productid = localStorage.setItem("productid", id);
    console.log(productid);

    navigate("/productdetail");
  };

  /////////////////////////////////////////////////////

  const clean = () => {
    setState({ color: "", category: "" });
  };

  //////////////////////////////////////////////////////////////////

  return (
    <div className="container-fluid row">
      <nav
        id="sidebarMenu"
        style={{ height: "700px" }}
        className="collapse mb-5 d-lg-block sidebar bg-white col-md-3 m-4"
      >
        <div className="row position-sticky p-2 ms-3">
          <div className="list-group list-group-flush ">
            <input
              className="p-3 m-1 bg-dark text-light btn-dark"
              type="text"
              placeholder="Search....."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <br />
            <button className="btn alert-dark"> Categories</button>
            <label>
              <input
                type="radio"
                name="category"
                value="sectional"
                onClick={handler}
              />
              Sectional
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="category"
                value="twoseater"
                onClick={handler}
              />
              Two seater
            </label>
            <br />
            <br />
            <button className="btn alert-dark"> Color</button>
            <label>
              <input type="radio" name="color" value="red" onClick={handler} />
              Red
            </label>
            <br />
            <label>
              <input type="radio" name="color" value="blue" onClick={handler} />
              Blue
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="color"
                value="white"
                onClick={handler}
              />
              White
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="color"
                value="black"
                onClick={handler}
              />
              Black
            </label>
            <button className="btn btn-outline-dark btn-sm m-5" onClick={clean}>
              None
            </button>
          </div>
        </div>
      </nav>

      <div className="row justify-content-center m-2 col-md-9">
        <h5
          className="text-center alert-warning p-2 m-1"
          style={{ borderRadius: "10px", height: "55px" }}
        >
          <div>Let your home feel the style !!!!</div>
        </h5>
        {state.color !== "" && state.category !== ""
          ? postdata
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.product_name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, index) =>
                colordata.map((color, index) =>
                  categorydata.map((cate, index) =>
                    color.color_name === state.color &&
                    val.color_id == color._id &&
                    cate.category_name === state.category &&
                    val.category_id == cate._id ? (
                      <div className="container col-md-4 mt-2 p-3">
                        <div
                          className="container col-md-12 text-center mb-2 p-1 mt-2"
                          id="cardme"
                          style={{ alignItems: "center" }}
                        >
                          <div className="m-2">
                            <img
                              src={val.product_image}
                              className="card-img-top"
                              height="200px"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{val.product_name}</h5>
                              <div className="mb-2">
                                <span className="font-bold text-danger">
                                  <strong>Rs.{val.product_cost}</strong>
                                </span>
                              </div>

                              <div className="text-center row ">
                                <center>
                                  <button
                                    type="button"
                                    className="btn btn-dark "
                                    onClick={(props) => viewproduct(val._id)}
                                  >
                                    View Product
                                  </button>
                                </center>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                )
              )
          : postdata
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.product_name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, index) => (
                <div className="container col-md-4 mt-2 p-3">
                  <div
                    className="container col-md-12 text-center mb-2 p-1 mt-2"
                    id="cardme"
                    style={{ alignItems: "center" }}
                  >
                    <div className="m-2">
                      <img
                        src={val.product_image}
                        className="card-img-top"
                        height="200px"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{val.product_name}</h5>
                        <div className="mb-2">
                          <span className="font-bold text-danger">
                            <strong>Rs.{val.product_cost}</strong>
                          </span>
                        </div>

                        <div className="text-center row">
                          <center>
                            <button
                              type="button"
                              className="btn btn-dark  "
                              onClick={(props) => viewproduct(val._id)}
                            >
                              View Product
                            </button>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
}

export default Products;
