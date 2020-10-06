import React, { Component, Fragment } from 'react';
import { NavLink, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <li>
        <NavItem onClick={this.props.logout} href='/'>
          Logout
        </NavItem>
      </li>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);