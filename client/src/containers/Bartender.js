import React, { Component } from "react";
import axios from "axios";
import BarAcceptOrderBtn from "../components/BarAcceptOrderBtn";
import BarCompleteOrderBtn from "../components/BarCompleteOrderBtn";
import DrinkInstructions from "../components/DrinkInstructions";
// import { Button } from 'reactstrap'

// import { Link } from "react-router-dom";

class Bartender extends Component {
  state = {
    orders: [],
    accepted: false,
    completed: false
  };

  componentDidMount() {
    axios
      .get("/api/drinks/bartender/orders")
      .then(response => {
        console.log(response);
        this.setState({
          orders: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({ loaded: true });
  }

  acceptOrder = event => {
    event.preventDefault();
    const orderId = event.target.id;
    let orders = this.state.orders;
    orders[orderId].accepted = true;
    this.setState({ orders }, () => {
      console.log(this.state.orders);
    });
  };

  completeOrder = event => {
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
      .then(response => {
        console.log(response);
        if (response.data.error) {
          alert("Failed to create" + response.data.message);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Drinkson</h1>
        <div className="row">
          <div className="col-md-8">
            {this.state.orders.map((order, index) => (
              <div key={index}>
                {order.completed ? (
                  <div></div>
                ) : (
                  <div>
                    {order.accepted ? (
                      <div>
                        <div className="col">
                          <h1>{order.name}</h1>
                        </div>
                        {order.order.map((drink, index) => (
                          <div className="row border" key={index}>
                            <div className="col-md-2 border">
                              <img
                                className="w-100"
                                src={drink.drinkThumb}
                                alt={drink.drinkName}
                              />
                            </div>
                            <div className="col-md-5">
                              <div className="row">
                                <h2>{drink.drinkName}</h2>
                              </div>
                              <DrinkInstructions buttonLabel="Instructions" className="bg-dark" drinkname={drink.drinkName} instructions={drink.instructions}/>
                            </div>
                            <div className="col-md-3">
                              {drink.ingredients.map((ingredient, i) => (
                                <div key={i}>
                                  <div className="col">
                                    <h5>
                                      {ingredient.measure} {ingredient.name}
                                    </h5>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <BarCompleteOrderBtn
                          index={index}
                          value={order._id}
                          completeOrder={this.completeOrder}
                        />
                      </div>
                    ) : (
                      <BarAcceptOrderBtn
                        orderName={order.name}
                        numOfDrinks={order.order.length}
                        index={index}
                        acceptOrder={this.acceptOrder}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="col-md-4">
            {this.state.orders.map((order, index) => (
              <div key={index}>
                {order.completed ? (
                  <div className="row">
                    <div className="col-md-6">
                      <h1>{order.name}</h1>
                    </div>
                    <div className="col-md-4">
                    {order.order.length
                    }</div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Bartender;
