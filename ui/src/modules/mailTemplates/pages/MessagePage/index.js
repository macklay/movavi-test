// @flow
import React, { useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Result, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';

import Loading from '../../../app/components/Loading';
import MessageForm from '../../components/MessageForm';
import useMailTemplatesServiceReducer from '../../../mailTemplatesService/reducer';
import useMailTemplatesServiceSagas from '../../../mailTemplatesService/saga';
import {
  categoriesDataSelector,
  messageByIdSelectorFactory,
  messagesLoadingSelector,
  messagesErrorSelector,
  messagesActionCompleteSelector,
} from '../../../mailTemplatesService/selectors';
import {
  readMailTplMessagesAction,
  createMailTplMessagesAction,
  updateMailTplMessagesAction,
  readMailTplCategoriesAction,
} from '../../../mailTemplatesService/actions';

type ErrorPropsType = {
  onBack: Function,
};
const Error = ({ onBack }: ErrorPropsType) => (
  <Result
    status='warning'
    title='Something went wrong...'
    extra={
      <Button type='primary' key='console' onClick={onBack}>
        Go back
      </Button>
    }
  />
);

type MessagePagePropsType = {
  history: Object,
  match: Object,
};
export function MessagePage({ history, match }: MessagePagePropsType) {
  const dispatch = useDispatch();
  useMailTemplatesServiceReducer();
  useMailTemplatesServiceSagas();
  useEffect(() => {
    dispatch(readMailTplMessagesAction());
    dispatch(readMailTplCategoriesAction());
  }, []);

  const currentId = match.params.id !== 'new' ? Number(match.params.id) : null;

  const categories = useSelector(categoriesDataSelector);
  const messageByIdSelector = useMemo(() => messageByIdSelectorFactory(currentId), [currentId]);
  const mess = useSelector(messageByIdSelector);
  const messagesLoading = useSelector(messagesLoadingSelector);
  const messagesError = useSelector(messagesErrorSelector);
  const actionComplete = useSelector(messagesActionCompleteSelector);

  const handleCreate = useCallback(fields => {
    dispatch(createMailTplMessagesAction(fields));
  }, []);
  const handleUpdate = useCallback((id, fields) => {
    dispatch(updateMailTplMessagesAction(id, fields));
  }, []);

  useEffect(() => {
    if (actionComplete) {
      message.info(actionComplete === 'create' ? 'New message created' : 'Message updated');
      history.push('/messages');
    }
  }, [actionComplete]);

  if (messagesLoading) {
    return <Loading />;
  }
  if (!match || messagesError) {
    return <Error onBack={() => history.goBack()} />;
  }
  const title = mess ? `Message: ${mess.get('title')}` : 'Create new message';
  const subtitle = mess ? 'Edit mail templates message' : 'Create new mail templates message';

  return (
    <article>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader title={title} subTitle={subtitle} onBack={() => history.goBack()} />
      <MessageForm message={mess} categories={categories} onCreate={handleCreate} onUpdate={handleUpdate} />
    </article>
  );
}

export default compose(withRouter)(MessagePage);
