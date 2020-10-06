import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const DrinkInstructions = (props) => {
  const {
    buttonLabel,
    className,
    instructions,
    drinkname
  } = props;

  const [modal, setModal] = useState(false);
  const [backdrop] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="btn-small red" onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop}>
        <ModalHeader toggle={toggle}>How to make {drinkname}</ModalHeader>
        <ModalBody>
          {instructions}
        </ModalBody>
        <ModalFooter>
          <div className="btn grey" onClick={toggle}>Exit</div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DrinkInstructions;
