// @flow
import React from 'react';
import { Collapse, Form, Input } from 'antd';

import * as styles from './Styles.scss';

export const messagesCond = {
  equal: '=',
  more: '>',
  less: '<',
};

type MessagesFilterPropsType = {
  current: number,
  total: number,
  onFilterTitle: Function,
  onFilterParent: Function,
};

export default function MessagesFilter({ current, total, onFilterTitle, onFilterParent }: MessagesFilterPropsType) {
  return (
    <Collapse className={styles.root} defaultActiveKey={['1']}>
      <Collapse.Panel header={`Filters${current !== total ? `: (${current}/${total})` : ''}`} key='1'>
        <Form layout='inline'>
          <Form.Item label='Title'>
            <Input placeholder='mess 1' onChange={onFilterTitle} allowClear />
          </Form.Item>
          <Form.Item label='Category'>
            <Input placeholder='cat 2' onChange={onFilterParent} allowClear />
          </Form.Item>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
}
