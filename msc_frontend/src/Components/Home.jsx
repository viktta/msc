import React, { Component } from "react";
import "../styles/Home.css";
import Dropdown from "./Dropdown";

class Home extends Component {
  render() {
    return (
      <div className="grid-container">
        <div className="msc">MSC PLAYER</div>
        <div className="header">
          <Dropdown />
        </div>
        <div className="main">
          <h1>hello</h1>
        </div>
        <div className="footer">
          <h1>footer</h1>
        </div>
      </div>
    );
  }
}

export default Home;
