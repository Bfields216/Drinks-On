import React from 'react';
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function CheckOutBtn(props) {
  return (
    <div>
      {/* <a href=""> */}
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={props.handleFormSubmit}
        >
          Place Order
        </button>
      {/* </a> */}
    </div>
  );
}

export default CheckOutBtn;
