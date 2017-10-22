import {
  SAVE_CONSOLE_STATE,
  CLEAR_CURRENT_CONSOLE,
  ADD_ROUTE_TO_TABLE,
  SEND_PING
} from '../reducers/constants';

export const saveConsoleState = (name, state) => {
    return {
      type: SAVE_CONSOLE_STATE,
      name,
      state
    }
};

export const clearCurrentConsole = (name) => {
  return {
    type: CLEAR_CURRENT_CONSOLE,
    name
  }
}

export const addRoute = (toTerminal, fromTerminal) => {
  return {
    type: ADD_ROUTE_TO_TABLE,
    toTerminal,
    fromTerminal
  }
}

export const sendPing = (originIP, destinyIP) => {
  return {
    type: SEND_PING,
    originIP,
    destinyIP
  }
}
