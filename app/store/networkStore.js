import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga'
import { watchAndLog } from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const networkStore = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(watchAndLog)

export default networkStore;
