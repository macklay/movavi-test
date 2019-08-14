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

type MessageFormPropsType = {
  form: FormComponentProps,
  message: Map,
  categories: List,
  onCreate: Function,
  onUpdate: Function,
};
export function MessageForm({ form, message, categories, onCreate, onUpdate }: MessageFormPropsType) {
  const { getFieldDecorator, validateFields } = form;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, fields) => {
      if (!err) {
        if (message) {
          onUpdate(message.get('id'), fields);
        } else {
          onCreate(fields);
        }
      }
    });
  };

  const parents = useMemo(() => categories && categories.toJS(), [categories, message]);

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className={styles.root}>
      <Form.Item label='Category'>
        {getFieldDecorator('category', {
          initialValue: message && message.getIn(['category', 'id']),
          rules: [{ required: true, message: 'Please select category!' }],
        })(
          <Select placeholder='Select category'>
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
          initialValue: message && message.get('title'),
          rules: [{ required: true, message: 'Please input title!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='Body'>
        {getFieldDecorator('body', {
          initialValue: message && message.get('body'),
          rules: [{ required: true, message: 'Please input message body!' }],
        })(<Input.TextArea type='textarea' rows={8} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit' className={styles.submit}>
          {message ? 'Apply' : 'Create'}
        </Button>
        <Button>
          <Link to='/messages'>Cancel</Link>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default compose(Form.create())(MessageForm);
