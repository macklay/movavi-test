// @flow
import React, { useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Result, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';

import Loading from '../../../app/components/Loading';
import CategoryForm from '../../components/CategoryForm';
import useMailTemplatesServiceReducer from '../../../mailTemplatesService/reducer';
import useMailTemplatesServiceSagas from '../../../mailTemplatesService/saga';
import {
  categoriesDataSelector,
  categoryByIdSelectorFactory,
  categoriesLoadingSelector,
  categoriesErrorSelector,
  categoriesActionCompleteSelector,
} from '../../../mailTemplatesService/selectors';
import {
  readMailTplCategoriesAction,
  createMailTplCategoriesAction,
  updateMailTplCategoriesAction,
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

type CategoryPagePropsType = {
  history: Object,
  match: Object,
};
export function CategoryPage({ history, match }: CategoryPagePropsType) {
  const dispatch = useDispatch();
  useMailTemplatesServiceReducer();
  useMailTemplatesServiceSagas();
  useEffect(() => {
    dispatch(readMailTplCategoriesAction());
  }, []);

  const currentId = match.params.id !== 'new' ? Number(match.params.id) : null;

  const categories = useSelector(categoriesDataSelector);
  const categoryByIdSelector = useMemo(() => categoryByIdSelectorFactory(currentId), [currentId]);
  const category = useSelector(categoryByIdSelector);
  const categoriesLoading = useSelector(categoriesLoadingSelector);
  const categoriesError = useSelector(categoriesErrorSelector);
  const actionComplete = useSelector(categoriesActionCompleteSelector);

  const handleCreate = useCallback(fields => {
    dispatch(createMailTplCategoriesAction(fields));
  }, []);
  const handleUpdate = useCallback((id, fields) => {
    dispatch(updateMailTplCategoriesAction(id, fields));
  }, []);

  useEffect(() => {
    if (actionComplete) {
      message.info(actionComplete === 'create' ? 'New category created' : 'Category updated');
      history.push('/categories');
    }
  }, [actionComplete]);

  if (categoriesLoading) {
    return <Loading />;
  }
  if (!match || categoriesError) {
    return <Error onBack={() => history.goBack()} />;
  }
  const title = category ? `Category: ${category.get('title')}` : 'Create new category';
  const subtitle = category ? 'Edit mail templates category' : 'Create new mail templates category';

  return (
    <article>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader title={title} subTitle={subtitle} onBack={() => history.goBack()} />
      <CategoryForm category={category} categories={categories} onCreate={handleCreate} onUpdate={handleUpdate} />
    </article>
  );
}

export default compose(withRouter)(CategoryPage);
