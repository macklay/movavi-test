// @flow
import * as constants from './constants';

// Categories

export const readMailTplCategoriesAction = (page: number = 1) => ({
  type: constants.READ_MAIL_TPL_CATEGORIES_ACTION,
  payload: { page },
});
export const readMailTplCategoriesSucceedAction = (data: Object) => ({
  type: constants.READ_MAIL_TPL_CATEGORIES_SUCCEED_ACTION,
  payload: data,
});
export const readMailTplCategoriesFailedAction = (error: Object) => ({
  type: constants.READ_MAIL_TPL_CATEGORIES_FAILED_ACTION,
  payload: { error },
});

export const delMailTplCategoriesAction = (id: number) => ({
  type: constants.DEL_MAIL_TPL_CATEGORIES_ACTION,
  payload: { id },
});
export const delMailTplCategoriesSucceedAction = (data: Object) => ({
  type: constants.DEL_MAIL_TPL_CATEGORIES_SUCCEED_ACTION,
  payload: data,
});
export const delMailTplCategoriesFailedAction = (error: Object) => ({
  type: constants.DEL_MAIL_TPL_CATEGORIES_FAILED_ACTION,
  payload: { error },
});

export const createMailTplCategoriesAction = (fields: Object) => ({
  type: constants.CREATE_MAIL_TPL_CATEGORY_ACTION,
  payload: { fields },
});
export const createMailTplCategoriesSucceedAction = (data: Object) => ({
  type: constants.CREATE_MAIL_TPL_CATEGORY_SUCCEED_ACTION,
  payload: data,
});
export const createMailTplCategoriesFailedAction = (error: Object) => ({
  type: constants.CREATE_MAIL_TPL_CATEGORY_FAILED_ACTION,
  payload: { error },
});

export const updateMailTplCategoriesAction = (id: number, fields: Object) => ({
  type: constants.UPDATE_MAIL_TPL_CATEGORY_ACTION,
  payload: { id, fields },
});
export const updateMailTplCategoriesSucceedAction = (data: Object) => ({
  type: constants.UPDATE_MAIL_TPL_CATEGORY_SUCCEED_ACTION,
  payload: data,
});
export const updateMailTplCategoriesFailedAction = (error: Object) => ({
  type: constants.UPDATE_MAIL_TPL_CATEGORY_FAILED_ACTION,
  payload: { error },
});

// Messages

export const readMailTplMessagesAction = (page: number = 1) => ({
  type: constants.READ_MAIL_TPL_MESSAGES_ACTION,
  payload: { page },
});
export const readMailTplMessagesSucceedAction = (data: Object) => ({
  type: constants.READ_MAIL_TPL_MESSAGES_SUCCEED_ACTION,
  payload: data,
});
export const readMailTplMessagesFailedAction = (error: Object) => ({
  type: constants.READ_MAIL_TPL_MESSAGES_FAILED_ACTION,
  payload: { error },
});

export const delMailTplMessagesAction = (id: number) => ({
  type: constants.DEL_MAIL_TPL_MESSAGES_ACTION,
  payload: { id },
});
export const delMailTplMessagesSucceedAction = (data: Object) => ({
  type: constants.DEL_MAIL_TPL_MESSAGES_SUCCEED_ACTION,
  payload: data,
});
export const delMailTplMessagesFailedAction = (error: Object) => ({
  type: constants.DEL_MAIL_TPL_MESSAGES_FAILED_ACTION,
  payload: { error },
});

export const createMailTplMessagesAction = (fields: Object) => ({
  type: constants.CREATE_MAIL_TPL_MESSAGE_ACTION,
  payload: { fields },
});
export const createMailTplMessagesSucceedAction = (data: Object) => ({
  type: constants.CREATE_MAIL_TPL_MESSAGE_SUCCEED_ACTION,
  payload: data,
});
export const createMailTplMessagesFailedAction = (error: Object) => ({
  type: constants.CREATE_MAIL_TPL_MESSAGE_FAILED_ACTION,
  payload: { error },
});

export const updateMailTplMessagesAction = (id: number, fields: Object) => ({
  type: constants.UPDATE_MAIL_TPL_MESSAGE_ACTION,
  payload: { id, fields },
});
export const updateMailTplMessagesSucceedAction = (data: Object) => ({
  type: constants.UPDATE_MAIL_TPL_MESSAGE_SUCCEED_ACTION,
  payload: data,
});
export const updateMailTplMessagesFailedAction = (error: Object) => ({
  type: constants.UPDATE_MAIL_TPL_MESSAGE_FAILED_ACTION,
  payload: { error },
});
