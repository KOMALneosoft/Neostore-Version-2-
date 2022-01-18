import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, addorder } from "../config/Myservice";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cartitem = (props) => {
  const navigate = useNavigate();
  const cart2 = useSelector((state) => state.cartitem);
  const [prodata, setProdata] = useState([]);
  const cart = [];

  cart.push(cart2);
  console.log(cart);

  const dispatch = useDispatch();
  useEffect(() => {
    getPosts().then((res) => {
      console.log(res.data);
      console.log("error:", res.data.err);
      if (res.data.err == 0) {
        setProdata(res.data.data);
      }
    });
  }, []);
  console.log(prodata);
  console.log(cart);
  const [card, setCard] = useState("");

  const handler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setCard(e.target.value);
  };
  const add = (e) => {
    e.preventDefault();

    localStorage.setItem("price", totprice);
    axios
      .post("http://localhost:9000/api/addorder", {
        price: totprice,
        cart: cart[0],
        card: card,
        user: localStorage.getItem("userdetails"),
      })
      .then((res) => {
        console.log(cart);
      });

    console.log(cart[0]);
    let data = {
      price: totprice,
      cart: cart[0],
      card: card,
      user: localStorage.getItem("userdetails"),
    };

    console.log(data);
    axios.post("http://localhost:9000/api/invoice", data).then((res) => {
      console.log(res.data);
      if (res.data.flg === 1) {
        navigate("/pdf");
      }
    });
  };

  let totprice = 0;
  let cartitem = [];
  console.log(cartitem);
  /////////////////////////////////////////
  const empty = () => {
    alert("Your cart is empty!!!!!!!");
    cart = [];
    dispatch({
      type: "REMOVECART",
    });
  };
  ///////////////////////////////////////////

  return (
    <div>
      <div
        className="container alert-warning pt-3 mt-1"
        style={{ height: "600px" }}
        id="cartpage"
      >
        <h1 className="text-center"> Shopping Cart</h1>

        <form method="post">
          <div>
            <Link
              to="/products"
              className="btn bg-danger text-light"
              onClick={empty}
              style={{ marginBottom: "5px" }}
            >
              Empty Cart
            </Link>
            <table className="table bg-dark text-light">
              {cart[0] == "" ? (
                <h4>Your Cart is Empty!!</h4>
              ) : (
                prodata.map((val, index) =>
                  cart[0].map((ele, index) =>
                    ele.id === val._id ? (
                      <tr>
                        <td>
                          <img
                            src={val.product_image}
                            alt="..."
                            height="80px"
                          />
                        </td>
                        <td>
                          <h6 name="name">{val.product_name}</h6>
                        </td>
                        <td>
                          <p name="price">Rs. {val.product_cost}</p>
                        </td>
                        <span class="text-dark">
                          {(totprice = totprice + Number(val.product_cost))}
                        </span>
                      </tr>
                    ) : null
                  )
                )
              )}
              <tr>
                <td />
                <td />
                <td class="h4">Total : Rs. {totprice}</td>
              </tr>
            </table>
            <hr />

            <input
              className="form-control"
              type="number"
              placeholder="Enter Credit card details"
              onChange={handler}
              aria-label="default input example"
              style={{ width: "300px", border: "1px solid green" }}
            />
            <br />
            <button
              type="submit"
              class="btn btn-dark"
              style={{ width: "90px" }}
              onClick={add}
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              Checkout
            </button>
          </div>
        </form>
        <br />
      </div>
      <div class="modal" id="myModal" style={{ width: "100%" }}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Hello ,</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <h3 className="alert-success">Checkout done successfully!!!!</h3>
              <h6 className="alert-dark">
                Thankyou!!You can check your order in order tab.
              </h6>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                <Link
                  to="/myorder"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  OK,Go to Order
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
