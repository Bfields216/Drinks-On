import React, { Component } from "react";
import { connect } from "react-redux";
import CheckinBtn from "../CheckinBtn";
import OnMyWayBtn from "../OnMyWayBtn";
import PartyOptions from "./PartyOptions"
import { CollapsibleItem, Icon } from "react-materialize";
// import { storeBars } from "../actions/barsActions";

function BarInfo(props) {
  return (
    <CollapsibleItem
      expanded
      icon={<Icon>arrow_drop_down</Icon>}
      header={
        <div>
          {props.bar.name}
          <span className="new badge right-align">
            {props.bar.users.length}
          </span>
        </div>
      }
      node="div"
      id="collapsible-item"
    >
      <div className="row">
        <div className="col-md-7" key={props.bar.id}>
          <h5>{props.bar.name}</h5>
          <p>{props.bar.address}</p>

          <span className="red-text">Drinkers: {props.bar.users.length}</span>
          {"  "}
          <span className="orange-text">OMW!: {props.bar.omw.length}</span>
        </div>
        <div className="col-md-5">
          <PartyOptions buttonLabel="Check-In" />
          <OnMyWayBtn />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6>Featured Drinks</h6>
          <div className="row horizontal-scroll">
            {props.admin.drinks.length > 0
              ? props.admin.drinks.map((drink, i) => (
                  <div class="card-panel col-sm-1">
                    <h6 className="row btm-0">{drink.name}</h6>
                    <div className="row btm-0">{drink.price}</div>
                    <em className="row btm-0">{drink.description}</em>
                  </div>
                ))
              : "This Bar has no featured drinks"}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6>Upcoming Events</h6>
          <div className="row horizontal-scroll">
            {props.admin.events.length > 0
              ? props.admin.events.map((event, i) => (
                  <div class="card-panel col-sm-1">
                    <h6 className="row">{event.name}</h6>
                    <div className="row">{event.date}</div>
                  </div>
                ))
              : "This Bar has no upcoming events"}
          </div>
        </div>
      </div>
    </CollapsibleItem>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, null)(BarInfo);
