import React, {Component} from "react";
import {Link} from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";

class CreateContact extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name:""
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
    onSubmit(event){
        event.preventDefault();
        const values = serializeForm(event.target, {hash: true});
        this.props.onClickAdd({
            name: this.state.name,
            avatarURL: values.avatarURL
        });
        return false;
    }
    render(){
        return (
            <div>
                <form className='create-contact-form' onSubmit={this.onSubmit.bind(this)}>
                    <ImageInput name='avatarURL' maxHeight={64} className='create-contact-avatar-input' style={{'width':'64px', 'height': '64px', 'background': 'red'}}/>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(event)=>this.handleChange("name", event)}
                    />
                    <Link to={{
                        pathname: '/'
                    }}>Cancel</Link>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default CreateContact;
