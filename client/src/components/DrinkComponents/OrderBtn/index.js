import React from "react";
function OrderBtn(props) {
  return (
    <div>
        <button
          type="button"
          className="general-btn btn-lg"
          onClick={props.createOrder}
        >
          View Order Summary
        </button>
    </div>
  );
}
export default OrderBtn;


