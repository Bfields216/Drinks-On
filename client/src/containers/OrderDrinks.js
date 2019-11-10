import React, { Component } from "react";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import OrderBtn from "../components/OrderBtn";
import NavbarWdivs from "../components/NavbarWdivs";
import TopNav from "../components/TopNavbar";
import { Jumbotron } from 'reactstrap';
import { Container } from "react-bootstrap";
const cors = require('cors');


class OrderDrinks extends Component {
  state = {
    drinks: [],
    currentOrder: [],
    searchQuery: ""
  };

  componentDidMount() {
    // this.getDrinks();
  }
  addDrink = event => {
    event.preventDefault();
    const id = event.target.id;
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
      instructions: this.state.drinks[id].strInstructions
    };
    console.log(newDrink);
    let currentOrder = this.state.currentOrder;
    currentOrder.push(newDrink);
    this.setState({
      currentOrder
    });
    console.log(this.state.currentOrder)
    // let currentAmt = 0;
    // this.state.currentOrder.map((order,index) => {
    //   if(order.drinkId === currentOrder[id].drinkId) {
    //    currentAmt++
    //   }
    // })
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
  
  displayAmount = event => {
    const id = event.target.id
    let amount = this.state.currentOrder.filter(current => current === id)
    return amount.length
  }

  handleInputChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          this.state.searchQuery, cors()
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
        <TopNav />
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
            <div className="col-md-2 border">
              <img
                className="w-100"
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
              />
            </div>
            <div className="col-md-6">
              <h1>{drink.strDrink}</h1>
              <p>
                <h5>
                  {" "}
                  {drink.strIngredient1}, {drink.strIngredient2},{" "}
                  {drink.strIngredient3}, {drink.strIngredient4}{" "}
                </h5>
              </p>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-primary btn-large w-100"
                id={index}
                onClick={this.addDrink}
              >
                Order
              </button>
            </div>
            <div
              className="col-md-1"
              id={drink.drinkId}
              displayAmount={this.displayAmount}
            >
              {/* {drink.amount})} */}
              </div>
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
