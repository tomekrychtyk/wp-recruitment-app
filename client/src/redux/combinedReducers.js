import { combineReducers } from 'redux';

import runtime from './reducers/runtime';
import sections from './reducers/sections';
import photo from './reducers/photo';

export default combineReducers({
  runtime,
  sections,
  photo,
});
