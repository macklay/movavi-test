// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import CategoriesPage from '../../../mailTemplates/pages/CategoriesPage';
import CategoryPage from '../../../mailTemplates/pages/CategoryPage';
import MessagesPage from '../../../mailTemplates/pages/MessagesPage';
import MessagePage from '../../../mailTemplates/pages/MessagePage';

import * as styles from './Styles.scss';

const { Content } = Layout;

export default function App() {
  return (
    <div className={styles.root}>
      <Helmet titleTemplate='%s - Movavi test application' defaultTitle='Movavi test application'>
        <meta name='description' content='A React.js Movavi application' />
      </Helmet>
      <Layout className={styles.layout}>
        <Header />
        <Layout>
          <Menu />
          <Content className={styles.content}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/categories/:id' component={CategoryPage} />
              <Route path='/categories' component={CategoriesPage} />
              <Route path='/messages/:id' component={MessagePage} />
              <Route path='/messages' component={MessagesPage} />
              <Route path='' component={NotFoundPage} />
            </Switch>
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </div>
  );
}
