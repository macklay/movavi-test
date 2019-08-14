// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu as AntMenu } from 'antd';

function Menu() {
  return (
    <Layout.Sider width={256}>
      <AntMenu mode='inline' theme='dark'>
        <AntMenu.Item>
          <Link to='/'>Intro</Link>
        </AntMenu.Item>
        <AntMenu.Item>
          <Link to='/categories'>Categories</Link>Categories
        </AntMenu.Item>
        <AntMenu.Item>
          <Link to='/messages'>Messages</Link>Messages
        </AntMenu.Item>
      </AntMenu>
    </Layout.Sider>
  );
}

export default Menu;
