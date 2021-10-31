import React, {Component} from 'react';
import Contacts from "./Contacts";
import {Game} from "./Game";
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div>
          <BrowserRouter>
            <Contacts/>
          </BrowserRouter>
        {/*  <Chat/>
          <Players/>
          <Test/>
          <MovieList profiles={profiles} users={users} movies={movies}></MovieList>
          <Game/>*/}
        </div>
    );
  }
}

export default App;
