import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from 'axios';

const spotifyApi = new SpotifyWebApi();

class PlayLyst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  

  render() {
    return (
      <div className="Main-div">
        <form onSubmit={() => this.createPlaylist()}>
          <input type="text" placeholder="Create Playlist"></input>
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}

export default PlayLyst;
