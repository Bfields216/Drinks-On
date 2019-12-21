import React, { Component } from "react";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from './components/AppNavbar';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrderDrinks from "./containers/OrderDrinks";

import Checkin from "./containers/Checkin";
import LocalBars from "./containers/Lbars";
import OrderSummary from "./containers/OrderSummary";
import Bartender from "./containers/Bartender";

// import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/authActions';

import Home from "./containers/Home";

import "./index.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      
      <Provider store={store}>
        <Router>
        <AppNavbar />
          
         
        
          <Route exact path="/" component={Home} />
  
          <Switch>
        
            <Route exact path="/Bars" component={LocalBars} />
           
            <Route path="/Bartender" component={Bartender} />
            
            <Route path="/summary" component={OrderSummary} />
            <Route path="/checkin" component={Checkin} />
            <Route path="/orderDrinks" component={OrderDrinks} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
