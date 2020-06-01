import React, { Component } from "react";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrderDrinks from "./containers/OrderDrinks";

import Checkin from "./containers/Checkin";
import LocalBars from "./containers/Lbars";
import OrderSummary from "./containers/OrderSummary";
import Admin from "./containers/Admin";
import BarView from "./components/BarComponents/BarView";
// import { setCurrentUser, logoutUser } from "./actions/userActions";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userActions";

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
            <Route exact path="/bars" component={LocalBars} />
            <Route path="/barView" component={BarView} />
            <Route path="/admin" component={Admin} />

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
