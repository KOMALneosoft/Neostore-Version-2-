import React, { useEffect, useState } from "react";
import { getPosts } from "../config/Myservice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductDetail(props) {
  const dispatch = useDispatch();

  let cart2 = [];
  const [cartdata, setCartdata] = useState([]);
  const cart = useSelector((state) => state.cartitem);
  const [postdata, setPostdata] = useState([]);
  const proid = localStorage.getItem("productid");
  console.log("proid:", proid);

  /////////////////////////////////
  useEffect(() => {
    getPosts().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setPostdata(res.data.data);
      }
    });
  }, []);
  //////////////////////////////////

  const addtocarty = (id, name, price) => {
    cart2 = [...cart2, { id, name, price }];
    alert("Added to cart");
    console.log("cart2:", cart2);
    localStorage.setItem("fullcart", [JSON.stringify(cart2)]);
    dispatch({
      type: "ADDTOCART",
      payload: {
        id: id,
        name: name,
        price: price,
      },
    });
  };
  /////////////////////////////////////////

  return (
    <div>
      {postdata.map((val, index) =>
        val._id === proid ? (
          <div className="container" id="prodetail">
            <div
              className="container row m-1"
              style={{ border: "2px solid black" }}
            >
              <div className="col-md-5 m-5">
                <img
                  data-image="black"
                  src={val.product_image}
                  alt=""
                  height="65%"
                  id="prodetailimage"
                />
              </div>

              <div className="col-md-5 m-5">
                <div className="product-description" id="prodes">
                  <span>
                    <b>Rating :</b>
                    {val.product_rating}
                  </span>
                  <h1>
                    <b>{val.product_name}</b>
                  </h1>
                  <p>
                    <b>Description :</b>
                    {val.product_desc}
                  </p>
                  <p>
                    <b>Producer :</b>
                    {val.product_producer}
                  </p>
                  <p style={{ color: "red" }}>
                    <b>
                      Rs.
                      {val.product_cost}
                    </b>
                  </p>
                  <p>
                    <b>Remaining stock :</b>
                    {val.product_stock}
                  </p>
                  <p>
                    <b>Material :</b>
                    {val.product_material}
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={(props) =>
                    addtocarty(val._id, val.product_name, val.product_cost)
                  }
                >
                  <span
                    className="fa fa-shopping-cart"
                    aria-hidden="true"
                  ></span>
                  ADD TO CART
                </button>

                <button className="btn btn-dark ms-1">
                  <Link
                    to="/products"
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    CANCEL
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default ProductDetail;
