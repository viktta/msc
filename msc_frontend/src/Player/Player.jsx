import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "../styles/Player_style/Player_style.css";
import { GrPlayFill } from 'react-icons/gr';
import { FaPauseCircle } from 'react-icons/fa';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { IoIosShuffle } from 'react-icons/io';
import { BsFillVolumeUpFill } from 'react-icons/bs';
import { BsFillVolumeDownFill } from 'react-icons/bs';
import { BsFillVolumeMuteFill } from 'react-icons/bs';
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
      },
      getPlaybackState: {
        progress_ms: '',
        name: '',
        images: ''
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
      this.setState({
        user: {
          country: response.country,
          display_name: response.display_name,
          images: response.images[0].url,
        }
      })
    })
  }

  Play() {
    spotifyApi.play()
  }

  Pause() {
    spotifyApi.pause()
  }

  skipToNext() {
    spotifyApi.skipToNext()
  }

  skipToPrevious() {
    spotifyApi.skipToPrevious()
  }

  setShuffle() {
    spotifyApi.setShuffle(true)
  }

  setVolumeDown() {
    spotifyApi.setVolume(50)
  }

  setVolumeUp() {
    spotifyApi.setVolume(100)
  }

  setVolumeNone() {
    spotifyApi.setVolume(0)
  }

  getPlaybackState() {
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        getPlaybackState: {
          name: response.item.name,
          images: response.item.album.images[0].url,
          progress: response.progres_ms,
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
          <img src={this.state.user.images} id="Img-id" alt="User Profile "></img>
        </div>
        <div className="Player-div">
          <button onClick={() => this.Play()}><i><GrPlayFill /></i></button>
          <button onClick={() => this.Pause()}><i><FaPauseCircle /></i></button>
          <button onClick={() => this.skipToPrevious()}><i><FaArrowAltCircleLeft /></i></button>
          <button onClick={() => this.skipToNext()}><i><FaArrowAltCircleRight /></i></button>
          <button onClick={() => this.setShuffle()}><i><IoIosShuffle /></i></button>
          <button onClick={() => this.setVolumeUp()}><i><BsFillVolumeUpFill /></i></button>
          <button onClick={() => this.setVolumeDown()}><i><BsFillVolumeDownFill /></i></button>
          <button onClick={() => this.setVolumeNone()}><i><BsFillVolumeMuteFill /></i></button>
        </div>
        <div className="Playback-div">
          <img src={this.state.getPlaybackState.images} id="Img-id-1" alt="album"></img><br /> <br/>
          <p>
            name: {this.state.getPlaybackState.name}
          </p>
        {this.state.loggedIn && 
          <button onClick={() => this.getPlaybackState()}>Get currently playing song</button>
        }
        </div>
      </div>
    );
  }
}

export default Player;
