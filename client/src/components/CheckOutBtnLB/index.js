import React from "react";
import "./style.css";
// import { Button } from 'reactstrap'

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function CheckoutBtnLB(props) {
  return (
    <a className="btn" href="{props.checkout} " onClick={props.checkout}>
      Checkout
    </a>
  );
}

export default CheckoutBtnLB;
