import React, { Component } from "react";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import OrderBtn from "../components/OrderBtn";
import NavbarWdivs from "../components/NavbarWdivs";
import Quantity from "../components/Quantity";
import { Jumbotron } from "reactstrap";
import { Container } from "react-bootstrap";
const cors = require("cors");
class OrderDrinks extends Component {
  state = {
    drinks: [],
    currentOrder: [],
    searchQuery: ""
  };

  componentDidMount() {
    // this.getDrinks();
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
      ingredients: [
        {
          name: this.state.drinks[id].strIngredient1,
          measure: parseInt(this.state.drinks[id].strMeasure1)
        },
        {
          name: this.state.drinks[id].strIngredient2,
          measure: parseInt(this.state.drinks[id].strMeasure2)
        },
        {
          name: this.state.drinks[id].strIngredient3,
          measure: parseInt(this.state.drinks[id].strMeasure3)
        },
        {
          name: this.state.drinks[id].strIngredient4,
          measure: parseInt(this.state.drinks[id].strMeasure4)
        },
        {
          name: this.state.drinks[id].strIngredient5,
          measure: parseInt(this.state.drinks[id].strMeasure5)
        }
      ],
      glass: this.state.drinks[id].strGlass,
      instructions: this.state.drinks[id].strInstructions,
      quantity: 1
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
      }
    });
    if (!trigger) {
      let currentOrder = this.state.currentOrder;
      console.log("NEW!");
      currentOrder.push(newDrink);
      this.setState({
        currentOrder
      });
      console.log(this.state.currentOrder);
    } else {
      console.log(updateQuantity, "updateQuantity");
      this.setState({ currentOrder: updateQuantity });
    }
  };

  createOrder = event => {
    console.log(this.state.currentOrder);
    axios
      .post("/api/drinks/new", this.state.currentOrder)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
        alert("Failed to create: " + err.message);
      });
  };

  displayAmount = id => {
    // const id = event.target.id;
    console.log(id);
    let amount = this.state.currentOrder.find(
      current => current.drinkId === id
    );
    if (!amount) {
      console.log(0);
      return 0;
    } else {
      console.log(amount.quantity);
      return amount.quantity;
    }
  };

  handleInputChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          this.state.searchQuery,
        cors()
      )
      .then(drinks => {
        console.log(drinks);
        this.setState({ drinks: drinks.data.drinks });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <Jumbotron className="list-container">
          <Container className="search">
            <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            />
            <OrderBtn createOrder={this.createOrder} />
          </Container>
          <Container className="drink-list">
            {this.state.drinks.map((drink, index) => (
              <div className="row border" key={drink.idDrink}>
                <div id="each-row" className="col-md-2 border">
                  <img
                    className="w-100"
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                  />
                </div>
                <div id="drink-content" className="col-md-6">
                  <h3>{drink.strDrink}</h3>
                  <p>
                    
                      {" "}
                      {drink.strIngredient1}, {drink.strIngredient2},{" "}
                      {drink.strIngredient3}, {drink.strIngredient4}{" "}
                    
                  </p>
                </div>
                <Quantity
                  id={index}
                  name={drink.idDrink}
                  addDrink={this.addDrink}
                  drinkId={drink.idDrink}
                  displayAmount={this.displayAmount}
                />
              </div>
            ))}
          </Container>
        </Jumbotron>
        <NavbarWdivs />
      </>
    );
  }
}

export default OrderDrinks;