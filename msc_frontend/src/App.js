import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { IoIosShuffle } from "react-icons/io";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { GrPlayFill } from "react-icons/gr";
import { TiArrowRepeat } from "react-icons/ti";
import { BsFillVolumeDownFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { FaArrowAltCircleRight } from "react-icons/fa";
import "./styles/main.css";
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
      user_prof: {},
      shuffle: false,
      repeat_on: false,
      pause: false,
      play: false,
      cp: {},
      ti: {},
    };
    this.getUser = this.getUser.bind(this);
    this.setShuffle = this.setShuffle.bind(this);
    this.skipPrevious = this.skipPrevious.bind(this);
    this.setPause = this.setPause.bind(this);
    this.setRepeat = this.setRepeat.bind(this);
    this.setPlay = this.setPlay.bind(this);
    this.setVolumeDown = this.setVolumeDown.bind(this);
    this.setVolumeUp = this.setVolumeUp.bind(this);
    this.setCurrentlyPlaying = this.setCurrentlyPlaying.bind(this);
    this.skipNext = this.skipNext.bind(this);
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
      this.setState({
        user: res,
        user_id: res.id,
        user_prof: res.images[0].url,
      });
    })
    .catch(err => {
        alert('Token expired Please Login again')
    })
  }

  componentDidMount() {
    this.getUser();
    this.setCurrentlyPlaying();
    window.setTimeout(() => {
      window.history.go(0);
    }, 180000);
  }

  skipPrevious(e) {
    spotifyApi.skipToPrevious();
  }

  setShuffle(e) {
    let { shuffle } = this.state;
    if (shuffle === false) {
      spotifyApi.setShuffle(true);
      this.setState({ shuffle: true });
    } else {
      spotifyApi.setShuffle(false);
      this.setState({ shuffle: false });
    }
  }

  setPause(e) {
    spotifyApi.pause();
    this.setState({ pause: true, play: false });
  }

  setRepeat(e) {
    const { repeat_on } = this.state;
    if (repeat_on === false) {
      spotifyApi.setRepeat("track");
      this.setState({ repeat_on: true });
    } else {
      spotifyApi.setRepeat("off");
      this.setState({ repeat_on: false });
    }
  }

  setPlay(e) {
    const { pause } = this.state;
    if (pause === true) {
      spotifyApi.play();
      this.setState({ play: true, pause: false });
    } else {
      spotifyApi.play();
      this.setState({ play: true });
    }
  }

  setVolumeDown() {
    spotifyApi
      .setVolume(50)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("Cannot control device volume");
      });
  }

  setVolumeUp() {
    spotifyApi
      .setVolume(100)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("Cannot control device volume");
      });
  }

  setCurrentlyPlaying(e) {
    spotifyApi
      .getMyCurrentPlaybackState("track, currently_playing_type")
      .then((res) => {
        this.setState({ cp: res, ti: res.item.album.images[1].url });
        console.log(res);
      });
  }

  skipNext(e) {
    spotifyApi.skipToNext();
  }

  render() {
    return (
        <div className="app-grid">
          <ul className="menu-ul">
            <a href='http://localhost:8888' className="ul-link">
              Login
            </a>
            <img
              src={this.state.user_prof}
              alt="user profile"
              className="user-prof"
              style={{ height: 40 }}
            ></img>
            <h1 className='usr-id'>username: {this.state.user_id}</h1>
          </ul>
          <ul className="ms-b">
            <button onClick={this.setShuffle} className='b-shuffle'>
              <i>
                <IoIosShuffle />
              </i>
            </button>
            <button onClick={this.skipPrevious} className='b-previous'>
              <i>
                <FaArrowAltCircleLeft />
              </i>
            </button>
            <button onClick={this.skipNext} className='b-next'>
              <i>
                <FaArrowAltCircleRight />
              </i>
            </button>
            <button onClick={this.setPause} className='b-pause'>
              <i>
                <FaPauseCircle />
              </i>
            </button>
            <button onClick={this.setPlay} className='b-play'>
              <i>
                <GrPlayFill />
              </i>
            </button>
            <button onClick={this.setRepeat} className='b-repeat'>
              <i>
                <TiArrowRepeat />
              </i>
            </button>
            <button onClick={this.setVolumeDown} className='b-vd'>
              <i>
                <BsFillVolumeDownFill />
              </i>
            </button>
            <button onClick={this.setVolumeUp} className='b-vu'>
              <i>
                <BsFillVolumeUpFill />
              </i>
            </button>
          </ul>
          <img src={this.state.ti} alt="album" className="album-img"></img>
          <p className='p-text'>Login to use the app,you need to be playing a song in spotify for the app to work</p>
        </div>
    );
  }
}

export default App;
