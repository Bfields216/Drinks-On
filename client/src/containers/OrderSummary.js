import React, { Component } from "react";
import axios from "axios";
import NavbarWdivs from "../components/NavbarWdivs";
import { Collection, CollectionItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
let userId = "";

class OrderSummary extends Component {
  state = {
    drinks: [],
    currentOrder: [],
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    axios
      .get("/api/drinks/order-summary")
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          drinks: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/api/drinks/order-summary/${userId}`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          currentOrder: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeDrink = (event) => {
    event.preventDefault();
    const id = event.target.id;
    console.log(id);
    const drinkToBeRemoved = this.state.drinks[id]._id;
    axios
      .delete(`/api/drinks/order-summary/drink/${drinkToBeRemoved}`)
      .then((response) => {
        console.log(response);
        alert("Drink has been removed");
        this.props.history.push("/summary");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create: " + err.message);
      });
    let drinksCopy = Array.from(this.state.drinks);
    if (id !== -1) {
      drinksCopy.splice(id, 1);
      this.setState({ drinks: drinksCopy });
    }
    // }
  };
  calculateTotal = () => {
    let total = 0;
    this.state.drinks.map((drink) => {
      total = total + drink.drinkPrice;
      return total
    });
    return total;
  };
  changeMeasure(id, name, value) {
    // const { name, id, value } = event.target;
    console.log(name);
    console.log(id);
    console.log(value);
    this.setState((state) => {
      const list1 = state.drinks.map((item, j) => {
        if (parseInt(id) === parseInt(j)) {
          console.log(item);
          const list2 = item.ingredients.map((ingredient, i) => {
            if (parseInt(i) === parseInt(name)) {
              if (value === "+") {
                ingredient["measure"] = parseInt(ingredient.measure) + 1;
              } else if (value === "-") {
                ingredient["measure"] = parseInt(ingredient.measure) - 1;
              }
              return ingredient;
            } else {
              return ingredient;
            }
          });
          return list2;
        } else {
          return item;
        }
      });
      console.log(list1);
      return list1;
      // this.props.history.push("/summary");
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.drinks);

    if (this.props.auth.isAuthenticated) {
      const username = this.props.auth.user.name;
      const newOrder = {
        name: username,
        order: this.state.drinks,
      };
      console.log(newOrder);
      axios
        .post("/api/drinks/order-summary", newOrder)
        .then((response) => {
          console.log(response.data.data._id);
          userId = response.data.data._id;
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to create: " + err.message);
        });
      this.state.drinks.map((drink, i) => {
        axios
          .delete(`/api/drinks/order-summary/drink/${drink._id}`)
          .then((response) => {
            console.log(response);
            this.props.history.push("/summary");
          })
          .catch((err) => {
            console.log(err);
            alert("Failed to create: " + err.message);
          });
          return null
      });
      this.setState({ drinks: [] });
    } else {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <>
        <div className="row btm-0 summary-header valign-wrapper">
          <div className="col-sm-1">
            <Icon>arrow_back</Icon>
          </div>
          <div className="col-sm-4">
            <h3 className="row btm-0">Order Summary</h3>
            <h4 className="row btm-0 green-text">
              Total:${this.calculateTotal()}
            </h4>
          </div>
          <div className="col-sm-2">
            <div
              className="btn-small btn-block green"
              onClick={this.handleFormSubmit}
            >
              Place Order
            </div>
          </div>
        </div>

        <Collection id="summary-collection" className=" drink-list">
          {this.state.drinks.map((drink, index) => (
            <>
              <CollectionItem
                key={index}
                id={drink.id}
                className="row avatar summary-collection-header valign-wrapper"
              >
                <h4 className="col-sm-2">{drink.drinkName}</h4>
                <h5 className="col-sm-2">
                  ${drink.drinkPrice ? drink.drinkPrice : 1}.00
                </h5>
                <div
                  className="btn-small red right"
                  id={index}
                  onClick={this.removeDrink}
                >
                  Remove
                </div>
              </CollectionItem>
              <CollectionItem
                key={drink.id}
                id={drink.id}
                className="row avatar order-collection-item"
              >
                <div className="col-sm-2">
                  <img
                    className="circle drink"
                    src={drink.drinkThumb}
                    alt={drink.drinkName}
                  />
                </div>
                {drink.ingredients.length > 1 ? (
                  <ul className="col-sm-2 summary-ingredients">
                    {drink.ingredients.map((ingredient, i) => (
                      <li
                        key={i}
                        className="row btm-0 summary-ingredients-list"
                      >
                        <div
                          className="ingredient-icon black-text summary-ingredients-list-item"
                          onClick={() => this.changeMeasure(index, i, "+")}
                        >
                          <Icon className="ingredient-icon">
                            add_circle_outline
                          </Icon>
                        </div>
                        <h6 className="btm-0 summary-ingredients-list-item">
                          {ingredient.measure} {ingredient.name}
                        </h6>
                        <div
                          className="ingredient-iconblack-text summary-ingredients-list-item"
                          onClick={() => this.changeMeasure(index, i, "-")}
                        >
                          <Icon className="ingredient-icon">
                            remove_circle_outline
                          </Icon>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="col-sm-2">{drink.description}</div>
                )}
              </CollectionItem>
            </>
          ))}
        </Collection>
        <NavbarWdivs />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(OrderSummary);
