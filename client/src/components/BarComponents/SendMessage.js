import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Collection, CollectionItem, Icon } from "react-materialize";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const DrinkInstructions = (props) => {
  const { image, name } = props;

  const [modal, setModal] = useState(false);
  const [backdrop] = useState(true);

  const toggle = () => setModal(!modal);
  const [msg, setMsg] = useState(null);
  
  const handleInputChange = (event) => {
    const value = event.target;
    setMsg(value)
  };
  return (
    <>
      <div className="user-collection-item-icon btn" onClick={toggle}>
        <Icon>message</Icon>Drunk Dial{"  "}
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggle} className="row send-message-header">
        <div className="col-sm-1">
                          <img alt="" className="circle" src={image} />
                        </div><div className="col=sm-9">{name}</div>
        </ModalHeader>
        <ModalBody className="party-options-modal">
          <Collection id="party-options-collection" className="col ">
            <CollectionItem
              id="party"
              href="#"
              className="row"
              // onClick={toggleSelect}
            >
              <h1>Messages Coming Soon</h1>
            </CollectionItem>
          </Collection>
        </ModalBody>
        <ModalFooter>
        <div className="row">
                <input
                  name="msgValue"
                  value={msg}
                  onChange={handleInputChange}
                  placeholder="Enter Message"
                />

                <button
                  // onClick={this.searchNewLocation}
                  className="btn btn-outline"
                  type="button"
                >
                  Search
                </button>
              </div>

        </ModalFooter>
      </Modal>
    </>
  );
};

export default DrinkInstructions;
