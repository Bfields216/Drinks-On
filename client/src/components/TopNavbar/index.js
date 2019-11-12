import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import {Nav, Navbar }from 'react-bootstrap'
import "./style.css";

class TopNav extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
   

    return (

   <nav className="navbar navbar-expand-lg">
  <a className="navbar-brand" href="/">Drinks On Us</a>

    <ul className="navbar-nav mr-auto">
  
    <li className="nav-item">
    <a className="btn-link" href="/">Log Out</a>
    </li>
 
      
      </ul>
     
      <span className="navbar-text">
      {/* <b>Hey there,</b> {user.name.split(" ")[0]} */}
      </span>
      </nav>
      

   
    );
  }
}


TopNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TopNav);


