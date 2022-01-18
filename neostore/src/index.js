import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux"; //import store
import { Provider } from "react-redux";

const initialState = {
  count: 0,
  cartitem: [],
  users: [],
  testcart: [],
};

function reducer(state = initialState, actions) {
  console.log(state);

  const item = actions.payload;
  switch (actions.type) {
    case "ADDUSER":
      return {
        ...state,
        users: [...state.users, item],
      };
    case "REMOVEUSER":
      return {
        ...state,
        users: [],
      };

    case "ADDTOCART":
      return {
        ...state,
        cartitem: [...state.cartitem, item],
      };
    case "REMOVECART":
      return {
        ...state,
        cartitems: [],
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
