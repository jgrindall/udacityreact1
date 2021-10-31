import PropTypes from "prop-types";
import React, {Component} from "react";

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
        const correctAns = (this.state.value1 + this.state.value2 + this.state.value3 === this.state.proposedAnswer);
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

export default Game;