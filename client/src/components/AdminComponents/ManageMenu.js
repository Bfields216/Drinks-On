import React, { Component } from "react";
import { connect } from "react-redux";
import { CollapsibleItem, Icon, TextInput } from "react-materialize";
import { storeItem } from "../../actions/adminActions";

class ManageMenu extends Component {
  state = {
    toggle: false,
    itemName: null,
    itemPrice: null,
    itemDescription: null,
    itemThumb: null,
    instructions: null,
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
      drinkId: Math.random().toString(36).substr(2, 5), 
      drinkThumb: this.state.itemThumb,
      drinkName: this.state.itemName,
      drinkPrice: this.state.itemPrice,
      ingredients: [],
      instructions: this.state.instructions,
      description: this.state.itemDescription,
      quantity: 1
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
            <div class="card-panel row">
            <img alt={drink.drinkName} src={drink.drinkThumb} className="col s1 panel-thumb" />
            <div className="col-10">
            <h6 className="row btm-0">{drink.drinkName}</h6>
            <div className="row btm-0">${drink.drinkPrice}</div>
            <em className="row btm-0">{drink.description}</em>
            </div>
            <div
              className="btn-small"
              // onClick={() => this.createOrder(drink)}
            >
              Edit
            </div>
          </div>
          ))}
        </div>
        <div className="btn-small" onClick={this.toggle}>
          Add New Item
        </div>
        {this.state.toggle ? (
          <>
            <div className="row create-event">
              <TextInput
                id="itemName"
                label="Item Name"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="row create-event">
              <TextInput
                id="itemThumb"
                label="Add image link for this item"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="row  create-event">
              <TextInput
                id="itemPrice"
                label="Price"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="row  create-event">
              <TextInput
                id="itemDescription"
                label="Description"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="row create-event">
              <TextInput
                id="instructions"
                label="Include instructions on how to make this item"
                onChange={this.handleInputChange}
              />
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
  user: state.user,
  bars: state.bars,
  admin: state.admin,
});
export default connect(mapStateToProps, { storeItem })(ManageMenu);
