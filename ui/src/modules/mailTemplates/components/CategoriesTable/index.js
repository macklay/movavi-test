// @flow
import React, { useMemo, useState, useCallback } from 'react';
import { Table, Divider, Button, Modal } from 'antd';
import type { List, Map } from 'immutable';
import { Link } from 'react-router-dom';

import CategoriesFilter, { messagesCond } from '../CategoriesFilter';

const { confirm } = Modal;

const columnsKeys = {
  id: 'id',
  title: 'title',
  messagesCount: 'messagesCount',
  childrenCount: 'childrenCount',
  parentTitle: 'parentTitle',
  actions: 'actions',
};

const getColumns = ({ handleDelete }) => [
  {
    title: 'Id',
    dataIndex: columnsKeys.id,
    key: columnsKeys.id,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Title',
    dataIndex: columnsKeys.title,
    key: columnsKeys.title,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Messages count',
    dataIndex: 'messagesCount',
    key: columnsKeys.messagesCount,
    sorter: (a, b) => a.messagesCount - b.messagesCount,
  },
  {
    title: 'Children count',
    dataIndex: 'childrenCount',
    key: columnsKeys.childrenCount,
    sorter: (a, b) => a.childrenCount - b.childrenCount,
  },
  {
    title: 'Parent title',
    dataIndex: 'parentTitle',
    key: columnsKeys.parentTitle,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, item) => (
      <span>
        <Link to={`/categories/${item.id}`}>Edit</Link>
        <Divider type='vertical' />
        <Button type='link' onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </span>
    ),
  },
];

const dataSourceAdapter = (list: List) =>
  list.toJS().map((item: Map, index: number, items: Array<Object>) => {
    const parent = items.find(i => item.parent && i.id === item.parent.id);
    return {
      id: item.id,
      title: item.title,
      messagesCount: item.messages && item.messages.length,
      childrenCount: item.children && item.children.length,
      parentTitle: parent ? parent.title : '',
      key: item.id,
    };
  });

const showDeleteConfirm = ({ itemName, childrenCount, messagesCount, onDelete }) => {
  const options = {
    title: `Are you sure you want to delete "${itemName}"?`,
    content: '',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
  };
  confirm({
    ...options,
    title: `Are you sure delete "${itemName}"?`,
    onOk() {
      if (childrenCount || messagesCount) {
        confirm({
          ...options,
          title: `We are gonna delete all nested items!`,
          content: `subcategories: ${childrenCount}, messages:${messagesCount}`,
          okText: 'Delete anyway!',
          onOk: onDelete,
        });
      } else {
        onDelete();
      }
    },
  });
};

type CategoriesTablePropsType = {
  items: List,
  loading: boolean,
  onCategoryDelete: Function,
};

export default function CategoriesTable({ items, loading, onCategoryDelete }: CategoriesTablePropsType) {
  const dataSource = useMemo(() => items && dataSourceAdapter(items), [items]);
  const [titleFilter, setTitleFilter] = useState('');
  const [parentFilter, setParentFilter] = useState('');
  const [messagesFilter, setMessagesFilter] = useState('');
  const [messagesFilterType, setMessagesFilterType] = useState(messagesCond.equal);

  const dataSourceFiltered =
    dataSource &&
    dataSource.filter(item => {
      const titleFilterCond = !titleFilter || item.title.toLowerCase().includes(titleFilter.trim());
      const parentFilterCond = !parentFilter || item.parentTitle.toLowerCase().includes(parentFilter.trim());

      let messagesFilterCond;
      if (messagesFilterType === messagesCond.more) {
        messagesFilterCond = !messagesFilter || item.messagesCount >= messagesFilter;
      } else if (messagesFilterType === messagesCond.less) {
        messagesFilterCond = !messagesFilter || item.messagesCount <= messagesFilter;
      } else {
        messagesFilterCond = !messagesFilter || item.messagesCount === messagesFilter;
      }

      return titleFilterCond && parentFilterCond && messagesFilterCond;
    });

  const handleFilterTitle = useCallback(e => {
    setTitleFilter(e.target.value.toLowerCase());
  }, []);
  const handleFilterParent = useCallback(e => {
    setParentFilter(e.target.value.toLowerCase());
  }, []);
  const handleFiltermessagesCountber = useCallback(value => {
    setMessagesFilter(value);
  }, []);
  const onFiltermessagesCountberType = useCallback(value => {
    setMessagesFilterType(value);
  }, []);
  const handleDelete = useCallback(item => {
    showDeleteConfirm({
      itemName: item.title,
      childrenCount: item.childrenCount,
      messagesCount: item.messagesCount,
      onDelete: () => {
        onCategoryDelete(item.id);
      },
    });
  }, []);

  const columns = useMemo(() => getColumns({ handleDelete }), []);

  return (
    <div>
      <CategoriesFilter
        current={dataSourceFiltered && dataSourceFiltered.length}
        total={dataSource && dataSource.length}
        onFilterTitle={handleFilterTitle}
        onFilterParent={handleFilterParent}
        onFilterMessagesNumber={handleFiltermessagesCountber}
        onFilterMessagesNumberType={onFiltermessagesCountberType}
      />
      <Table dataSource={dataSourceFiltered} columns={columns} loading={loading} />
    </div>
  );
}
