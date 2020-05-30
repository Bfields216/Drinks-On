import React, { Component } from "react";
import axios from "axios";
import ManageEvents from "../components/AdminComponents/ManageEvents";
import ManageMenu from "../components/AdminComponents/ManageMenu";
import NavbarWdivs from "../components/NavbarWdivs";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import CurrentOrders from "../components/AdminComponents/CurrentOrders";
import CompletedOrders from "../components/AdminComponents/CompletedOrders";
// import { Button } from 'reactstrap'

// import { Link } from "react-router-dom";

class Admin extends Component {
  state = {
    orders: [],
    accepted: false,
    completed: false,
  };

  render() {
    return (
      <>
        <div className="card mb-3">
          <div className="row search-bars-input">
            <div className="col-12 ">
              <h2>The Leaky Faucet</h2>
              <p>123 Easy St. Atlanta, GA</p>
              <Collapsible accordion className="list">
                <CurrentOrders />
                <CompletedOrders />
                <ManageEvents />
                <CollapsibleItem
                  icon={<Icon>arrow_drop_down</Icon>}
                  header={
                    <div>
                      Store Information
                      <span className="new badge right-align">12</span>
                    </div>
                  }
                  node="div"
                  id="collapsible-item"
                >
                  nothing yet
                </CollapsibleItem>
                <ManageMenu />
              </Collapsible>
            </div>
          </div>
        </div>{" "}
        <NavbarWdivs />
      </>
    );
  }
}

export default Admin;
