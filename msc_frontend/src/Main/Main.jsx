import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import PlayLyst from "../Components/PlayLyst/PlayLyst";
import Dropdown from "../Components/Dropdown";
import Player from "../Player/Player";
class Main extends Component {
  render() {
    return (
      <div className="Main-div">
        <Router>
          <Dropdown />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Playlist" component={PlayLyst}></Route>
            <Route exact path="/player" component={Player}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
