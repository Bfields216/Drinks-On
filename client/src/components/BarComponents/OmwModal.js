import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TimePicker } from "react-materialize";
import { setETA, toggleModal, setOMW } from "../../actions/userActions";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const OmwModal = (props) => {

  const [eta, setETA] = useState(null);
  
  const cancel = () => {
    props.setOMW(false);
    props.toggleModal(false)
  };

  const submit = async () => {
    console.log(eta)
    props.setETA(eta);
    await props.toggleModal(false);
    props.toggleModal("waiting")
  };

  return (
    <>
      <ModalHeader toggle={cancel}>
        <h2>What time do you think you'll get here?</h2>
      </ModalHeader>
      <ModalBody className="party-options-modal">
        <TimePicker value={eta} onChange={(newTime) => setETA(newTime)}/>
      </ModalBody>
      <ModalFooter>
        <Link className="btn-small orange" to="#" onClick={submit}>
          I'm OMW!
        </Link>
      </ModalFooter>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, { toggleModal,setOMW, setETA })(
  OmwModal
);
