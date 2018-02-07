import { combineReducers } from 'redux';
import app from './appReducer';

const root_reducer = combineReducers({
  app,
})

export default root_reducer;