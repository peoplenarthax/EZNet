import {
  MESSAGE_TO_ME,
  ADD_ROUTE_TO_TABLE,
  SEND_PING,
  ADD_TERMINAL,
  SAVE_CONSOLE_STATE,
  CLEAR_CURRENT_CONSOLE,
} from './constants';
import 'babel-polyfill';
import { Record, List, fromJS } from 'immutable';

const InitialState = Record({
  terminals: List([]),
  routes: List([List(['From', 'To'])])
})
const initialState = new InitialState();

const generalMessages = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TERMINAL:
      return state.set('terminals', state.terminals.push(fromJS(action.terminal)));
    case ADD_ROUTE_TO_TABLE:
      const newRoute = List([action.toTerminal, action.fromTerminal]);

      return state.set('routes', state.routes.push(newRoute));
    case SEND_PING:
      const terminalIndex = state.terminals.findIndex(terminal => terminal.get('ip') === action.destinyIP);

      if (terminalIndex !== -1) {
        let messageStack = state.terminals.getIn([terminalIndex, 'messages'])
        messageStack = messageStack.push(`Ping from ${action.originIP}`);
        return state.setIn(['terminals', terminalIndex, 'messages'], messageStack )
      }

      return state;
    case SAVE_CONSOLE_STATE: {
      const terminals = state.terminals.map((terminal) => {
        if (terminal.get('name') === action.name) {
          return terminal.set('console', fromJS(action.state));
        }
        return terminal;
      });

      return state.set('terminals', terminals);
      }
    case CLEAR_CURRENT_CONSOLE:{
      const terminals = state.terminals.map((terminal) => {
        if (terminal.get('name') === action.name) {
          return terminal.setIn(['console', 'messages'], List([]));
        }
        return terminal;
      });

      return state.set('terminals', terminals);
      }
    default:
    return state;
  }
};

export default generalMessages;

export const getMessages = (state) => state.messages;
export const getTerminals = (state) => state.terminals;
