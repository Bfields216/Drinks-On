import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SearchForm from "../components/DrinkComponents/SearchForm";
import OrderBtn from "../components/DrinkComponents/OrderBtn";
import NavbarWdivs from "../components/NavbarWdivs";
import Quantity from "../components/DrinkComponents/Quantity";
import { Collection, CollectionItem } from "react-materialize";
const cors = require("cors");
class OrderDrinks extends Component {
  state = {
    drinks: [],
    currentOrder: [],
    searchQuery: "",
  };

  componentDidMount() {
    if (this.props.location.featuredDrink) {
      let featuredDrink = this.props.location.featuredDrink;
      console.log(featuredDrink);
      this.setState(
        (prevState) => (
          { drinks: [...prevState.drinks, featuredDrink] }
        )
      );
    }
  }
  addDrink = (id, name) => {
    // event.preventDefault();
    // const id = event.target.id;
    let updateQuantity = this.state.currentOrder;
    let trigger = false;
    const newDrink = {
      drinkId: this.state.drinks[id].idDrink,
      drinkThumb: this.state.drinks[id].strDrinkThumb,
      drinkName: this.state.drinks[id].strDrink,
      drinkPrice: 5,
      ingredients: [
        {
          name: this.state.drinks[id].strIngredient1,
          measure: parseInt(this.state.drinks[id].strMeasure1),
        },
        {
          name: this.state.drinks[id].strIngredient2,
          measure: parseInt(this.state.drinks[id].strMeasure2),
        },
        {
          name: this.state.drinks[id].strIngredient3,
          measure: parseInt(this.state.drinks[id].strMeasure3),
        },
        {
          name: this.state.drinks[id].strIngredient4,
          measure: parseInt(this.state.drinks[id].strMeasure4),
        },
        {
          name: this.state.drinks[id].strIngredient5,
          measure: parseInt(this.state.drinks[id].strMeasure5),
        },
      ],
      instructions: this.state.drinks[id].strInstructions,
      quantity: 1,
    };
    console.log(newDrink);
    this.state.currentOrder.map((order, index) => {
      if (order.drinkId === newDrink.drinkId) {
        console.log(order.quantity);
        order.quantity++;
        trigger = true;
        return trigger;
      } else {
        trigger = false;
        return trigger
      }
    });
    if (!trigger) {
      let currentOrder = this.state.currentOrder;
      console.log("NEW!");
      currentOrder.push(newDrink);
      this.setState({
        currentOrder,
      });
      console.log(this.state.currentOrder);
    } else {
      console.log(updateQuantity, "updateQuantity");
      this.setState({ currentOrder: updateQuantity });
    }
  };

  addFeaturedDrink = (drink) => {
    console.log(drink);
    axios
      .post("api/drinks/new", drink)
      .then((response) => {
        console.log(response);
        this.props.history.push("/summary");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create: " + err.message);
      });
  };
  createOrder = () => {
    console.log(this.state.currentOrder);
    axios
      .post("api/drinks/new", this.state.currentOrder)
      .then((response) => {
        console.log(response);
        this.props.history.push("/summary");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create: " + err.message);
      });
  };

  displayAmount = (id) => {
    // const id = event.target.id;
    let amount = this.state.currentOrder.find(
      (current) => current.drinkId === id
    );
    if (!amount) {
      return 0;
    } else {
      return amount.quantity;
    }
  };

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          this.state.searchQuery,
        cors()
      )
      .then((drinks) => {
        console.log(drinks);
        if (drinks.data.drinks) {
        this.setState({ drinks: drinks.data.drinks });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
          <div className="col">
            <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            />
          </div>
          <div className="col">
            {this.props.admin.drinks.length > 0 ? (
              <>
                <h4>Featured Drinks:</h4>
                <div className="row horizontal-scroll">
                {this.props.admin.drinks.map((drink, i) => (
                  <div key={i} class="card-panel row">
                    <img alt={drink.drinkName} src={drink.drinkThumb} className="col s1 panel-thumb" />
                    <div className="col-10">
                    <h6 className="row btm-0">{drink.drinkName}</h6>
                    <div className="row btm-0">${drink.drinkPrice}</div>
                    <em className="row btm-0">{drink.description}</em>
                    </div>
                    <div
                      className="btn-small"
                      onClick={() => this.addFeaturedDrink(drink)}
                    >
                      Order
                    </div>
                  </div>
                ))}
                </div>
              </>
            ) : (
              <h5 className="col-md-9">
                No Featured Drinks, but your welcome to order from our Full
                Service Bar
              </h5>
            )}
          </div>
          <OrderBtn createOrder={this.createOrder} />

          <Collection id="order-collection" className="col">
            {this.state.drinks.map((drink, index) => (
              <CollectionItem
              key={index}
              id={drink.idDrink}
              className="row avatar order-collection-item"
            >
                      <div className="col-sm-1">
                        <img
                          className="circle"
                          src={drink.strDrinkThumb}
                          alt={drink.strDrinkName}
                        />
                      </div>
                      <h5 className="col-sm-4">
                        {drink.strDrink}
                        <div>$5.00</div>
                        <Quantity
                  id={index}
                  name={drink.idDrink}
                  addDrink={this.addDrink}
                  drinkId={drink.idDrink}
                  displayAmount={this.displayAmount}
                />
                      </h5>
                  <ul className="col-sm-3">
                          <li><h6 >{drink.strIngredient1}</h6></li>
                          <li><h6 >{drink.strIngredient2}</h6></li>
                          <li><h6 >{drink.strIngredient3}</h6></li>
                          <li><h6 >{drink.strIngredient4}</h6></li>
                      </ul>
                
                
               </CollectionItem> 
            ))}
            
              </Collection>
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
export default connect(mapStateToProps, null)(
  OrderDrinks
);
