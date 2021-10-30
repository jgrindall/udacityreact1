import React, {Component} from 'react';
import ListContacts from "./ListContacts";
import PropTypes from "prop-types";
import Test from "./Test";
import Players from "./Players";
import Chat from "./Chat";

const _contacts = [
  {
    "id": "karen",
    "name": "Karen Isgrigg",
    "handle": "karen_isgrigg",
    "avatarURL": "http://localhost:5001/karen.jpg"
  },
  {
    "id": "richard",
    "name": "Richard Kalehoff",
    "handle": "richardkalehoff",
    "avatarURL": "http://localhost:5001/richard.jpg"
  },
  {
    "id": "tyler",
    "name": "Tyler McGinnis",
    "handle": "tylermcginnis",
    "avatarURL": "http://localhost:5001/tyler.jpg"
  }
];



const profiles = [
  {
    id: 1,
    userID: '1',
    favoriteMovieID: '1',
  },
  {
    id: 2,
    userID: '2',
    favoriteMovieID: '1',
  },
  {
    id: 3,
    userID: '4',
    favoriteMovieID: '5',
  },
  {
    id: 4,
    userID: '5',
    favoriteMovieID: '2',
  },
  {
    id: 5,
    userID: '3',
    favoriteMovieID: '5',
  },
  {
    id: 6,
    userID: '6',
    favoriteMovieID: '4',
  },
];

const users = {
  1: {
    id: 1,
    name: 'Jane Cruz',
    userName: 'coder',
  },
  2: {
    id: 2,
    name: 'Matthew Johnson',
    userName: 'mpage',
  },
  3: {
    id: 3,
    name: 'Autumn Green',
    userName: 'user123',
  },
  4: {
    id: 4,
    name: 'John Doe',
    userName: 'user123',
  },
  5: {
    id: 5,
    name: 'Lauren Carlson',
    userName: 'user123',
  },
  6: {
    id: 6,
    name: 'Nicholas Lain',
    userName: 'user123',
  },
};

const movies = {
  1: {
    id: 1,
    name: 'Planet Earth 1',
  },
  2: {
    id: 2,
    name: 'Selma',
  },
  3: {
    id: 3,
    name: 'Million Dollar Baby',
  },
  4: {
    id: 4,
    name: 'Forrest Gump',
  },
  5: {
    id: 5,
    name: 'Get Out',
  },
};

function MovieListItem(props){
  return (
      <li>{props.userName}s favourite movie is {props.movieName} <button onClick={()=>props.remove(props.userName)}></button></li>
  );
}

class MovieList extends Component {

  state = {
    name:"John's list",
    c: 1
  };

  update = () => {
    this.setState((currentState)=>{
      return {
        ...currentState,
        c: currentState.c += 1
      };
    });
  }

  remove = (userName)=>{
    alert(userName);
  }

  render(){
    const listItems = this.props.profiles.map((profile) => {
          const userName = users[parseInt(profile.userID)].name;
          const movieName = movies[parseInt(profile.favoriteMovieID)].name;
          return <MovieListItem key={profile.id} userName={userName} movieName={movieName} remove={this.remove}/>;
        }
    );
    return (
        <div>
          <h1>{this.state.name}, {this.state.c}</h1>
          <button onClick={this.update}></button>
          <ul>
            {listItems}
          </ul>
        </div>
    );
  }
}

const getRnd = ()=>{
  return Math.floor(Math.random() * 5);
};

const Question = (props)=>{
  return (
    <div className="equation">
      <p className="text">{`${props.value1} + ${props.value2} + ${props.value3} = ${props.proposedAnswer}`}</p>
    </div>
  );
};

Question.propTypes = {
  value1: PropTypes.number.isRequired
};

const Score = (props)=>{
  return (
    <p className="text">
      Your Score: {props.numCorrect}/{props.numQuestions}
    </p>
  );
};

class Buttons extends Component {
  render(){
    return (
        <div>
          <button onClick={()=>this.props.onClick(true)}>True</button>
          <button onClick={()=>this.props.onClick(false)}>False</button>
        </div>
    );
  }
}

Buttons.propTypes = {
  onClick: PropTypes.func.isRequired
};


class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      value1:0,
      value2:0,
      value3:0,
      proposedAnswer: 0,
      numCorrect: 0,
      numQuestions: -1
    };
    this.onClick = this.onClick.bind(this);
  }
  generateQuestion = ()  => {
    this.setState((currentState)=>{
      const newState = {
        value1: getRnd(),
        value2: getRnd(),
        value3: getRnd()
      };
      return {
        ...currentState,
        ...newState,
        proposedAnswer: newState.value1 + newState.value2 + newState.value3 + Math.floor(Math.random() * 2),
        numQuestions: currentState.numQuestions + 1
      };
    });
  }
  onClick(ans){
    debugger;
    const correctAns = (this.state.value1 + this.state.value2 + this.state.value3 === this.state.proposedAnswer);
    alert(ans + " " + correctAns);
    console.log(this.state);
    if(correctAns === ans){
      this.setState((currentState)=>{
        return {
          ...currentState,
          numCorrect: currentState.numCorrect + 1
        };
      });
    }
    this.generateQuestion();
  }
  componentDidMount(){
    this.generateQuestion();
  }
  render(){
    return (
        <div>
          <Question value1={this.state.value1} value2={this.state.value2} value3={this.state.value3} proposedAnswer={this.state.proposedAnswer}/>
          <Score numCorrect={this.state.numCorrect} numQuestions={this.state.numQuestions}/>
          <Buttons onClick = {this.onClick}/>
        </div>
    );
  }
}

class App extends Component {
  render() {
    return (
        <div>
          <Chat/>

          {/*<Players/>
          <Test/>
          <ListContacts contacts = {_contacts}/>
          <MovieList profiles={profiles} users={users} movies={movies}></MovieList>
          <Game/>*/}
        </div>
    );
  }
}

export default App;
