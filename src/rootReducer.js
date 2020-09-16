import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import caseReducer from './containers/home/reducer'
export default (history) => combineReducers({
  router: connectRouter(history),
  caseState: caseReducer,
})