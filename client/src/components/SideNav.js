import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Collection, CollectionItem } from "react-materialize";
import { connect } from "react-redux";

class SideNav extends Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
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
        </Collection>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(SideNav);
