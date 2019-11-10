import React, { useState } from 'react';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';

import "./style.css";
import Register from '../auth/Register';

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const RegisterModal = (props) => {
  const {
    buttonLabel,
    className,
  } = props;

  const [modal, setModal] = useState(false);
  const [backdrop] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="secondary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop}>
        <ModalHeader toggle={toggle}><h3>Register</h3></ModalHeader>
          <Register />
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RegisterModal;
