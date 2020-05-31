import React from "react";
import { connect } from "react-redux";
import OnMyWayBtn from "../OnMyWayBtn";
import PartyOptions from "./PartyOptions";
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
          {props.admin.drinks.length > 0 ? (
            <div className="row horizontal-scroll">
              {props.admin.drinks.map((drink, i) => (
                <div class="card-panel row">
                  <img alt={drink.drinkName} src={drink.drinkThumb} className="col s1 panel-thumb" />
                  <div className="col-10">
                    <h6 className="row btm-0">{drink.drinkName}</h6>
                    <div className="row btm-0">${drink.drinkPrice}</div>
                    <em className="row btm-0">{drink.description}</em>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h5 className="col-md-9">
              No Featured Drinks, but your welcome to order from our Full
              Service Bar
            </h5>
          )}
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
