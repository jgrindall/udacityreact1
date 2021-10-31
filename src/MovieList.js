import React, {Component} from "react";

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
    };

    remove = (userName)=>{
        alert(userName);
    };

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

export default MovieList;