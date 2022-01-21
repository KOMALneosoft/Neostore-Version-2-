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
  otp: [],
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
    case "ADDOTP":
      return {
        ...state,
        otp: [...state.otp, item],
      };

    case "ADDTOCART":
      return {
        ...state,
        count: state.count + 1,
        cartitem: [...state.cartitem, item],
      };
    case "DELETECART":
      return {
        ...state,
        cartitem: state.cartitem.filter((items, index) => items.id !== item),
        count: state.count - 1,
      };

    case "REMOVECART":
      return {
        ...state,
        cartitem: [],
        count: 0,
      };
    case "INCREASE": {
      const index = state.cartitem.findIndex((items) => items.id == item);
      console.log(index);
      const newArray = [...state.cartitem];
      console.log(newArray);
      newArray[index].quantity = newArray[index].quantity + 1;
      return {
        ...state,
        cartitem: newArray,
      };
    }
    case "DECREASE": {
      const index = state.cartitem.findIndex((items) => items.id == item);
      console.log(index);
      const newArray = [...state.cartitem];
      console.log(newArray);
      if (newArray[index].quantity > 1) {
        newArray[index].quantity = newArray[index].quantity - 1;
      } else {
        newArray[index].quantity = 1;
      }
      return {
        ...state,
        cartitem: newArray,
      };
    }

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
