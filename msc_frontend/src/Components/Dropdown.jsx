import React, { Component } from "react";
import "../styles/Header_Styles/Header.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Dropdown extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="Dropdown">
        <button className="Dropbtn">Menu</button>
        <div className="Dropdown-content">
          <Router>
            <a href="http://localhost:8888">Login</a>
            <Link to="/player">Player</Link>
            <Link to="/">Home</Link>
          </Router>
        </div>
      </div>
    );
  }
}

export default Dropdown;
