import { combineReducers } from 'redux';
import app from './appReducer';

const reducers = combineReducers({
  app,
})

export default reducers;