// @flow
import React, { useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Alert, Button, message } from 'antd';
import { Link } from 'react-router-dom';

import MessagesTable from '../../components/MessagesTable';
import useMailTemplatesServiceReducer from '../../../mailTemplatesService/reducer';
import useMailTemplatesServiceSagas from '../../../mailTemplatesService/saga';
import {
  categoriesDataSelector,
  categoriesLoadingSelector,
  categoriesErrorSelector,
  messagesDataSelector,
  messagesLoadingSelector,
  messagesErrorSelector,
} from '../../../mailTemplatesService/selectors';
import {
  readMailTplMessagesAction,
  delMailTplMessagesAction,
  readMailTplCategoriesAction,
} from '../../../mailTemplatesService/actions';

export default function MessagesPage() {
  const dispatch = useDispatch();
  useMailTemplatesServiceReducer();
  useMailTemplatesServiceSagas();
  useEffect(() => {
    dispatch(readMailTplMessagesAction());
    dispatch(readMailTplCategoriesAction());
  }, []);

  const categoriesData = useSelector(categoriesDataSelector);
  const categoriesLoading = useSelector(categoriesLoadingSelector);
  const categoriesError = useSelector(categoriesErrorSelector);

  const messagesData = useSelector(messagesDataSelector);
  const messagesLoading = useSelector(messagesLoadingSelector);
  const messagesError = useSelector(messagesErrorSelector);

  const handleMessageDelete = useCallback(id => {
    dispatch(delMailTplMessagesAction(id));
    message.warning('Message deleted');
  }, []);

  return (
    <article>
      <Helmet>
        <title>Messages Page</title>
      </Helmet>
      <PageHeader
        title={`Messages${messagesData ? `(${messagesData.size})` : ''}`}
        subTitle='Mail templates messages'
        extra={[
          <Button key='new' type='primary'>
            <Link to='/messages/new'>Add new message</Link>
          </Button>,
        ]}
      />
      {messagesError || categoriesError ? (
        <Alert type='error' message='Something went wrong.' />
      ) : (
        <MessagesTable
          categories={categoriesData}
          items={messagesData}
          loading={messagesLoading || categoriesLoading}
          onMessageDelete={handleMessageDelete}
        />
      )}
    </article>
  );
}
