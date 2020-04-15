import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Home extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      User: {
        country: "",
        display_name: "",
        followers: [],
        images: [],
        id: "",
      },
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

  getUser() {
    spotifyApi.getMe().then((response) => {
      this.setState({
        User: {
          country: response.country,
          display_name: response.display_name,
          images: response.images,
        },
      });
    });
  }

  render() {
    return (
      <div>
        <a href="http://localhost:8888" className="Spotify-Login">
          Login With Spotify
        </a>
        <div>User: {this.state.User.display_name}</div>
        <div>Country: {this.state.User.country}</div>
        <div>
          <img src={this.state.User.images}></img>
        </div>
        <div>
          {this.state.loggedIn && (
            <button
              onClick={() => {
                this.getUser();
              }}
            >
              Check user info
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
