// @flow
import React from 'react';
import { Spin } from 'antd';

import * as styles from './Styles.scss';

const Loading = () => (
  <div className={styles.root}>
    <Spin size='large' />
  </div>
);

export default Loading;
