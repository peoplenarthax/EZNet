import React, { Component, PropTypes } from 'react';

class TerminalContainer extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.terminalInformation.messages.length > this.props.terminalInformation.messages.length) {
      if (Math.random() > 0.5) { //50% probabillity of replying
        this.props.terminalInformation.consoleService.ping.callback({fxArguments:['192.168.1.103']})
      }
    }
  }

  render() {
    const {name, ip, messages} = this.props.terminalInformation;
    const messageList = messages.map((e, index) => {
      return (<li key={`${index}`}>
                {e}
              </li>);
    });
    return (
      <div>
        <span>{name}</span> <span>{ip}</span>
        <ul>
          {messageList}
        </ul>
      </div>
    )
  }
};
export default TerminalContainer;
