import React, { Component } from "react";
import { connect } from "react-redux";
import { CollapsibleItem, Icon } from "react-materialize";
import { storeItem } from "../../actions/adminActions";
import axios from "axios";

class ManageMenu extends Component {
  state = {
    toggle: false,
    itemName: null,
    itemPrice: null,
    itemDescription: null,
    drinks: [],
    searchQuery: "",
  };

  //   componentDidMount() {
  //     API.drinks(this.props.match.params.id)
  //       .then((res) => this.setState({ drinks: drinks.data.drinks }))
  //       .catch((err) => console.log(err));
  //     console.log("This is working");

  //     getdrinkbyID = () => {
  //       axios
  //         .get("/api/drinks/" + this.props.match.params.id)
  //         .then((drinks) => {
  //           console.log(drinks);
  //           this.setState({
  //             model: drinks.data.data.model,
  //             color: drinks.data.data.color,
  //             year: drinks.data.data.year,
  //             imageURL: drinks.data.data.imageURL,
  //             _id: drinks.data.data._id,
  //           });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     };
  //   }
  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };
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
            Manage Menu
            <span className="new badge right-align">12</span>
          </h4>
        }
        node="div"
        id="collapsible-item"
      >
        <h5>Featured Items:</h5>
        <div className="row horizontal-scroll">
          {this.props.admin.drinks.map((drink, i) => (
            <div class="card-panel col-sm-1">
              <h6 className="row btm-0">{drink.name}</h6>
              <div className="row btm-0">{drink.price}</div>
              <em className="row btm-0">{drink.description}</em>
              <div className="btn-small">Edit</div>
            </div>
          ))}
        </div>
        <div className="btn-small" onClick={this.toggle}>
          Add New Item
        </div>
        {this.state.toggle ? (
          <>
            <div className="row create-event">
              <div class="input-field col s12">
                <input id="itemName" onChange={this.handleInputChange} />
                <label for="itemName">Item Name</label>
              </div>
            </div>
            <div className="row  create-event">
              <div class="input-field col s12">
                <input id="itemPrice" onChange={this.handleInputChange} />
                <label for="itemPrice">Price</label>
              </div>
            </div>
            <div className="row  create-event">
              <div class="input-field col s12">
                <input id="itemDescription" onChange={this.handleInputChange} />
                <label for="itemDescription">Description</label>
              </div>
            </div>

            <button onClick={this.addNewItem} className="btn" type="button">
              Add
            </button>
            <button onClick={this.toggle} className="btn red" type="button">
              Cancel
            </button>
          </>
        ) : (
          ""
        )}
      </CollapsibleItem>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, { storeItem })(ManageMenu);
