import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar2 from "./components/Navbar2";
import Products from "./components/Products";
import Login from "./components/Login";
import Registration2 from "./components/Registration2";
import Homepage from "./components/Homepage";
import MyAccount from "./components/MyAccount";
import Editprofile from "./components/Editprofile";
import Settings from "./components/Settings";
import ProductDetail from "./components/ProductDetail";
import Cartitem from "./components/Cartitem";
import Myorder from "./components/Myorder";
import Forgotpassword from "./components/Forgotpassword";
import Otp from "./components/otp";
import Address from "./components/Address";
import Editaddress from "./components/Editaddress";

function App() {
  return (
    <div>
      <Router>
        <Navbar2 />
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/" exact element={<Homepage />} />
          <Route path="/otp" exact element={<Otp />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/registration" exact element={<Registration2 />} />
          <Route path="/myacc" exact element={<MyAccount />} />
          <Route path="/editprofile" exact element={<Editprofile />} />
          <Route path="/settings" exact element={<Settings />} />
          <Route path="/productdetail" exact element={<ProductDetail />} />
          <Route path="/cartitem" exact element={<Cartitem />} />
          <Route path="/myorder" exact element={<Myorder />} />
          <Route path="/address" exact element={<Address />} />
          <Route path="/forgotpassword" exact element={<Forgotpassword />} />
          <Route path="/editaddress" exact element={<Editaddress />} />
        </Routes>
      </Router>

      <Footer id="foot" />
    </div>
  );
}

export default App;
