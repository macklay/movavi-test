// @flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import CategoriesPage from '../../../mailTemplates/pages/CategoriesPage';

// import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate='%s - Movavi test application'
        defaultTitle='Movavi test application'
      >
        <meta name='description' content='A React.js Movavi application' />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/categories' component={CategoriesPage} />
        <Route path='' component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}
