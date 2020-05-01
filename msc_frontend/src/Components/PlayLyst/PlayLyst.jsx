import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from 'axios';
const spotifyApi = new SpotifyWebApi();

class PlayLyst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postplaylist: {
        name: '',
        public: false,
      }
    };
  }
  
  
  
  playlistPost(){
    axios({
      method: 'post',
      url: 'https://api.spotify.com/v1/users/aleoria2002/playlists',
      headers: {'Authorization': 'Bearer'},
      data: {
      name: '',
      public: false,
     }
   }).then(this.setState({
     postplaylist: {
       name: '',
       public: false
     }
   }))
  } 

  render() {
    return (
      <div className="Main-div">
        <form onSubmit={() => this.playlistPost()}>
          <textarea>{this.state.postplaylist.name}</textarea>
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}



export default PlayLyst;


//client id a75233744bd24fac8c4bc37c00046eac
//client secret 4642d18becce454f83e441569186154a