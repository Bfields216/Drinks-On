import React, { Component } from "react";
import axios from "axios";
import CheckoutBtn from "../components/CheckoutBtn";
import { Button } from 'reactstrap'

// import { Link } from "react-router-dom";

class Bartender extends Component {
  state = {
    orders: [],
    loaded: false
  };

  componentDidMount() {
    axios
      .get("/bartender/orders")
      .then(response => {
        console.log(response);
        this.setState({
          orders: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    // await console.log(this.state.drinks);
    this.setState({ loaded: true });
  };

  removeDrink = event => {
    event.preventDefault();
    const id = event.target.id;
    const drinkToBeRemoved = this.state.drinks[id]._id;
    let shouldDelete = window.confirm(
      "Are you sure you want to delete this drink?"
    );
    if (shouldDelete === true) {
      axios
        .delete(`/order-summary/drink/${drinkToBeRemoved}`)
        .then(response => {
          console.log(response);
          alert("Drink has been removed");
          this.props.history.push("/summary");
        })
        .catch(err => {
          console.log(err);
          alert("Failed to create: " + err.message);
        });
      let drinksCopy = Array.from(this.state.drinks);
      if (id !== -1) {
        drinksCopy.splice(id, 1);
        this.setState({ drinks: drinksCopy });
      }
    }
  };

  changeMeasure = event => {
    const { name, id, value } = event.target;
    this.setState(state => {
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
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.drinks);
    event.preventDefault();
    const id = event.target.id;
    const newOrder = {
      name: "Jimmy",
      order: this.state.drinks
    };
    console.log(newOrder);
    
    axios
      .post("/order-summary", newOrder)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
        alert("Failed to create: " + err.message)
      });
    //     "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
    //       this.state.searchQuery
    //   )
    //   .then(drinks => {
    //     console.log(drinks);
    //     this.setState({ drinks: drinks.data.drinks });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  render() {
    return (
      <div>
        <h1>Drinkson</h1>
        {this.state.orders.map((order,index) =>
        <div className="row-fluid"> 
          <div className="col">
          {order.name}
          </div>
            {order.order.map((drink, index) =>
            <div class="row">
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
                <hr></hr>
                  <h4>{drink.instructions}</h4>
                </div>
              </div>
              <div className="col-md-3">
                {drink.ingredients.map((ingredient, i) => 
                    <div>
                      <div className="col">
                        <h5>{ingredient.measure}{" "}{ingredient.name}</h5>
                      </div>
                    </div>
                    )}
              </div>
            </div>
            )}
          )}
          </div>
        )}
        </div>
    )
  }
}

export default Bartender;
