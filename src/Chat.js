import React, { Component } from 'react';

class Messages extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => (
                    <li
                        key={index}
                        className={
                            message.username === this.props.user.username ? 'message sender' : 'message recipient'
                        }
                    >
                        <p>{`${message.username}: ${message.text}`}</p>
                    </li>
                ))}
            </ul>
        );
    }
}

class SubmitElement extends Component{
    constructor(props) {
        super(props);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.state = {
            newMessage: ""
        };
    }
    onChangeMessage(event){
        const newMessage = event.target.value;
        this.setState((oldState)=>{
            return {
                ...oldState,
                newMessage: newMessage
            };
        });
    }
    render(){
        return (
            <div>
                <form className="input-group">
                    <input type="text" className="form-control"
                           onChange={(event)=>this.onChangeMessage(event)}
                           value={this.state.newMessage} />
                    <div className="input-group-append">
                        <button onClick={(event)=>{this.props.onAddMessage(this.state.newMessage); event.preventDefault(); return false;} } className="btn submit-button" disabled={this.state.newMessage.length === 0}>
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

class ChatWindow extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="chat-window">
                <div className="name sender">{this.props.user.username}</div>
                <Messages messages={this.props.messages} user={this.props.user}/>
                <SubmitElement onAddMessage = {this.props.onAddMessage}/>
            </div>
        );
    }
}

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: 'Amy'
                },
                {
                    username: 'John'
                }
             ],
            messages:[
                {
                    username: 'Amy',
                    text: 'Hi, Jon!' },
                {
                    username: 'Amy',
                    text: 'How are you?'
                },
                {
                    username: 'John',
                    text: 'Hi, Amy! Good, you?'
                }
            ]
        };
    }
    onAddMessage(user, newMessage){
        const msg = {
            username: user.username,
            text: newMessage
        };
        this.setState((oldState)=>{
            return {
                ...oldState,
                messages:[
                    ...oldState.messages,
                    msg
                ]
            };
        });
    }
    render() {
        return (
            <div>
                <div className="container">
                    <ChatWindow messages = {this.state.messages} user={this.state.users[0]} onAddMessage={this.onAddMessage.bind(this, this.state.users[0])}/>
                    <ChatWindow messages = {this.state.messages} user={this.state.users[1]} onAddMessage={this.onAddMessage.bind(this, this.state.users[1])}/>
                </div>
            </div>
        );
    }
}

export default Chat;
