import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./UserComponents/RegisterModal";
import LoginModal from "./UserComponents/LoginModal";
import Logout from "./UserComponents/Logout";
import SideNav from "./SideNav";

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

  render() {
    const { isAuthenticated, user } = this.props.user;
    console.log(isAuthenticated);
    console.log(this.props);

    const userLinks = (
      <>
        <NavItem>
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );

    const guestLinks = (
      <>
      <NavItem onClick={this.toggleRegister} href="#" className="nav-button">
      Register
    </NavItem>
        <RegisterModal isOpen={this.state.openRegister} toggle={this.toggleRegister}/>
        <NavItem onClick={this.toggleLogin} href='#' className="nav-button">
          Login
        </NavItem>
        <LoginModal isOpen={this.state.openLogin} toggle={this.toggleLogin} />
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
        sidenav={<SideNav />
        }
      >
        {isAuthenticated ? userLinks : guestLinks}
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(AppNavbar);
