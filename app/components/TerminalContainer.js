import React, { Component, PropTypes } from 'react';
import Queue from '../models/Queue';

class TerminalContainer extends Component {
  constructor(props){
    super(props);
    this.messageQueue = new Queue({
      signalCallback: this.processQueue.bind(this),
    });
  }

  getNewMessages({terminalInformation}) {
    const {messages} = terminalInformation;

    return messages.slice(this.props.terminalInformation.messages.length);
  }

  processQueue() {
    while(this.messageQueue.size()) {
      const message = this.messageQueue.dequeue();

      if (message.includes('Ping')) {
        console.log('Yay!!')
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const newMessages = this.getNewMessages(nextProps)
    if (newMessages.length > 0) {
      this.messageQueue.enqueue(newMessages);
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
