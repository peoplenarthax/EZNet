import React, { Component, PropTypes } from 'react';
import Interpreter from '../CLInterpreter/Interpreter';

class Console extends Component {
  constructor(props) {
      super(props);
      this.interpreter = new Interpreter();
      this.state ={
        commandHistory: [],
        messages: [],
        currentLine: '',
        commandHistoryIndex: -1
      };

      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
   }

   addMessage(message) {
     let {messages} = this.state;
     messages.push(message);
     this.setState({messages});
   }

   addCommandToHistory(command) {
     let {commandHistory} = this.state;
     commandHistory.push(command);
     this.setState({
       commandHistory,
       commandHistoryIndex: -1
     });
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.consoleState && nextProps.consoleState.name !== this.state.name) {
       if (this.state.name) {
         this.props.onChangeConsole(this.state.name, this.state);
       }
       this.interpreter.setCommands(nextProps.consoleState.interpreter)
     }
     console.log('New state')
     const newState = Object.assign({}, this.state, {currentLine: ''}, nextProps.consoleState);
     console.log('New state')
     this.setState(newState);
   }

   goUpInCommandHistory() {
     const {commandHistoryIndex, commandHistory} = this.state;
     const nextcommandHistoryIndex = commandHistoryIndex + 1;
     const nextPositionInHistory = (commandHistory.length - 1) - nextcommandHistoryIndex;

     if (nextPositionInHistory < 0) {
       return;
     }
     this.setState({
       currentLine: commandHistory[nextPositionInHistory],
       commandHistoryIndex: nextcommandHistoryIndex
     })
   }

   goDownInCommandHistory() {
     const {commandHistoryIndex, commandHistory} = this.state;
     const nextcommandHistoryIndex = commandHistoryIndex - 1;
     const nextPositionInHistory = (commandHistory.length - 1) - nextcommandHistoryIndex;

     if (nextcommandHistoryIndex < 0) {
       return;
     }
     this.setState({
       currentLine: commandHistory[nextPositionInHistory],
       commandHistoryIndex: nextcommandHistoryIndex
     })
   }

   clearInput() {
     this.setState({currentLine: ''});
   }

   handleChange(event) {
      this.setState({ currentLine: event.target.value });
   }

   keyPress(event){
      if(event.keyCode == 38) {
        this.goUpInCommandHistory();
      }
      if(event.keyCode == 40) {
        this.goDownInCommandHistory();
      }
      if(event.keyCode == 13) {
        this.clearInput();
        this.addMessage('>>'+event.target.value);
        this.addCommandToHistory(event.target.value)

        this.addMessage(this.interpreter.readCommand(event.target.value));
      }
   }

   render(){
     const {messages} = this.state;
     const history = messages.map((message, index) => {
       console.log(message)
       return (<li key={`${index}`}>{message}</li>);
     });

      return(
        <div className={'console__content'}>
          <ul className={'console__message-history'}>
            {history}
          </ul>
          <span>{this.state.name}</span>
          <input
            className={'console__input'}
             value={this.state.currentLine}
             onKeyDown={this.keyPress}
             onChange={this.handleChange}
             ref="terminalInput"
          />
       </div>
      )
    }
};

Console.propTypes = {
  consoleState: PropTypes.object,
  onChangeConsole: PropTypes.func
}
export default Console;
