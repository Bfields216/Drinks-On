import React from "react";
import "./style.css";
// import { Button } from 'reactstrap'

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function OnMyWayBtn(props) {
  return (
    <a
      className="btn"
      href="{props.checkin} "
      onClick={props.checkin}
      id={props.index}
    >
      On My Way!
    </a>
  );
}

export default OnMyWayBtn;
