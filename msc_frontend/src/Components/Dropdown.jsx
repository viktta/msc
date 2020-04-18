import React, { Component } from "react";
import "../styles/Header_Styles/Header.css";

class Dropdown extends Component {
  render() {
    return (
      <div className="Dropdown">
        <button className="Dropbtn">More</button>
        <div className="Dropdown-content">
          <a href="#">Login</a>
          <a href="#">Playlist</a>
          <a href="#">Home</a>
        </div>
      </div>
    );
  }
}

export default Dropdown;
