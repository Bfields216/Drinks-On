import React, { Component } from "react";
import { Chip, Icon } from "react-materialize";
// import { MapFlagStyle } from "./MapFlagStyle";

export default class MapFlag extends Component {
  render() {
    return (
      <>
        <Chip
          close={false}
          className="red lighten-2 "
          closeIcon={<Icon className="close">close</Icon>}
          options={null}
        >
          
          <div className="map-chip valign-wrapper"><Icon className="responsive-img">local_bar</Icon>{this.props.text}</div>
        </Chip>
      </>
    );
  }
}
