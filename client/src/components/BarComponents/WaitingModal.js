import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { changePartyOptions, toggleModal, checkIntoBar, setOMW, setETA } from "../../actions/userActions";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const WaitingModal = (props) => {
  const cancel = () => {
    props.setOMW(false);
    props.toggleModal(false);
  };

  const checkin = () => {
    props.checkIntoBar(props.user.data.omwTo);
    props.setOMW(false);
    props.setETA(false);
    props.toggleModal("partyOptions");
  };

  const checkout = () => {
    props.setOMW(false);
    props.setETA(false);
    props.toggleModal(false);
  };

  return (
    <>
      <ModalHeader>
        <h2>We're Waitng on You!</h2>
      </ModalHeader>
      <ModalBody className="party-options-modal">
        <h5>You're scheduled to be here at about {props.user.data.ETA} am</h5>
        Unfortunately, there's not much else you can do on the app until you get
        here.
        <div className="row justify-content-center">
          <div className="col-7 flex-wrap">
            <button
              type="button"
              className="general-btn btn-lg btn-block"
              onClick={checkin}
            >
              I'm Here!
            </button>
            <button
              type="button"
              className="general-btn btn-lg btn-block"
              onClick={() => props.toggleModal("omw")}
            >
              Change ETA
            </button>
            <button
              type="button"
              className="general-btn btn-lg btn-block"
              onClick={checkout}
            >
              Checkout Other Bars
            </button>
          </div>
        </div>
      </ModalBody>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, { changePartyOptions, toggleModal, checkIntoBar, setOMW, setETA })(
  WaitingModal
);
