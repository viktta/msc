import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user: [],
      user_id: localStorage.getItem("user_id"),
    };
    this.getUser = this.getUser.bind(this);
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

  getUser(e) {
    spotifyApi.getMe().then((res) => {
      this.setState({ user: res });
      this.setState({ user_id: res.id });
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.getUser}>get user</button>
        <h1>id: {this.state.user_id}</h1>
        <a href="http://localhost:8888">login</a>
      </div>
    );
  }
}

export default App;
