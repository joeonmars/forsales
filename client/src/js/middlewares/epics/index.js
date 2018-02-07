import { combineEpics } from 'redux-observable';
import appEpics from './appEpics';

const root_epic = combineEpics(
  ...appEpics,
);

export default root_epic;