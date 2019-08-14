// @flow
import React, { useMemo, useState, useCallback } from 'react';
import { Table, Divider, Button, Modal } from 'antd';
import type { List, Map } from 'immutable';
import { Link } from 'react-router-dom';

import MessagesFilter from '../MessagesFilter';

const { confirm } = Modal;

const columnsKeys = {
  id: 'id',
  title: 'title',
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
    title: 'Category',
    dataIndex: 'parentTitle',
    key: columnsKeys.parentTitle,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, item) => (
      <span>
        <Link to={`/messages/${item.id}`}>Edit</Link>
        <Divider type='vertical' />
        <Button type='link' onClick={() => handleDelete(item)}>
          Delete
        </Button>
      </span>
    ),
  },
];

const dataSourceAdapter = (list: List, categories: List) =>
  list.toJS().map((item: Map) => {
    const parent = categories.find(i => item.category && i.get('id') === item.category.id);
    return {
      id: item.id,
      title: item.title,
      parentTitle: parent ? parent.get('title') : '',
      key: item.id,
    };
  });

const showDeleteConfirm = ({ itemName, onDelete }) => {
  const options = {
    title: `Are you sure you want to delete "${itemName}"?`,
    content: '',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
  };
  confirm({
    ...options,
    onOk() {
      onDelete();
    },
  });
};

type MessagesTablePropsType = {
  categories: List,
  items: List,
  loading: boolean,
  onMessageDelete: Function,
};

export default function MessagesTable({ categories, items, loading, onMessageDelete }: MessagesTablePropsType) {
  const dataSource = useMemo(() => items && categories && dataSourceAdapter(items, categories), [items, categories]);
  const [titleFilter, setTitleFilter] = useState('');
  const [parentFilter, setParentFilter] = useState('');

  const dataSourceFiltered =
    dataSource &&
    dataSource.filter(item => {
      const titleFilterCond = !titleFilter || item.title.toLowerCase().includes(titleFilter.trim());
      const parentFilterCond = !parentFilter || item.parentTitle.toLowerCase().includes(parentFilter.trim());

      return titleFilterCond && parentFilterCond;
    });

  const handleFilterTitle = useCallback(e => {
    setTitleFilter(e.target.value.toLowerCase());
  }, []);
  const handleFilterParent = useCallback(e => {
    setParentFilter(e.target.value.toLowerCase());
  }, []);
  const handleDelete = useCallback(item => {
    showDeleteConfirm({
      itemName: item.title,
      onDelete: () => {
        onMessageDelete(item.id);
      },
    });
  }, []);

  const columns = useMemo(() => getColumns({ handleDelete }), []);

  return (
    <div>
      <MessagesFilter
        current={dataSourceFiltered && dataSourceFiltered.length}
        total={dataSource && dataSource.length}
        onFilterTitle={handleFilterTitle}
        onFilterParent={handleFilterParent}
      />
      <Table dataSource={dataSourceFiltered} columns={columns} loading={loading} />
    </div>
  );
}
