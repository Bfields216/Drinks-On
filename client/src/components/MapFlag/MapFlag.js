import React, { Component } from "react";

import { MapFlagStyle } from "./MapFlagStyle";

export default class MapFlag extends Component {
  render() {
    return (
      <div style={MapFlagStyle}>
        {this.props.text}
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_37413.png"
          className="w-50"
          alt="bar icons"
        />
      </div>
    );
  }
}
