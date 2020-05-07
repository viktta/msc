import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "../styles/Player_style/Player_style.css";
import { GrPlayFill } from 'react-icons/gr';
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
          <button onClick={() => this.getUser()} id="Get-User-btn">Get User info</button>
        }
        <div className="Country-div">
            <p id="Country-id">Country: {this.state.user.country}</p>
        </div>
        <div className="Name-div">
            <p id="Name-id">User Name: {this.state.user.display_name}</p>
        </div>
        <div className="Img-div">
          <img src={this.state.user.images} id="Img-id"></img>
        </div>
        <div>
          <button><i><GrPlayFill /></i></button>
        </div>
      </div>
    );
  }
}

export default Player;
