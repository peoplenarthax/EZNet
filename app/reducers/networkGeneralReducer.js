import {
  MESSAGE_TO_ME,
  ADD_ROUTE_TO_TABLE,
  SEND_PING,
  ADD_TERMINAL,
  SAVE_CONSOLE_STATE,
  CLEAR_CURRENT_CONSOLE,
} from './constants';
import 'babel-polyfill';

const initialState = {
  terminals: [],
  routes:[['From', 'To']],
};

const findTerminal = (name, {terminals}) => terminals.findIndex(terminal => terminal.name === name)

const generalMessages = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TERMINAL:
      return Object.assign({}, state, {terminals: [...state.terminals, action.terminal]});
    case ADD_ROUTE_TO_TABLE:
      let newRoute = [action.toTerminal, action.fromTerminal];

      return Object.assign({},  state, {routes:[...state.routes, newRoute]});
    case SEND_PING:
      let newTerminals = state.terminals;
      const indexDestinyTerminal = state.terminals.findIndex((terminal) => terminal.ip === action.destinyIP);

      if (indexDestinyTerminal !== -1) {
        const {messages} = newTerminals[indexDestinyTerminal];

        newTerminals[indexDestinyTerminal].messages = [...messages, `Ping from ${action.originIP}`];

        return Object.assign({},  state, {terminals:newTerminals});
      }

      return state;
    case SAVE_CONSOLE_STATE: {
      const terminals = state.terminals.map((terminal) => {
        if (terminal.name === action.name) {
          return Object.assign({}, terminal, {console: action.state})
        }
        return terminal;
      });

      return Object.assign({}, state, {terminals});
      }
    case CLEAR_CURRENT_CONSOLE:{
      const terminals = state.terminals.map((terminal) => {
        if (terminal.name === action.name) {
          const newConsole = Object.assign({}, terminal.console, {messages: []});
          return Object.assign({}, terminal, {console: newConsole})
        }
        return terminal;
      });

      return Object.assign({}, state, {terminals});
      }
    default:
    return state;
  }
};

export default generalMessages;

export const getMessages = (state) => state.messages;
export const getTerminals = (state) => state.terminals;
