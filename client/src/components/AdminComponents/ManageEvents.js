import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import { CollapsibleItem, Icon, DatePicker, TextInput } from "react-materialize";
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
  handleDateInput = (newDate) => {
    console.log(newDate)
    this.setState({
      eventDate: moment(newDate).format("MMM Do YYYY")
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
              <TextInput id="eventName" label="Event Name" onChange={this.handleInputChange} />
            </div>
            <div className="row create-event">
                <DatePicker value={this.state.eventDate} id="eventDate" onChange={(newDate) => this.handleDateInput(newDate)}/>
            </div>
            <div className="row  create-event">
            <TextInput id="eventHost" label="Host" onChange={this.handleInputChange}/>
            </div>
            <div className="row  create-event">
            <TextInput id="eventPrice" label="Cost" onChange={this.handleInputChange}/>
            </div>
            <div className="row  create-event">
            <TextInput id="eventLink" label="Link" onChange={this.handleInputChange}/>
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
