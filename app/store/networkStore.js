import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga'
import { helloSaga } from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const logger = (store) => (next) => (action) => {
  if(typeof action !== "function"){
    console.log('dispatching:', action);
  }
  return next(action);
}

const networkStore = createStore(
  reducers,
  applyMiddleware(logger),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(helloSaga)

export default networkStore;
