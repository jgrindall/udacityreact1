import React, { Component } from 'react';
import {Link} from "react-router-dom";

class ListContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
    }
    updateQuery(e){
        const val = e.target.value;
        this.setState((currentState)=>{
            return {
                ...currentState,
                query: val
            };
        });
    }
    render() {
        const people = this.props.users;
        const query = this.state.query.toLowerCase();
        const matchingPeople = query ? people.filter(contact => contact.name.toLowerCase().indexOf(query) >= 0) : people;
        return (
            <div>
                <input onChange={this.updateQuery.bind(this)} value={this.state.query}/>
                <Link to={{
                    pathname: '/add'
                }}>Add</Link>
                <ol>
                    {matchingPeople.map((contact) =>
                        <li key={contact.name} className="contact-list-item">
                            <div className="contact-avatar"
                                 style={{
                                     backgroundImage:   `url(${contact.avatarURL})`
                                 }}
                            >
                            </div>
                            <div className="contact-details">
                                {contact.name}
                            </div>
                            <div className="contact-remove">
                                <button></button>
                            </div>

                        </li>
                    )}
                </ol>
            </div>
        );
    }
}

export default ListContacts;
