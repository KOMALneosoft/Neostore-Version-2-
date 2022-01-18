import React, { useState } from "react";
import { useSelector } from "react-redux";

function Homepage() {
  return (
    <div style={{ height: "445px" }} className="container-fluid" id="homie">
      <div className="container col-md-12 h6  m-1 p-2" id="inhomie">
        Nothing defines your living room more than your sofa, and we have a
        plethora of options for you to choose from. From cozy one-seaters to
        grand three-seaters, we bring you the very best in premium seating.
        Choose from a variety of upholstery, including stylish leather, soft
        fabric or sustainable leatherette. Most importantly, with the use of our
        quality wood and expert craftsmanship, these pieces will last for the
        years come. Scroll down to explore fabric sofas, leatherette sets,
        recliner sofas, sofas with pouffes and more.
      </div>
    </div>
  );
}

export default Homepage;
