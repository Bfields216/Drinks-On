import React, { Component } from "react";
// import { Link } from "react-router-dom";
import RegisterModal from "./UserComponents/RegisterModal";
import LoginModal from "./UserComponents/LoginModal";

import { Collection, CollectionItem } from "react-materialize";
import { connect } from "react-redux";
import { logout } from "../actions/userActions";

class SideNav extends Component {
  state = {
    openLogin: false,
    openRegister: false,
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

  render() {
    return this.props.user.isAuthenticated ? (
      <div className="col text-center bar-view-header-img">
        <img
          alt=""
          className="circle"
          id="header-img"
          src="https://i.kym-cdn.com/entries/icons/facebook/000/030/938/meme14.jpg"
        />
        <h3>J.T. Moola</h3>
        <Collection className="side-nav-collection col-12">
          <CollectionItem href="#">My Account</CollectionItem>
          <CollectionItem href="#">Messages</CollectionItem>
          <CollectionItem href="#">Orders</CollectionItem>
          <CollectionItem href="#" onClick={this.props.logout}>Logout</CollectionItem>
        </Collection>
      </div>
    ) : (
      <div className="col text-center bar-view-header-img">
        <img
          alt=""
          className="circle"
          id="header-img"
          src="https://clipartstation.com/wp-content/uploads/2017/11/cocktail-clipart-black-and-white-6.jpg"
        />
        <Collection className="side-nav-collection col-12">
          <CollectionItem href="#" onClick={this.toggleLogin}>Login</CollectionItem>
          <CollectionItem href="#" onClick={this.toggleRegister}>Register</CollectionItem>
        </Collection>
        <LoginModal isOpen={this.state.openLogin} toggle={this.toggleLogin} />
        <RegisterModal
          isOpen={this.state.openRegister}
          toggle={this.toggleRegister}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {logout})(SideNav);
