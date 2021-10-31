import React, {Component} from 'react';
import CreateContact from "./CreateContact";
import ListContacts from "./ListContacts";
import {Route} from "react-router-dom";
import {getAll, create} from './utils/ContactsAPI';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        };
    }
    componentDidMount(){
        getAll().then(users=>{
            this.setState((currentState)=>{
                return {
                    ...currentState,
                    users: users
                };
            });
        });
    }
    onClickAdd(user){
        debugger;
        return create(user).then(()=>{
            this.setState((currentState)=>{
               return {
                   ...currentState,
                   users:[
                       ...currentState.users,
                       user
                   ]
               };
            });
        });
    }
    render() {
        const list = () => <ListContacts  users=      {this.state.users}/>;
        const add  = (route) => <CreateContact onClickAdd= {(user)=> {
            this.onClickAdd(user).then(()=>{
                route.history.push('/');
            });
        }} />;
        return (
            <div>
                <Route exact path='/'       render={ list} />
                <Route exact path='/add'    render={ add } />
            </div>
        );
    }
};

export default Contacts;