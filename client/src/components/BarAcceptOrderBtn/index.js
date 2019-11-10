import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function BarAcceptOrderBtn(props) {
  const orderName = props.orderName
  const numOfDrinks = props.numOfDrinks
  return (
    <div className="row">
      <div className="col-md-3">
        <h1>{orderName}</h1>
      </div>
      <div className="col-md-2">
        {numOfDrinks}
      </div>
      <div className="col-md-2">
        <button
          id={props.index}
          type="button"
          className="btn btn-success"
          onClick={props.acceptOrder}
        >
          Start Order
        </button>
      </div>
        
      {/* </a> */}
    </div>
  );
}

export default BarAcceptOrderBtn;
