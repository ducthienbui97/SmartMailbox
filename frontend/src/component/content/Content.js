import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {Breadcrumb, Layout} from 'antd';

import HouseholdEmails from './route/HouseholdEmails';

const { Header, Content, Footer, Sider } = Layout;

export default class MainContent extends Component {
  render() {
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
          {/*</Breadcrumb>*/}
          {/*<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>*/}
            {/*Bill is a cat.*/}
          {/*</div>*/}
          <Switch>
            <Route path="/household-mails" component={HouseholdEmails}/>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}
