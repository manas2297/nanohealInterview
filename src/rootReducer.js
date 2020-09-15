import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './containers/counter/reducer'
import caseReducer from './containers/home/reducer'
export default (history) => combineReducers({
  router: connectRouter(history),
  counterState: counterReducer,
  caseState: caseReducer,
})