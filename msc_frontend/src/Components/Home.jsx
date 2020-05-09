import React, { Component } from "react";
import "../styles/Home.css";
class Home extends Component {
  render() {
    return (
      <div className="grid-container">
        <div className="msc">MSC PLAYER</div>
        <div className="main">
          <h5>
            To use this music player first login with spotify. Link in the menu
          </h5>
        </div>
      </div>
    );
  }
}

export default Home;
