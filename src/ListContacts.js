import React, { Component } from 'react';

class ListContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query:""
        }
    }
    updateQuery(e){
        debugger;
        const val = e.target.value;
        this.setState((currentState)=>{
            return {
                ...currentState,
                query: val
            };
        })
    }
    render() {
        const people = this.props.contacts;
        const query = this.state.query.toLowerCase();
        const matchingPeople = query ? people.filter(contact => contact.name.toLowerCase().indexOf(query) >= 0) : people;
        return (
            <div>
                <input onChange={this.updateQuery.bind(this)} value={this.state.query}/>
                <ol>
                    {people.filter(contact => contact.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0).map((contact) =>
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
