import React, {Component} from 'react';

const UserItem = (props)=>{
    const games = props.settings.showGamesPlayed ? ` has played #${props.user.gamesPlayed}` : "";
    return (
        <div>
            <p>
                {props.user.username}
                <span>{games}</span>
            </p>
            <button onClick={props.onClickAddGame}>+</button>
        </div>
    );
};

const UsersList = (props)=>{
    return (
        <div>
            <ol className="item-list">
                {props.users.map((user, index) => <li key={index}>
                    <UserItem
                        user={user}
                        settings={props.settings}
                        onClickAddGame={()=>{props.onClickAddGame(user.username)}}/>
                </li>)}
            </ol>
        </div>
    );
};

class InputComponent extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            firstname:"",
            lastname:"",
            username:""
        }
    }
    handleChange(propName, event){
        const value = event.target.value;
        this.setState((oldState) => {
            const clone =  {
                ...oldState
            };
            clone[propName] = value;
            return clone;
        });
    }
    render(){
        return (
            <div>
                <form onSubmit={this.props.addUser}>
                    <input
                        type="text"
                        value={this.state.firstname}
                        onChange={(event)=>this.handleChange("firstname", event)}
                    />
                    <input
                        type="text"
                        value={this.state.lastname}
                        onChange={(event)=>this.handleChange("lastname", event)}
                    />
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={(event)=>this.handleChange("username", event)}
                    />

                    <button
                        onClick={(event) => this.props.onClickAdd(event, this.state.firstname, this.state.lastname, this.state.username)}
                        disabled={!(this.state.firstname && this.state.lastname && this.state.username) }>Add</button>
                </form>
            </div>
        );
    }
}

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
            settings:{
                showGamesPlayed: true
            }
        };
    }
    addUser(e, firstname, lastname, username){
        e.preventDefault();
        const existingUser = this.state.users.filter(user => user.username === username);
        if(existingUser.length >= 1){
            alert("error");
        }
        else{
            this.setState((oldState) => {
                return {
                    users: [
                        ...oldState.users,
                        {
                            firstname,
                            lastname,
                            username,
                            gamesPlayed: 0
                        }
                    ]
                };
            });
        }
        return false;
    }
    onAddGame(username){
        const users = this.state.users.map(user => {
            if(user.username === username){
                return {
                    ...user,
                    gamesPlayed: user.gamesPlayed + 1
                };
            }
            return user;
        });
        this.setState((oldState)=>{
            return {
                ...oldState,
                users
            }
        });
    }

    onCheck(event){
        const checked = event.target.checked;
        this.setState((oldState)=>{
            return {
                ...oldState,
                settings:{
                    showGamesPlayed: checked
                }
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Game Players</h2>
                <input type="checkbox" checked={this.state.settings.showGamesPlayed} onChange={(event) => {this.onCheck(event)}}></input>
                <InputComponent
                    onClickAdd={this.addUser.bind(this)}
                    allowDelete = {() => this.state.items.length >= 1}  />
                <UsersList users = {this.state.users} settings={this.state.settings} onClickAddGame={this.onAddGame.bind(this)}/>
            </div>
        );
    }
}

export default Players;
