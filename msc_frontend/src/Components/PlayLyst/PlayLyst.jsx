import React, { Component } from "react";

class PlayLyst extends Component {
  state = {};
  render() {
    return <h1>Hello</h1>;
  }
}

export default PlayLyst;
import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();


class PlayLyst extends Component {
constructor(props) {
	super(props);
	const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

	this.state = {
		loggedIn: token ? true : false,
		createplaylist: {
			name: '',
			public: false,
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

createPlaylist() {
	spotifyApi.createPlaylist().then((response) => {
		this.setState({
			createplaylist: {
				name: response.name,
				public: response.public
			}
		})
	})
}

  render() {
    return (
<div className="Main-div">
<form onSubmit={() => this.createPlaylist()}>
    	<input className="PlayLyst-name" placeholder="Playlist name"></input>
    	<button type="submit">Create Playlist</button>
</form>    	
</div>);
  }
}

export default PlayLyst;
