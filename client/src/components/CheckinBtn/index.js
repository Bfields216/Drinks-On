import React from "react";
import "./style.css";
// import { Button } from 'reactstrap'

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function CheckinBtn(props) {
  return (
    <div className="button">
    <a className="effect1" href="{props.checkin} " onClick={props.checkin} id={props.index}>
    Check-In
    <span className="bg"></span>
  </a>
    </div>
  );
}

export default CheckinBtn;
