import React from "react";
import { connect } from "react-redux";
import { CollapsibleItem, Icon } from "react-materialize";
import {toggleModal, setOMW} from "../../actions/userActions"

function BarInfo(props) {
  const omw = (barName) => {
    props.setOMW(barName);
    props.toggleModal("omw");
  }
  return (
    <CollapsibleItem
      expanded
      icon={<Icon>arrow_drop_down</Icon>}
      className="bar-info-collapsible"
      header={
        <h5>
          {props.bar.name}
          <span className="new badge right-align">
            {props.bar.users.length}
          </span>
        </h5>
      }
      node="div"
      id="collapsible-item"
    >
      <div className="row bar-info">
        <div className="col-md-8" key={props.bar.id}>
          <h5>{props.bar.name}</h5>
          <p>{props.bar.address}</p>

          <span className="red-text brand-font">
            Drinkers: {props.bar.users.length}
          </span>
          {"  "}
          <span className="orange-text brand-font">
            OMW!: {props.bar.omw.length}
          </span>
        </div>
        <div className="col-md-3 row">
          {/* {props.user.isAuthenticated ? (<> */}
          <div
            className="btn-small col-12 mb-2"
            onClick={() => props.toggleModal("partyOptions")}
          >
            Check In
          </div>
          <div
            className="btn-small col-12"
            onClick={() => omw(props.bar.name)}
          >
            On Your Way?
          </div>
          {/* </>) : (
            <div className="btn-small" onClick={toggle}>
        Login
        <LoginModal isOpen={this.state.openLogin} toggle={this.toggleLogin} />
        <RegisterModal isOpen={this.state.openRegister} toggle={this.toggleRegister}/>
      </div>)
          }
} */}
        </div>
      </div>
      <div className="row bar-info">
        <div className="col-md-7">
          <h6>Featured Drinks</h6>
          {props.admin.drinks.length > 0 ? (
            <div className="row horizontal-scroll">
              {props.admin.drinks.map((drink, i) => (
                <div class="card-panel drinks row">
                  <img
                    alt={drink.drinkName}
                    src={drink.drinkThumb}
                    className="bar-drinks-img"
                  />
                  <div className="col">
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
                  <div class="card-panel events">
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
  user: state.user,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, {toggleModal, setOMW})(BarInfo);
