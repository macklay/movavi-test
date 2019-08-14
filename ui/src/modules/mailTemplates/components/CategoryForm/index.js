// @flow
import React, { useMemo } from 'react';
import { compose } from 'redux';
import { Form, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import type { List, Map } from 'immutable';

import * as styles from './Styles.scss';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

type CategoryFormPropsType = {
  form: FormComponentProps,
  category: Map,
  categories: List,
  onCreate: Function,
  onUpdate: Function,
};
export function CategoryForm({ form, category, categories, onCreate, onUpdate }: CategoryFormPropsType) {
  const { getFieldDecorator, validateFields } = form;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, fields) => {
      if (!err) {
        if (category) {
          onUpdate(category.get('id'), fields);
        } else {
          onCreate(fields);
        }
      }
    });
  };

  const parents = useMemo(
    () => categories && categories.toJS().filter(item => !category || item.id !== category.get('id')),
    [categories, category],
  );

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className={styles.root}>
      <Form.Item label='Parent category'>
        {getFieldDecorator('parent', { initialValue: category && category.getIn(['parent', 'id']) })(
          <Select placeholder='Root category' allowClear>
            {parents &&
              parents.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label='Title'>
        {getFieldDecorator('title', {
          initialValue: category && category.get('title'),
          rules: [{ required: true, message: 'Please input title!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit' className={styles.submit}>
          {category ? 'Apply' : 'Create'}
        </Button>
        <Button>
          <Link to='/categories'>Cancel</Link>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default compose(Form.create())(CategoryForm);
