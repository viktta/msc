import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Player_style from "../styles/Player_style/Player_style.css"
const spotifyApi = new SpotifyWebApi();

class Player extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user: {
        country: '',
        display_name: '',
        images: {},
      }
    }
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
    spotifyApi.getMe()
    .then((response) => {
      console.log(response)
      this.setState({
        user: {
          country: response.country,
          display_name: response.display_name,
          images: response.images[0].url,
        }
      })
    })
  }

  render() {
    return(
      <div className="Main-div">
        {this.state.loggedIn && 
              <button onClick={() => this.getUser()} className="Get-User-btn">Get User Info</button>
            }
          <div className="Country-inf-div">
              Country: {this.state.user.country}
          </div>
          <div className="User-inf-div">
              User Name: {this.state.user.display_name}
          </div>
          <div className="Img-inf-div">
            <img src={this.state.user.images} className="Img-div"></img>
          </div>
      </div>
    );
  }
}

export default Player;
