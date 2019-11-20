import React, { Component } from "react";
// import "./style.css";

class Quantity extends Component {
  state = {
    quantity: 0
  };
  componentDidMount(props) {
    console.log(this.props.name)
    let drinkId = this.props.name;
    this.setState({ quantity: this.props.displayAmount(drinkId) });
  }
  handleClick() {
    let drinkId = this.props.name;
    this.props.addDrink(this.props.id,this.props.name);
    this.setState({ quantity: this.props.displayAmount(drinkId) });
  }

  render() {
    return  (
    <>   
    <div className="col-md-3">
      <button
        className="general-btn btn-outline-mdb-color"
        id={this.props.id}
        name={this.props.name}
        onClick={this.handleClick.bind(this)}
      >
      Add 
      
      </button>
      <span id="quantity" className="col-md-1">{this.state.quantity}</span>
      </div>
      </>
      );
  }
}

export default Quantity;