import React, { Component } from "react";
import NavbarWdivs from "../components/NavbarWdivs";
import Axios from "axios";
import GoogleMapReact from "google-map-react";
import MapFlag from "../components/MapFlag/MapFlag";
import CheckinBtn from "../components/CheckinBtn";
import CheckoutBtnLB from "../components/CheckOutBtnLB";
import API from "../utils/API";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  ListGroup, ListGroupItem } from 'reactstrap';



// const AnyReactComponent = ({ text }) => <div style={{ color: 'red'}}>{text}</div>;

// API key AIzaSyAlHrNlmCS8c70eIYOlfkD6JijDgE5sfOc

class Bars extends Component {
  state = {
    bars: [],
    currentBars: [],
    users: [],
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
  static propTypes = {
    auth: PropTypes.object.isRequired
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
    if (this.props.auth.isAuthenticated) {
      const username = this.props.auth.user.name;
      event.preventDefault();
      const index = event.target.id;
      let currentBars = this.state.currentBars;
      const foundBar = this.state.bars[index];
      currentBars.push(foundBar);
      this.setState({
        currentBars
      });
      console.log(currentBars[0].name)
      Axios
        .put('/api/users/checkinBar', {
          userId: username,
          barName: currentBars[0].name
        })
        .then(res =>
          console.log(res)
        )
        .catch(err => {
          console.log(err);
        });
      Axios
        .get(`/api/users/${currentBars[0].name}`)
        .then(res => {
          console.log(res);
          this.setState({
          users: res.data.data
          });
          console.log(this.state.users)
        })
        .catch(err => {
          console.log(err);
        });  
    } else {
      this.props.history.push("/");
    }
  };

  checkout = event => {
    event.preventDefault();
    const username = this.props.auth.user.name;
    this.setState({currentBars: []})
    Axios
        .put('/api/users/checkinBar', {
          userId: username,
          barName: "null"
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err);
        });
  };
  
 


  render() {
    return (
      <>
     <div className="card mb-3">
<div className="card-img-top" id="map">
    
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
         
          
          <div className="row">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Bars Near You</h5>
                    <ListGroup className="list">
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
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Current Location</h5>
                    <ListGroup className="list" >
                    <ListGroupItem>
                    {this.state.currentBars.map((bar, index) => (
                      <div className="row border" key={bar.id}>
                        <div className="col-md-8">
                          <div className="bar-name">{bar.name}</div>
                          <p>{bar.formatted_address}</p>
                          <h6>There are currently {this.state.users.length} drinkers at this location.</h6>
                          {this.state.users.map((user, index) => (
                        <div className="row border" key={index}>
                          <div className="col-md-8">
                            <h6>{user.name}</h6>
                          </div>
                        </div>
                      ))}
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
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateToProps, 
  null
  )(Bars);


