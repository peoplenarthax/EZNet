import React, { Component, PropTypes } from 'react';

class TerminalContainer extends Component {
  constructor(){
    super();
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

TerminalContainer.propTypes = {
  terminalInformation: PropTypes.object
}
export default TerminalContainer;
