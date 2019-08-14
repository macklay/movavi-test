// @flow
import { combineReducers } from 'redux';

function fatalErrors(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function warnings(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  fatalErrors,
  warnings,
});
