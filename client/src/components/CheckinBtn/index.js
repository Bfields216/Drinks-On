import React from "react";
import "./style.css";
// import { Button } from 'reactstrap'

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function CheckinBtn(props) {
  return (
    <div>
      {/* <a href=""> */}
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={props.checkin}
          id={props.index}
        >
          Check In
        </button>
      {/* </a> */}
    </div>
  );
}

export default CheckinBtn;
