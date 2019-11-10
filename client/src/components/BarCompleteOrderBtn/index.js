import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function BarCompleteOrderBtn(props) {
  return (
    <div>
      {/* <a href=""> */}
        <button
          id ={props.index}
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={props.completeOrder}
        >
          Complete Order
        </button>
      {/* </a> */}
    </div>
  );
}

export default BarCompleteOrderBtn;
