import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';


const logger = (store) => (next) => (action) => {
  if(typeof action !== "function"){
    console.log('dispatching:', action);
  }
  return next(action);
}

const networkStore = createStore(
  reducers,
  applyMiddleware(logger)
);

export default networkStore;
