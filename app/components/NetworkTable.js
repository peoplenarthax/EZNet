import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TerminalContainer from './TerminalContainer';
import ConsoleContainer from './ConsoleContainer';
import {addTerminals} from '../actions/generalMessagesAction';
import Terminal from '../models/Terminal';

class NetworkTable extends Component {
  constructor(props) {
    super(props);
    const terminal1 = new Terminal({name:'Terminal1', ip:'192.168.1.101'});
    const terminal2 = new Terminal({name:'Terminal2', ip:'192.168.1.102'});
    const hub = new Terminal({name:'Hub', ip:'192.168.1.103'});
    this.props.addTerminals(terminal1)
    this.props.addTerminals(terminal2);
    this.props.addTerminals(hub);

  }

  render(){
    const {terminals, routes} = this.props;

    const terminalList = terminals.map((terminal) => (
              <TerminalContainer
                key={terminal.get('name')}
                terminalInformation={terminal.toJS()} //Props fail with a ImmutableJS object
              />
            )
          );

    const routesTable = routes.map((route) => {
      return (<p><span>{route.get(0)}  {route.get(1)}</span></p>);
    })

    return (
      <div>
        <div>
          {terminalList}
        </div>
        <div>{routesTable}</div>
        <ConsoleContainer
          terminals={terminals}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    terminals: state.getIn(['generalMessages', 'terminals']),
    routes: state.getIn(['generalMessages','routes'])
  }
};
const mapDispatchToProps = (dispatch) => (
  {
    addTerminals: (terminal) => dispatch(addTerminals(terminal))
  }
);

const NetworkTableConnected = connect(mapStateToProps, mapDispatchToProps)(NetworkTable);
export default NetworkTableConnected;
