import {
  ADD_TERMINAL
} from '../reducers/constants';

export const addTerminals = (terminal) => {
    return {
      type: ADD_TERMINAL,
      terminal
    }
};
