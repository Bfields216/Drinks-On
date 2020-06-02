import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";
import RegisterModal from "./UserComponents/RegisterModal";
import LoginModal from "./UserComponents/LoginModal";
import PartyOptions from "./BarComponents/PartyOptions";
import Logout from "./UserComponents/Logout";
import SideNav from "./SideNav";
import { toggleModal } from "../actions/userActions";
import OmwModal from "./BarComponents/OmwModal";
import WaitingModal from "./BarComponents/WaitingModal";

class AppNavbar extends Component {
  state = {
    openLogin: false,
    openRegister: false,
    isOpen: false,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  toggleLogin = () => {
    this.setState({
      openLogin: !this.state.openLogin,
    });
  };
  toggleRegister = () => {
    this.setState({
      openRegister: !this.state.openRegister,
    });
  };
  renderModal() {
    let modalType = this.props.user.modalType;
    switch (modalType) {
      case "login":
        return <LoginModal />;
      case "register":
        return <RegisterModal />;
      case "partyOptions":
        return <PartyOptions />;
      case "omw":
        return <OmwModal />;
      case "waiting":
        return <WaitingModal />;
      default:
        return "";
    }
  }
  render() {
    const { isAuthenticated, data } = this.props.user;

    let modalType = this.props.user.modalType;

    const userLinks = (
      <>
        <NavItem>
          <strong>{data ? `Welcome ${data.name}` : ""}</strong>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );

    const guestLinks = (
      <>
        <NavItem
          onClick={() => this.props.toggleModal("register")}
          href="#"
          className="nav-button"
        >
          Register
        </NavItem>
        <NavItem
          onClick={() => this.props.toggleModal("login")}
          href="#"
          className="nav-button"
        >
          Login
        </NavItem>
      </>
    );

    return (
      <Navbar
        fixed
        alignLinks="right"
        brand={
          <Link to="/" className="brand-logo">
            Drinkson
          </Link>
        }
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          edge: "right",
        }}
        sidenav={<SideNav />}
      >
        {isAuthenticated ? userLinks : guestLinks}
        <Modal
          isOpen={modalType ? true : false}
          toggle={() => this.props.toggleModal(false)}
        >
          {this.renderModal()}
        </Modal>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { toggleModal })(AppNavbar);
