import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function OrderBtn(props) {
  return (
    <div>
      <a href="/summary">
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={props.createOrder}
        >
          View Order Summery
        </button>
      </a>
    </div>
  );
}

export default OrderBtn;

