// @flow
import { createSelector } from 'reselect';

import { MODULE_NAME } from './constants';

const moduleStateSelector = store => store[MODULE_NAME];

// Categories

export const categoriesSelector = createSelector(
  moduleStateSelector,
  store => store && store.categories,
);

export const categoriesDataSelector = createSelector(
  categoriesSelector,
  store => store && store.get('data'),
);
export const categoryByIdSelectorFactory = (id: ?number) =>
  createSelector(
    categoriesDataSelector,
    categories => id && categories && categories.find(item => item.get('id') === id),
  );

export const categoriesLoadingSelector = createSelector(
  categoriesSelector,
  store => store && store.get('loading'),
);
export const categoriesErrorSelector = createSelector(
  categoriesSelector,
  store => store && store.get('error'),
);
export const categoriesActionSelector = createSelector(
  categoriesSelector,
  store => store && store.get('action'),
);
export const categoriesActionCompleteSelector = createSelector(
  categoriesSelector,
  store => store && store.get('actionComplete'),
);

// Messages

export const messagesSelector = createSelector(
  moduleStateSelector,
  store => store && store.messages,
);

export const messagesDataSelector = createSelector(
  messagesSelector,
  store => store && store.get('data'),
);
export const messageByIdSelectorFactory = (id: ?number) =>
  createSelector(
    messagesDataSelector,
    messages => id && messages && messages.find(item => item.get('id') === id),
  );

export const messagesLoadingSelector = createSelector(
  messagesSelector,
  store => store && store.get('loading'),
);
export const messagesErrorSelector = createSelector(
  messagesSelector,
  store => store && store.get('error'),
);
export const messagesActionSelector = createSelector(
  messagesSelector,
  store => store && store.get('action'),
);
export const messagesActionCompleteSelector = createSelector(
  messagesSelector,
  store => store && store.get('actionComplete'),
);
