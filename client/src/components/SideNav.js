import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Collection, CollectionItem } from "react-materialize";
import { connect } from "react-redux";
import { logout, toggleModal } from "../actions/userActions";

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
      <div className="col text-center bar-view-header-img mt-4">
        <h2>Drinkson</h2>
        <img
          alt=""
          className="circle"
          id="header-img"
          src="https://i.kym-cdn.com/entries/icons/facebook/000/030/938/meme14.jpg"
        />
        <h3>J.T. Moola</h3>
        <Collection className="side-nav-collection col-12">
          <CollectionItem href="#" className="h4 black-text">
            My Account
          </CollectionItem>
          <CollectionItem href="#" className="h4 black-text">
            Messages
          </CollectionItem>
          <CollectionItem href="/summary" className="h4 black-text">
            Orders
          </CollectionItem>
          <CollectionItem
            href="#"
            className="h4 black-text"
            onClick={this.props.logout}
          >
            Logout
          </CollectionItem>
        </Collection>
      </div>
    ) : (
      <div className="col text-center bar-view-header-img mt-4">
        <h2>Drinkson</h2>
        <img
          alt=""
          className="circle"
          id="header-img"
          src="https://clipartstation.com/wp-content/uploads/2017/11/cocktail-clipart-black-and-white-6.jpg"
        />
        <Collection className="side-nav-collection col-12">
          <CollectionItem
            href="#"
            onClick={() => this.props.toggleModal("login")}
            className="h4 black-text"
          >
            Login
          </CollectionItem>
          <CollectionItem
            href="#"
            onClick={() => this.props.toggleModal("register")}
            className="h4 black-text"
          >
            Register
          </CollectionItem>
        </Collection>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout, toggleModal })(SideNav);
