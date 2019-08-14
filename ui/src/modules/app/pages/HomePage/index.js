// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from 'antd';
import renderHTML from 'react-render-html';

import html from '../../../../../../README.md';

import * as styles from './Styles.scss';

export default function HomePage() {
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <PageHeader title='Intro' subTitle='Tips and notes' />
      <div className={styles.content}>{renderHTML(html)}</div>
    </article>
  );
}
