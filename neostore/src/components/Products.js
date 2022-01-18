import React, { useEffect, useState } from "react";
import { getPosts, getSearch, getColors } from "../config/Myservice";
import main from "../images/main.jpeg";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";

//////////////////////////////////////////////////////

function Products() {
  const [searchBar, setSearchBar] = useState({ search: "" });
  const [recommendations, setRecommendations] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let cart2 = [];
  const [postdata, setPostdata] = useState([]);
  const [temp, setTemp] = useState([]);
  const [colordata, setColordata] = useState([]);
  console.log("Email : ", localStorage.getItem("userdetails"));
  console.log("Token : ", localStorage.getItem("_token"));
  //////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (localStorage.getItem("_token") !== undefined) {
      let token = localStorage.getItem("_token");
      let email = localStorage.getItem("userdetails");
      console.log(token);
      console.log(email);

      getPosts().then((res) => {
        console.log(res.data);
        console.log(res.data.err);
        if (res.data.err == 0) {
          setPostdata(res.data.data);
        }
      });
    }
  }, []);

  const viewproduct = (id) => {
    const productid = localStorage.setItem("productid", id);
    console.log(productid);

    navigate("/productdetail");
  };
  ////////////////////////////////////////////////
  const CategoryFilter = (value) => {
    const output = temp.filter((currentproduct) => {
      return currentproduct.category_id.category_name === value;
    });

    setPostdata(output);
  };

  const ColorFilter = (value) => {
    const output = postdata.filter((currentproduct) => {
      return currentproduct.color_id.color_name === value;
    });
    setPostdata(output);
  };

  //////////////////////////////////////////////////////////////////

  return (
    <div>
      <nav
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse bg-white "
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush ">
            <Dropdown
              className="nav-item dropdown bg-light m-1"
              style={{ borderRadius: "10%" }}
            >
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                color
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <button
                    className="dropdown-item"
                    onClick={() => ColorFilter("red")}
                  >
                    Red
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className="dropdown-item"
                    onClick={() => ColorFilter("black")}
                  >
                    Black
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className="dropdown-item"
                    onClick={() => ColorFilter("white")}
                  >
                    white
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className="dropdown-item"
                    onClick={() => ColorFilter("blue")}
                  >
                    Blue
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              className="nav-item dropdown bg-light m-1"
              style={{ borderRadius: "10%" }}
            >
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <button
                    className="dropdown-item"
                    onClick={() => CategoryFilter("sectional")}
                  >
                    Sectional
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className="dropdown-item"
                    onClick={() => CategoryFilter("twoseater")}
                  >
                    Two seater
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
      <div className="container ">
        <img src={main} style={{ width: "100%", height: "400px" }} />
      </div>
      <div className="row justify-content-center m-2">
        {postdata.map((val, index) => (
          <div className="container col-md-4 mt-2 p-3">
            <div
              className="container col-md-12 center mb-2 p-3 mt-2"
              id="cardme"
              style={{ alignItems: "center" }}
            >
              <div className="card m-2">
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
                    <button
                      type="button"
                      className="btn btn-dark m-1 col-md-8"
                      id="addToCart-1"
                      onClick={(props) => viewproduct(val._id)}
                    >
                      View Product
                    </button>
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
