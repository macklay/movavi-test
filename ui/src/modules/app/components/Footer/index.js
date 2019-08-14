// @flow
import React from 'react';
import { Layout } from 'antd';

import * as styles from './Styles.scss';

function Header() {
  return (
    <Layout.Footer className={styles.root}>
      <section>
        Powered by <a href='mailto:macklay@gmail.com'>macklay@gmail.com</a>
      </section>
      <section>All rights reserved.</section>
    </Layout.Footer>
  );
}

export default Header;
