import React, { Component } from "react";
import { connect } from "react-redux";
import { CollapsibleItem, Icon, DatePicker } from "react-materialize";
import { storeEvent } from "../../actions/adminActions";
import axios from "axios";

class ManageEvents extends Component {
  state = {
    toggle: false,
    eventName: null,
    eventDate: null,
    eventHost: null,
    eventPrice: null,
    eventLink: null,
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
  createNewEvent = async () => {
    let newEvent = {
      name: this.state.eventName,
      date: this.state.eventDate,
      host: this.state.eventHost,
      price: this.state.eventPrice,
      link: this.state.eventLink,
    };
    console.log(newEvent);
    await this.props.storeEvent(newEvent);
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
            Manage Events
            <span className="new badge right-align">12</span>
          </h4>
        }
        node="div"
        id="collapsible-item"
      >
        <h5>Upcoming Events:</h5>
        <div className="row horizontal-scroll">
          {this.props.admin.events.map((event, i) => (
            <div class="card-panel col-sm-1">
              <h6 className="row btm-0">{event.name}</h6>
              <div className="row btm-0">{event.date}</div>
              <div className="btn-small">Edit</div>
            </div>
          ))}
        </div>
        <div className="btn-small" onClick={this.toggle}>
          Create New Event
        </div>
        {this.state.toggle ? (
          <>
            <div className="row create-event">
              <div class="input-field col s12">
                <input id="eventName" onChange={this.handleInputChange} />
                <label for="eventName">Event Name</label>
              </div>
            </div>
            <div className="row create-event">
              <div class="input-field col s12">
                <DatePicker />
              </div>
            </div>
            <div className="row  create-event">
              <div class="input-field col s12">
                <input id="eventHost" onChange={this.handleInputChange} />
                <label for="eventHost">Host</label>
              </div>
            </div>
            <div className="row  create-event">
              <div class="input-field col s12">
                <input id="eventPrice" onChange={this.handleInputChange} />
                <label for="eventPrice">Host</label>
              </div>
            </div>
            <div className="row  create-event">
              <div class="input-field col s12">
                <input id="eventLink" onChange={this.handleInputChange} />
                <label for="eventLink">Link/Social Media</label>
              </div>
            </div>
            <button onClick={this.createNewEvent} className="btn" type="button">
              Create
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
export default connect(mapStateToProps, { storeEvent })(ManageEvents);
