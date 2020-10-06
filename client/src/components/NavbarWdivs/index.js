import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
// import { Nav, NavItem, NavLink } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCocktail,
  faMapMarkerAlt,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
// import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(
  // fab,
  // fad,
  faMapMarkerAlt,
  faCocktail,
  faHome,
  faBars
);
// Using the datalist element we can create autofill suggestions based on the props.breeds array
function NavbarWdivs(props) {
  return (
    <div className="fixed-bottom">
      <div id="bottom-nav" className="row m-0">
        <Link
          id="link"
          to="/"
          className="col-sm-3 text-center h3 p-3 m-0 "
        >
          <div>Home</div>
          <FontAwesomeIcon
            icon={faHome}
            size="2x"
            // style={{ '--fa-primary-color': 'red' }}
          />
        </Link>
        <Link
          id="link"
          to="/bars"
          className="col-sm-3 text-center h3 p-3 m-0"
        >
          <div>Bars</div>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="2x"
            // style={{ '--fa-primary-color': 'red' }}
          />
        </Link>
        <Link
          id="link"
          to="/OrderDrinks"
          className="col-sm-3 text-center h3 p-3 m-0"
        >
          <div>Drinks</div>
          <FontAwesomeIcon
            icon={faCocktail}
            size="2x"

            // style={{ '--fa-primary-color': 'red' }}
          />
        </Link>
        <Link
          id="link"
          to="/admin"
          className="col-sm-3 text-center h3 p-3 m-0"
        >
          <div>Admin</div>
          <FontAwesomeIcon
            icon={faBars}
            size="2x"

            // style={{ '--fa-primary-color': 'red' }}
          />
        </Link>
      </div>
    </div>
  );
}
export default NavbarWdivs;
