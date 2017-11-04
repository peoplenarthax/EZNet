import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TerminalContainer from './TerminalContainer';
import Console from './Console';
import {addConsole, saveConsoleState} from '../actions/consolesActions';

class ConsoleContainer extends Component {
  constructor(props) {
    super(props);
    //this.props.terminals.forEach((terminal) => this.props.addConsole(terminal.name));
    this.state = {currentConsole: ''};
  }

  getConsoleByName(name) {
    const terminal = this.props.terminals.find((terminal) => terminal.name === name);
    if (terminal) {
      return terminal.console;
    }
  }

  handleClick(name) {
    this.setState({currentConsole: name});
  }

  onTerminalChange(name, state) {
    this.props.saveConsoleState(name, state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.terminals && nextProps.terminals.length > 0 && !this.state.currentConsole) {
        this.setState({currentConsole: nextProps.terminals[0].name});
    }
  }

  render(){
    const {terminals} = this.props;

    const currentConsoleState = this.getConsoleByName(this.state.currentConsole);
    const switchTerminalButtons = terminals.map((e) => {
      return (
      <button key={e.name} onClick={() => this.handleClick(e.name)}>
        {e.name}
      </button>);
    });

    return (
      <div className='console'>
      <Console
        consoleState={currentConsoleState}
        onChangeConsole={this.props.saveConsoleState}
      />

      <div>{switchTerminalButtons}</div>
      </div>
    );
  }
};
ConsoleContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    terminals: state.getIn(['generalMessages', 'terminals']).toJS()
  }
}
const mapDispatchToProps = (dispatch) => (
  {
    saveConsoleState: (name, state) => dispatch(saveConsoleState(name, state))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleContainer);
