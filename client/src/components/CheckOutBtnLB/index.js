import React from "react";
import "./style.css";
// import { Button } from 'reactstrap'

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function CheckoutBtnLB(props) {
  return (
    <div className="button">
    <a className="effect1" href="{props.checkout} " onClick={props.checkout}>
    Checkout
  
  </a>
    </div>

  );
}

export default CheckoutBtnLB;