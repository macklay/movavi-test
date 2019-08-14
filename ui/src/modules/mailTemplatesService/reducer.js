// @flow
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import { useInjectReducer } from '../../utils/injectReducer';

import * as constants from './constants';

// Categories

export const initialCategoriesState = fromJS({
  loading: false,
  error: false,
  data: null,
  action: null,
  actionComplete: null,
});

function categories(state = initialCategoriesState, action) {
  switch (action.type) {
    case constants.READ_MAIL_TPL_CATEGORIES_ACTION:
      return initialCategoriesState.set('loading', true);
    case constants.READ_MAIL_TPL_CATEGORIES_SUCCEED_ACTION: {
      const { data } = action.payload;
      if (!state.get('data')) {
        return initialCategoriesState.set('data', fromJS(data)).set('loading', false);
      }
      return state.set('data', state.get('data').concat(fromJS(data)));
    }
    case constants.READ_MAIL_TPL_CATEGORIES_FAILED_ACTION:
      return state.set('error', true).set('loading', false);
    case constants.CREATE_MAIL_TPL_CATEGORY_ACTION:
      return state.set('action', 'create').set('actionComplete', false);
    case constants.CREATE_MAIL_TPL_CATEGORY_SUCCEED_ACTION:
    case constants.CREATE_MAIL_TPL_CATEGORY_FAILED_ACTION:
      return state.set('action', null).set('actionComplete', 'create');
    case constants.UPDATE_MAIL_TPL_CATEGORY_ACTION:
      return state.set('action', 'update').set('actionComplete', false);
    case constants.UPDATE_MAIL_TPL_CATEGORY_SUCCEED_ACTION:
    case constants.UPDATE_MAIL_TPL_CATEGORY_FAILED_ACTION:
      return state.set('action', null).set('actionComplete', 'update');
    default:
      return state;
  }
}

// Messages

export const initialMessagesState = fromJS({
  loading: false,
  error: false,
  data: null,
  action: null,
  actionComplete: null,
});

function messages(state = initialMessagesState, action) {
  switch (action.type) {
    case constants.READ_MAIL_TPL_MESSAGES_ACTION:
      return initialMessagesState.set('loading', true);
    case constants.READ_MAIL_TPL_MESSAGES_SUCCEED_ACTION: {
      const { data } = action.payload;
      if (!state.get('data')) {
        return initialMessagesState.set('data', fromJS(data)).set('loading', false);
      }
      return state.set('data', state.get('data').concat(fromJS(data)));
    }
    case constants.READ_MAIL_TPL_MESSAGES_FAILED_ACTION:
      return state.set('error', true).set('loading', false);
    case constants.CREATE_MAIL_TPL_MESSAGE_ACTION:
      return state.set('action', 'create').set('actionComplete', false);
    case constants.CREATE_MAIL_TPL_MESSAGE_SUCCEED_ACTION:
    case constants.CREATE_MAIL_TPL_MESSAGE_FAILED_ACTION:
      return state.set('action', null).set('actionComplete', 'create');
    case constants.UPDATE_MAIL_TPL_MESSAGE_ACTION:
      return state.set('action', 'update').set('actionComplete', false);
    case constants.UPDATE_MAIL_TPL_MESSAGE_SUCCEED_ACTION:
    case constants.UPDATE_MAIL_TPL_MESSAGE_FAILED_ACTION:
      return state.set('action', null).set('actionComplete', 'update');
    default:
      return state;
  }
}

function lastError(state = null, action) {
  switch (action.type) {
    case constants.READ_MAIL_TPL_CATEGORIES_FAILED_ACTION:
    case constants.CREATE_MAIL_TPL_CATEGORY_FAILED_ACTION:
    case constants.UPDATE_MAIL_TPL_CATEGORY_FAILED_ACTION:
    case constants.READ_MAIL_TPL_MESSAGES_FAILED_ACTION:
    case constants.CREATE_MAIL_TPL_MESSAGE_FAILED_ACTION:
    case constants.UPDATE_MAIL_TPL_MESSAGE_FAILED_ACTION:
      return (action.payload && action.payload.error && action.payload.error.message) || action;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  categories,
  messages,
  lastError,
});

export default () => useInjectReducer({ key: constants.MODULE_NAME, reducer });
