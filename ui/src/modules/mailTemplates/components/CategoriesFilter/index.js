// @flow
import React from 'react';
import { Collapse, Form, InputNumber, Input, Select } from 'antd';

import * as styles from './Styles.scss';

export const messagesCond = {
  equal: '=',
  more: '>',
  less: '<',
};

type CategoriesFilterPropsType = {
  current: number,
  total: number,
  onFilterTitle: Function,
  onFilterParent: Function,
  onFilterMessagesNumber: Function,
  onFilterMessagesNumberType: Function,
};

export default function CategoriesFilter({
  current,
  total,
  onFilterTitle,
  onFilterParent,
  onFilterMessagesNumber,
  onFilterMessagesNumberType,
}: CategoriesFilterPropsType) {
  return (
    <Collapse className={styles.root} defaultActiveKey={['1']}>
      <Collapse.Panel header={`Filters${current !== total ? `: (${current}/${total})` : ''}`} key='1'>
        <Form layout='inline'>
          <Form.Item label='Title'>
            <Input placeholder='cat 1' onChange={onFilterTitle} allowClear />
          </Form.Item>
          <Form.Item label='Parent title'>
            <Input placeholder='cat 2' onChange={onFilterParent} allowClear />
          </Form.Item>
          <Form.Item label='Messages count' className={styles.messagesCount}>
            <Select
              defaultValue='='
              style={{ width: 50 }}
              className={styles.messagesCountSelect}
              onChange={onFilterMessagesNumberType}
            >
              <Select.Option value={messagesCond.equal}>=</Select.Option>
              <Select.Option value={messagesCond.more}>&ge;</Select.Option>
              <Select.Option value={messagesCond.less}>&le;</Select.Option>
            </Select>
            <InputNumber placeholder='8' min={0} onChange={onFilterMessagesNumber} allowClear />
          </Form.Item>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
}
