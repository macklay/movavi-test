import { call, put, takeLatest } from 'redux-saga/effects';

import { useInjectSaga } from '../../utils/injectSaga';

import * as constants from './constants';
import * as actions from './actions';
import * as api from './api';

// Categories

export function* readCategories(action) {
  const { page } = action.payload;
  try {
    const { data } = yield call(api.readMailTplCategoriesApi, page);
    if (data.error) {
      throw new Error(data.error.message);
    } else {
      yield put(actions.readMailTplCategoriesSucceedAction(data.result));
      if (data.totalPages > data.page) {
        yield put(actions.readMailTplCategoriesAction(data.page + 1));
      }
    }
  } catch (err) {
    yield put(actions.readMailTplCategoriesFailedAction(err));
  }
}

export function* delCategory(action) {
  const { id } = action.payload;
  try {
    const result = yield call(api.delMailTplCategoryApi, id);
    yield put(actions.delMailTplCategoriesSucceedAction(result));
    yield put(actions.readMailTplCategoriesAction(result));
  } catch (err) {
    yield put(actions.delMailTplCategoriesFailedAction(err));
  }
}

export function* createCategory(action) {
  const { fields } = action.payload;
  try {
    const result = yield call(api.createMailTplCategoryApi, fields);
    yield put(actions.createMailTplCategoriesSucceedAction(result));
  } catch (err) {
    yield put(actions.createMailTplCategoriesFailedAction(err));
  }
}

export function* updateCategory(action) {
  const { fields, id } = action.payload;
  try {
    const result = yield call(api.updateMailTplCategoryApi, id, fields);
    yield put(actions.updateMailTplCategoriesSucceedAction(result));
  } catch (err) {
    yield put(actions.createMailTplCategoriesFailedAction(err));
  }
}

// Messages

export function* readMessages(action) {
  const { page } = action.payload;
  try {
    const { data } = yield call(api.readMailTplMessagesApi, page);
    if (data.error) {
      throw new Error(data.error.message);
    } else {
      yield put(actions.readMailTplMessagesSucceedAction(data.result));
      if (data.totalPages > data.page) {
        yield put(actions.readMailTplMessagesAction(data.page + 1));
      }
    }
  } catch (err) {
    yield put(actions.readMailTplMessagesFailedAction(err));
  }
}

export function* delMessage(action) {
  const { id } = action.payload;
  try {
    const result = yield call(api.delMailTplMessageApi, id);
    yield put(actions.delMailTplMessagesSucceedAction(result));
    yield put(actions.readMailTplMessagesAction(result));
  } catch (err) {
    yield put(actions.delMailTplMessagesFailedAction(err));
  }
}

export function* createMessage(action) {
  const { fields } = action.payload;
  try {
    const result = yield call(api.createMailTplMessageApi, fields);
    yield put(actions.createMailTplMessagesSucceedAction(result));
  } catch (err) {
    yield put(actions.createMailTplMessagesFailedAction(err));
  }
}

export function* updateMessage(action) {
  const { fields, id } = action.payload;
  try {
    const result = yield call(api.updateMailTplMessageApi, id, fields);
    yield put(actions.updateMailTplMessagesSucceedAction(result));
  } catch (err) {
    yield put(actions.createMailTplMessagesFailedAction(err));
  }
}

function* mailTemplatesServiceWatcher() {
  yield takeLatest(constants.READ_MAIL_TPL_CATEGORIES_ACTION, readCategories);
  yield takeLatest(constants.DEL_MAIL_TPL_CATEGORIES_ACTION, delCategory);
  yield takeLatest(constants.CREATE_MAIL_TPL_CATEGORY_ACTION, createCategory);
  yield takeLatest(constants.UPDATE_MAIL_TPL_CATEGORY_ACTION, updateCategory);

  yield takeLatest(constants.READ_MAIL_TPL_MESSAGES_ACTION, readMessages);
  yield takeLatest(constants.DEL_MAIL_TPL_MESSAGES_ACTION, delMessage);
  yield takeLatest(constants.CREATE_MAIL_TPL_MESSAGE_ACTION, createMessage);
  yield takeLatest(constants.UPDATE_MAIL_TPL_MESSAGE_ACTION, updateMessage);
}

export default () => useInjectSaga({ key: constants.MODULE_NAME, saga: mailTemplatesServiceWatcher });
