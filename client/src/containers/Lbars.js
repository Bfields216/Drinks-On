import React, { Component } from "react";
import NavbarWdivs from "../components/NavbarWdivs";
import Axios from "axios";
import GoogleMapReact from "google-map-react";
import MapFlag from "../components/MapFlag/MapFlag";
import CheckinBtn from "../components/CheckinBtn";
import CheckoutBtnLB from "../components/CheckOutBtnLB";
import API from "../utils/API";
import {  Jumbotron, Container, ListGroup, ListGroupItem } from 'reactstrap';



// const AnyReactComponent = ({ text }) => <div style={{ color: 'red'}}>{text}</div>;

// API key AIzaSyAlHrNlmCS8c70eIYOlfkD6JijDgE5sfOc

class Bars extends Component {
  state = {
    bars: [],
    currentBars: [],
    // disabled: false,
  };
  static defaultProps = {
    center: {
      lat: 33.7756,
      lng: -84.3963
    },
    zoom: 13,
    // center: "uluru"
  };
  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const mapsurl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+Atlanta&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA`;

    Axios.get(proxyurl + mapsurl).then(response => {
      console.log(response);
      this.setState({
        bars: response.data.results
      });
      console.log(this.state.bars);
      
    });
  }

  // loadBars = () => {
  //   API.getBar()
  //     .then(res => this.setState({ name: res.data }))
  //     .catch(err => console.log(err));
  // };
  // handledisabled = () => {
  //  const disabled = this.state.disabled ? disabled: true;
   
  // }
  // constructor(props) {
  //   super(props);
  //   subscribeToTimer((err, timestamp) => this.setState({ 
  //     timestamp 
  //   }));
  // }

  deleteBars = id => {
    API.deleteBar(id)
      .then(res => this.loadBars())
      .catch(err => console.log(err));
  };

  checkin = event => {
    event.preventDefault();
    const index = event.target.id;
    let currentBars = this.state.currentBars;
    const foundBar = this.state.bars[index];
    currentBars.push(foundBar);
    this.setState({
      currentBars
    });   
  }

  checkout = event => {
    event.preventDefault();
    
    
    this.setState({currentBars: []});
  
  }

  render() {
    return (
      <>
      <div classname="card mb-3">
      <div classname="card-img-top" id="map">
    
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {this.state.bars.map((bar, index) => (
              <MapFlag
                key={index}
                lat={bar.geometry.location.lat}
                lng={bar.geometry.location.lng}
                text={bar.name}
              />
            ))}
          </GoogleMapReact>
          </div>
          <div className="card-body">
    
          <div className="row">
              <div className="col-sm-6">
               
                  
                    <h5 class="card-title">Bars Near You</h5>
                    <ListGroup className="list" fluid>
                    <ListGroupItem>
                      {this.state.bars.map((bar, index) => (
                        <div className="row border" key={bar.id}>
                          <div className="col-md-8">
                          <h5>{bar.name}</h5>
                          <p>{bar.formatted_address}</p>
                          </div>
                          {this.state.currentBars.length > 0 ? (""):(<CheckinBtn checkin={this.checkin} index={index}/>)  }
                        </div>
                      ))}
                      </ListGroupItem>
                      </ListGroup>
                  </div>
                
             
              <div className="col-sm-6">
  
                  <div className="card-body">
                    <h5 class="card-title">Current Location</h5>
                    <ListGroup className="list" fluid>
                    <ListGroupItem>
                    {this.state.currentBars.map((bar, index) => (
                      <div className="row border" key={bar.id}>
                        <div className="col-md-8">
                          <h5>{bar.name}</h5>
                          <p>{bar.formatted_address}</p>
                        </div>
                        <CheckoutBtnLB checkout={this.checkout}/>
                        </div>
                      ))}
                      </ListGroupItem>
                      </ListGroup>
                  </div>
                </div>
              </div>
              </div>
              </div>
          
      
        <NavbarWdivs />
    </>
    );
  }
}

export default Bars;


