import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TerminalContainer from './TerminalContainer';
import Console from './Console';
import {addConsole, saveConsoleState} from '../actions/consolesActions';

class ConsoleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {currentConsole: ''};
  }

  getConsoleByName(name) {
    const terminal = this.props.terminals.find((terminal) => terminal.get('name') === name);
    if (terminal) {
      return terminal.get('console').toJS();
    }
  }

  handleClick(name) {
    this.setState({currentConsole: name});
  }

  onTerminalChange(name, state) {
    this.props.saveConsoleState(name, state);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.currentConsole && nextProps.terminals && nextProps.terminals.size > 0) {
        this.setState({currentConsole: nextProps.terminals.getIn([0, 'name'])});
    }
  }

  render(){
    const {terminals} = this.props;

    const currentConsoleState = this.getConsoleByName(this.state.currentConsole);
    const switchTerminalButtons = terminals.map((terminal) => {
      const name = terminal.get('name');
      return (
      <button key={name} onClick={() => this.handleClick(name)}>
        {name}
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
    terminals: state.getIn(['generalMessages', 'terminals'])
  }
}
const mapDispatchToProps = (dispatch) => (
  {
    saveConsoleState: (name, state) => dispatch(saveConsoleState(name, state))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleContainer);
