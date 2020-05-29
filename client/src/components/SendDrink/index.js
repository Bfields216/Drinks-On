import React, { Component } from 'react';
import axios from "axios";
import SearchForm from "../SearchForm";
import OrderBtn from "../OrderBtn";
import Quantity from "../Quantity";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const cors = require("cors");

class SendDrinkModal extends Component {
  state = {
    modal: false,
    drinks: [],
    currentOrder: [],
    newOrder: [],
    searchQuery: "",
    submit: false
  };
  static propTypes = {
    auth: PropTypes.object.isRequired
  };


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  
  submit = () => {
    this.setState({
      submit: !this.state.submit
    });
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
    event.preventDefault();
    console.log(this.state.currentOrder);
    axios
      .post("api/drinks/new", this.state.currentOrder)
      .then(response => {
        console.log(response);
        // this.props.history.push('/summary');
      })
      .catch(err => {
        console.log(err);
        alert("Failed to create: " + err.message);
      });
    this.submitOrder();
    this.submit();
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
  submitOrder = event => {
  if (this.props.auth.isAuthenticated) {
    const username = this.props.auth.user.name;
    axios
      .get("/api/drinks/order-summary")
      .then(response => {
        console.log(response.data.data);
        this.setState({
          newOrder: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    const newOrder = {
      name: this.props.name,
      order: this.state.currentOrder
    };
    console.log(newOrder);
    axios
      .post("/api/drinks/order-summary", newOrder)
      .then(response => {
        console.log(response);
        let userId = response;
      })
      .catch(err => {
        console.log(err);
        alert("Failed to create: " + err.message);
      });
    this.state.drinks.map((drink, i) => {
      axios
        .delete(`/api/drinks/order-summary/drink/${drink._id}`)
        .then(response => {
          console.log(response);
          // this.props.history.push("/summary");
        })
        .catch(err => {
          console.log(err);
          alert("Failed to create: " + err.message);
        });
    });
    this.setState({ drinks: [] });
  } else {
    this.props.history.push("/");
  }; 
}


  render() {
    return (
      <div>
        <div className="button">
          <a className="effect1" href='#' onClick={this.toggle} id="x">
          Send Drink
          <span className="bg"></span>
          </a>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          
          <ModalHeader toggle={this.submit}>Login</ModalHeader>
          {!this.state.submit ? (
          <ModalBody>
          <SearchForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            />
          <OrderBtn createOrder={this.createOrder} />
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
          </ModalBody>
          ):(<ModalBody>
            Leave a short message here for the user"
            </ModalBody>)}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateToProps, 
  null
  )(SendDrinkModal);