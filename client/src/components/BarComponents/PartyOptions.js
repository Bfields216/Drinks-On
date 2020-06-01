import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Collection, CollectionItem, Icon } from "react-materialize";
import { changePartyOptions } from "../../actions/userActions";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const PartyOptions = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [backdrop] = useState(true);

  const toggle = () => setModal(!modal);
  const [selected, setSelected] = useState({
    party: false,
    message: false,
    buyDrinks: false,
  });

  const toggleSelect = (event) => {
    const partyOption = event.target.id;
    if (partyOption === "party") {
      setSelected({
        ...selected,
        [partyOption]: !selected[partyOption],
        message: false,
        buyDrinks: false,
      });
    } else {
      setSelected({
        ...selected,
        [partyOption]: !selected[partyOption],
        party: false,
      });
      console.log(partyOption, selected[partyOption]);
    }
  };

  const submit = () => {
    props.changePartyOptions(selected);
    toggle()
  };
  return (
    <>
      <div className="btn-small" onClick={toggle}>
        {buttonLabel}
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggle}>
          <h2>Pick your Party Options</h2>
        </ModalHeader>
        <ModalBody className="party-options-modal">
          <Collection id="party-options-collection" className="col ">
            <CollectionItem
              id="party"
              href="#"
              className={`row ${selected.party ? "grey" : ""}`}
              onClick={toggleSelect}
            >
              <h3 id="party">
                <Icon id="party">mood</Icon>Just Here To Party!
              </h3>
              <p id="party">
                A No frills drinking experience. The equivalent of "Just pass me
                the bottle". Other users will NOT be able to send you messages
                or purchase drinks for you.
              </p>
            </CollectionItem>
            <CollectionItem
              id="message"
              href="#"
              className={`row ${
                selected.party
                  ? "grey-text disabled "
                  : selected.message
                  ? "grey"
                  : ""
              }`}
              onClick={toggleSelect}
            >
              <h3
                id="message"
                className={`${selected.party ? "grey-text" : ""}`}
              >
                <Icon id="message">message</Icon>Drunk Dial
              </h3>
              <p
                id="message"
                className={`${selected.party ? "grey-text" : ""}`}
              >
                Loose Lips, Sink Ships! Hopefully, that won't be the case. With
                this option selected other users will be able to send you a
                short message. Who knows what could happen?
              </p>
            </CollectionItem>
            <CollectionItem
              id="buyDrinks"
              href="#"
              className={`row ${
                selected.party
                  ? "grey-text disabled "
                  : selected.buyDrinks
                  ? "grey"
                  : ""
              }`}
              onClick={toggleSelect}
            >
              <h3
                id="buyDrinks"
                className={`${selected.party ? "grey-text" : ""}`}
              >
                <Icon id="buyDrinks">local_bar</Icon>Buy Me a Drink
              </h3>
              <p
                id="buyDrinks"
                className={`${selected.party ? "grey-text" : ""}`}
              >
                Funds low? With this option selected there's no need to worry
                because random people will be buying drinks for you.
              </p>
            </CollectionItem>
          </Collection>
        </ModalBody>
        <ModalFooter>
          <Link className="btn-small blue" to="/barView" onClick={submit}>
            To the Bar
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, { changePartyOptions })(PartyOptions);
