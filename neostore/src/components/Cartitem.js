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
  const [error, setError] = useState(0);
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
  ///////////////////////////////////////
  const add = (e) => {
    e.preventDefault();
    localStorage.setItem("prevsprice", totprice);
    localStorage.setItem("price", Final);
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
  ////////////////////////////////////////////
  let totprice = 0;
  let GST = 0;
  let Final = 0;
  let cartitem = [];
  console.log(cartitem);
  /////////////////////////////////////////
  const empty = () => {
    navigate("/products");
    alert("Your cart is empty!!!!!!!");
    cart = [];
    dispatch({
      type: "REMOVECART",
    });
  };
  ///////////////////////////////////////////

  return (
    <div>
      <div className="container alert-warning  mt-1 p-5" id="cartpage">
        <h1 className="text-center"> Shopping Cart</h1>

        <form method="post">
          <div>
            <button
              className="btn bg-danger text-light"
              onClick={empty}
              style={{ marginBottom: "5px" }}
            >
              Empty Cart
            </button>
            <div className="row">
              <table className="table bg-dark text-light col-md-5 ">
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
              </table>
              <div className="card col-md-3 p-2 ">
                <b>
                  Subtotal : Rs. {totprice}
                  <br />
                  {totprice !== 0 ? (
                    <h6>GST(5%) : Rs.{(GST = totprice * 0.05)}</h6>
                  ) : null}
                  <br />
                  {totprice !== 0 ? (
                    <h3> Total : Rs. {(Final = totprice + GST)}</h3>
                  ) : null}
                </b>
              </div>
            </div>
            <hr />

            <input
              className="form-control"
              type="number"
              placeholder="Enter Credit card details"
              onChange={handler}
              name="card"
              aria-label="default input example"
              style={{ width: "300px", border: "1px solid green" }}
            />
            {card.length !== 12 ? (
              <span style={{ color: "red " }}>
                Enter valid card number(12 digits)
              </span>
            ) : null}
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
