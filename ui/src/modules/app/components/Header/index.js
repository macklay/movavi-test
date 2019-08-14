// @flow
import React from 'react';
import { Layout } from 'antd';

import * as styles from './Styles.scss';

function Header() {
  return (
    <Layout.Header className={styles.root}>
      <img src='https://new-img.movavi.com/global/0012/38/8e54dfcf4ccbc72ad724734c48c07a76a49a8723.svg' alt='content' />
    </Layout.Header>
  );
}

export default Header;
