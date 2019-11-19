import React from "react";
import "./style.css";
// import { Nav, NavItem, NavLink } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCocktail,
  faMapMarkerAlt,
  faHome,
  faBars
} from '@fortawesome/free-solid-svg-icons'
// import { fad } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(
  // fab,
  // fad,
  faMapMarkerAlt,
  faCocktail,
  faHome,
  faBars
  
)
// Using the datalist element we can create autofill suggestions based on the props.breeds array
function NavbarWdivs(props) {
  return (
<div className="fixed-bottom">
    <div id="botton-nav" className="row m-0">
      <a id="link" href="/" className="col-sm-3 border text-center h3 p-3 m-0">
          Home
          <FontAwesomeIcon
              icon={faHome}
              size="3x"
              // style={{ '--fa-primary-color': 'red' }}
            />
      </a>
      <a id="link" href="/Bars" className="col-sm-3 border text-center h3 p-3 m-0">
          Bars
          <FontAwesomeIcon

              icon={faMapMarkerAlt}
              size="3x"
              // style={{ '--fa-primary-color': 'red' }}
            />
      </a>
      <a id="link" href="/OrderDrinks" className="col-sm-3 border text-center h3 p-3 m-0">
          Drinks
          <FontAwesomeIcon

              icon={faCocktail}
              size="3x"

              // style={{ '--fa-primary-color': 'red' }}
            />
      </a>
      <a id="link" href="/Bartender" className="col-sm-3 border text-center h3 p-3 m-0">
      
          <FontAwesomeIcon

              icon={faBars}
              size="3x"

              // style={{ '--fa-primary-color': 'red' }}
            />
      </a>
    </div>
    </div>
  );
}
export default NavbarWdivs;

