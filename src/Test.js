import React, {Component} from 'react';

const TestList = (props)=>{
    return (
        <div>
            <p className="items">Items</p>
            <ol className="item-list">
                {props.items.map((item, index) => <li key={index}>{item}</li>)}
            </ol>
        </div>
    );
};

class InputComponent extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value:""
        }
    }
    handleChange(event){
        const value = event.target.value;
        this.setState((oldState) => {
            return {
                ...oldState,
                value: value
            };
        });
    }
    render(){
        return (
            <div>
                <form onSubmit={this.props.addItem}>
                    <input
                        type="text"
                        placeholder="Enter New Item"
                        value={this.state.value}
                        onChange={(event)=>this.handleChange(event)}
                    />
                    <button onClick={(event) => this.props.onClickAdd(event, this.state.value)} disabled={!this.state.value}>Add</button>
                </form>
                <button onClick={this.props.deleteLastItem} disabled={!this.props.allowDelete()}>
                    Delete Last Item
                </button>
            </div>
        );
    }
}

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        };
    }
    addItem(e, value){
        e.preventDefault();
        this.setState((oldState) => {
            return {
                items: [
                    ...oldState.items,
                    value
                ]
            };
        });
        return false;
    };

    deleteLastItem(){
        this.setState((prevState) => {
            return {
                items: prevState.items.slice(0, -1)
            };
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">ReactND - Coding Practice</h1>
                </header>
                <h2>Shopping List</h2>
                <InputComponent items={this.state.items} onClickAdd={this.addItem.bind(this)} allowDelete = {() => this.state.items.length >= 1}  />
               <TestList items = {this.state.items}/>
            </div>
        );
    }
}

export default Test;
