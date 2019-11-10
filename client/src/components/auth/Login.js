import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
// import LoginModal from "../LoginModal"
import RegisterModal from "../RegisterModal"

import "./Auth.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to the bars page
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Bars");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Bars");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="base-wrapper">
        <form className="auth-form" noValidate onSubmit={this.onSubmit}>
          <div className="auth-group">
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className="auth-input"
              />
              <label htmlFor="email">Email address</label>
              <span className="auth-error">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
          </div>
          <div className="auth-group">
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className="auth-input"
              />
              <label htmlFor="password">Password</label>
              <span className="auth-error">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
          </div>
          <div>
            <button 
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable secondary accent-3"
            >
              Login
            </button>
          </div>
          <div className="bottom-group">
          <RegisterModal buttonLabel="Register"/>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
