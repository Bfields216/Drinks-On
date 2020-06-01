import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CollapsibleItem,
  Icon,
  Collapsible,
  Collection,
  CollectionItem,
} from "react-materialize";
import { storeItem } from "../../actions/adminActions";
import axios from "axios";
import DrinkInstructions from "../DrinkComponents/DrinkInstructions";

class CurrentOrders extends Component {
  state = {
    toggle: false,
    itemName: null,
    itemPrice: null,
    itemDescription: null,
    orders: [],
    searchQuery: "",
  };

  componentDidMount() {
    axios
      .get("/api/drinks/bartender/orders")
      .then((response) => {
        console.log(response);
        this.setState({
          orders: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ loaded: true });
  }
  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
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

  addNewItem = async () => {
    let newItem = {
      name: this.state.itemName,
      price: this.state.itemPrice,
      description: this.state.itemDescription,
    };
    console.log(newItem);
    await this.props.storeItem(newItem);
    console.log(this.props.admin);
    this.toggle();
  };
  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  };

  render() {
    return (
      <CollapsibleItem
        icon={<Icon>arrow_drop_down</Icon>}
        header={
          <h4>
            Current Orders
            <span className="new badge right-align">12</span>
          </h4>
        }
        node="div"
        id="orders-collapsible"
      >
        <Collapsible accordion className="list">
          {this.state.orders.map((order, index) =>
            order.completed ? (
              <></>
            ) : (
              <CollapsibleItem
                key={index}
                header={
                  <h5>
                    {order.name}
                    <span className="new badge">{order.order.length}</span>
                  </h5>
                }
                id="orders-collapsible-item"
                node="div"
              >
                <Collection id="order-collection" className="col">
                  {order.order.map((drink, index) => (
                    <CollectionItem
                      key={index}
                      id={drink.id}
                      className="row avatar order-collection-item"
                    >
                      <div className="col-sm-1">
                        <img
                          className="circle"
                          src={drink.drinkThumb}
                          alt={drink.drinkName}
                        />
                      </div>
                      <h5 className="col-sm-4">
                        {drink.drinkName}
                        <h6>$5.00</h6>
                        <DrinkInstructions
                          buttonLabel="Instructions"
                          className="bg-dark"
                          drinkname={drink.drinkName}
                          instructions={drink.instructions}
                        />
                      </h5>
                      <ul className="col-sm-3">
                        {drink.ingredients.map((ingredient, i) => (
                          <li key={i}>
                            <h6 className="btm-0">
                              {ingredient.measure} {ingredient.name}
                            </h6>
                          </li>
                        ))}
                      </ul>
                    </CollectionItem>
                  ))}
                </Collection>
                <div className="col">
                  <div
                    id={index}
                    type="button"
                    className="btn-small blue btn-block"
                    onClick={this.completeOrder}
                  >
                    Complete Order
                  </div>
                </div>
              </CollapsibleItem>
            )
          )}
        </Collapsible>
      </CollapsibleItem>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, { storeItem })(CurrentOrders);
