// @flow
import axios from 'axios';

const url = 'https://simple-api.sandbox.movavi.com/api/v1/';

// Categories

export const readMailTplCategoriesApi = (page: number) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'readCategory',
    page,
    params: {
      conditions: [],
      fields: ['id', 'title', 'parent', 'children', 'messages'],
    },
  });

export const delMailTplCategoryApi = (id: number) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'deleteCategory',
    params: {
      conditions: ['id', '=', id],
    },
  });

type categoryFieldsType = {
  parent: number,
  title: string,
};
export const createMailTplCategoryApi = ({ parent, title }: categoryFieldsType) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'createCategory',
    params: {
      data: {
        title,
        parent: {
          id: parent,
        },
      },
    },
  });

export const updateMailTplCategoryApi = (id: number, { parent, title }: categoryFieldsType) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'updateCategory',
    params: {
      conditions: ['id', '=', id],
      data: {
        title,
        parent: {
          id: parent,
        },
      },
    },
  });

// Messages

export const readMailTplMessagesApi = (page: number) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'readMessage',
    page,
    params: {
      conditions: [],
      fields: ['id', 'title', 'body', 'category'],
    },
  });

export const delMailTplMessageApi = (id: number) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'deleteMessage',
    params: {
      conditions: ['id', '=', id],
    },
  });

type messageFieldsType = {
  category: number,
  title: string,
  body: string,
};
export const createMailTplMessageApi = ({ category, title, body }: messageFieldsType) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'createMessage',
    params: {
      data: {
        title,
        body,
        category: {
          id: category,
        },
      },
    },
  });

export const updateMailTplMessageApi = (id: number, { category, title, body }: messageFieldsType) =>
  axios.post(url, {
    jsonrpc: '2.0',
    id: 'test',
    method: 'updateMessage',
    params: {
      conditions: ['id', '=', id],
      data: {
        title,
        body,
        category: {
          id: category,
        },
      },
    },
  });
