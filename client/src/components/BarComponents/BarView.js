import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import NavbarWdivs from "../NavbarWdivs";
import PartyOptions from "./PartyOptions";
import SendMessage from "./SendMessage";
import { Collection, CollectionItem, Icon } from "react-materialize";
import { randomizeUsers, randomizePhotos } from "../../actions/adminActions";

import { Link } from "react-router-dom";

class BarView extends Component {
  state = {
    orders: [],
    accepted: false,
    completed: false,
  };

  async componentDidMount() {
    await this.props.randomizeUsers();
    await this.props.randomizePhotos();
    console.log(this.props.admin.users);
  }

  acceptOrder = (event) => {
    event.preventDefault();
    const orderId = event.target.id;
    let orders = this.state.orders;
    orders[orderId].accepted = true;
    this.setState({ orders }, () => {
      console.log(this.state.orders);
    });
  };

  completeOrder = (event) => {
    event.preventDefault();
    console.log(this.state.orders);
    // const orderid = event.target.orderid;
    // console.log(event.target)
    const index = event.target.id;
    let orders = this.state.orders;
    orders[index].completed = true;
    this.setState({ orders });
    console.log(this.state.orders);
    let orderid = orders[index]._id;
    this.updateOrder(index, orderid);
  };

  updateOrder(index, orderid) {
    axios
      .put(`api/drinks/bartender/orders/${orderid}`, this.state.orders[index])
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert("Failed to create" + response.data.message);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <div className="card mb-3">
          <div className="row bar-view-header-row">
            <div className="col-11">
              <h1 className="black-text">The Leaky Faucet</h1>
              <div className="row drinkers-text red-text h5">
                Total Drinkers: {this.props.admin.users.length}
              </div>
              <div className="row omw-text orange-text h5">
                OMW!: {this.props.admin.omw.length}
              </div>
              <div className="row btm-0">
                <div className="btn-small">Tap out</div>
              </div>
              <div className="row">
                <PartyOptions buttonLabel="Party Options" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4>Photos</h4>
              <div className="row horizontal-scroll">
                <Link to="/" className="">
                  <div class="card-panel col btn-large waves-effect waves-light grey bar-view-btn">
                    <div>Add </div>
                    <i className="material-icons">photo</i>
                  </div>
                </Link>
                {this.props.admin.photos.length > 0 ? (
                  this.props.admin.photos.map((photo, i) => (
                    <img src={photo.img} className="bar-view-photos" />
                  ))
                ) : (
                  <h5 className="col-md-9">No Photos..Yet!</h5>
                )}
              </div>
            </div>
            <div className="col-12">
              <h4>Drinks</h4>
              <div className="row horizontal-scroll">
                <Link to="/orderDrinks" className="">
                  <div class="card-panel col btn-large waves-effect waves-light grey bar-view-btn">
                    <div>order</div>
                    <i className="material-icons">local_bar</i>{" "}
                  </div>
                </Link>

                {this.props.admin.drinks.length > 0 ? (
                  this.props.admin.drinks.map((drink, i) => (
                    <div class="card-panel col-sm-1">
                      <h6 className="row btm-0">{drink.name}</h6>
                      <div className="row btm-0">{drink.price}</div>
                      <em className="row btm-0">{drink.description}</em>
                      <div className="btn-small">Order</div>
                    </div>
                  ))
                ) : (
                  <h5 className="col-md-9">
                    No Featured Drinks, but your welcome to order from our Full
                    Service Bar
                  </h5>
                )}
              </div>
            </div>
            <div className="col-12">
              <h4>Drinkers</h4>
              <div className="row">
                <Collection id="users-collection" className="col">
                  {this.props.admin.users.length > 0 ? (
                    this.props.admin.users.map((user, i) => (
                      <CollectionItem
                        key={i}
                        id={user.id}
                        className="row avatar"
                      >
                        <div className="col-sm-1">
                          <img alt="" className="circle" src={user.avatar} />
                        </div>
                        <div className="col-sm-7">
                          <h5 className="row btm-0">{user.name}</h5>
                          <div className="row valign-wrapper btm-0 party-buttons">
                            {user.party ? (
                              <div className="user-collection-item-icon btn">
                                <Icon>mood</Icon>Just Here To Party!{"  "}
                              </div>
                            ) : (
                              <div className="user-collection-item-icon btn disabled">
                                <Icon>mood</Icon>Just Here To Party!{"  "}
                              </div>
                            )}
                            {user.messages ? (
                              <SendMessage
                                disabled="false"
                                image={user.avatar}
                                name={user.name}
                              />
                            ) : (
                              <SendMessage
                                disabled="true"
                                image={user.avatar}
                                name={user.name}
                              />
                            )}
                            {user.buy_drinks ? (
                              <div className="user-collection-item-icon btn">
                                <Icon>local_bar</Icon>Buy Me a Drink{"  "}
                              </div>
                            ) : (
                              <div className="user-collection-item-icon btn disabled">
                                <Icon>local_bar</Icon>Buy Me a Drink{"  "}
                              </div>
                            )}
                          </div>
                        </div>
                      </CollectionItem>
                    ))
                  ) : (
                    <CollectionItem className="row s12 valign-wrapper">
                      No other Drinkers around
                    </CollectionItem>
                  )}
                </Collection>
              </div>
            </div>
          </div>
        </div>
        <NavbarWdivs />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, { randomizeUsers, randomizePhotos })(
  BarView
);
