import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';

import HouseholdEmails from './route/HouseholdEmails';
import PrivateEmails from './route/PrivateEmails';
import AddMailBox from './route/AddMailBox';
import InviteMember from './route/InviteMember';

const { Header, Content, Footer, Sider } = Layout;

export default class MainContent extends Component {
  render() {
    return (
      <Layout>
        {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            <Route path="/household-mails" component={HouseholdEmails} />
            <Route
              path="/private-mails"
              render={() => <PrivateEmails fn={this.props.fn} />}
            />
            <Route path="/add-user" component={InviteMember} />
            <Route path="/add-mailbox" component={AddMailBox} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Team Once © 2018</Footer>
      </Layout>
    );
  }
}
