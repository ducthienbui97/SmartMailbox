import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Badge } from 'antd';
import axios from 'axios';
import socket from '../socket';

import MainContent from './content/Content';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const URL = 'https://aqueous-gorge-93987.herokuapp.com/';
export default class Sidebar extends Component {
  state = {
    collapsed: false,
    unreadCount: 0
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  generateLink = (url, text, hidden, bool) => {
    return (
      <Link to={url} className="inline-link">
        <span hidden={hidden}>{text}</span>
        {bool && (
          <Badge
            count={this.state.unreadCount}
            style={{
              marginLeft: 10,
              backgroundColor: '#fff',
              color: '#999',
              boxShadow: '0 0 0 1px #d9d9d9 inset'
            }}
          />
        )}
      </Link>
    );
  };

  updateUnreadMail = count => {
    this.setState({ unreadCount: count });
  };

  componentDidMount() {
    axios.post('/api/login', {
      email: 'qanh123@gmail.com',
    }).then(({ data }) => {
      console.log('res data is ', data)
    });
    window.OneSignal.push(function () {
      /* These examples are all valid */
      window.OneSignal.getUserId(function (userId) {
        console.log("OneSignal User ID:", userId);
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
      });
    });
    socket.on('mail-added', () => {
      console.log('CLIENT RECEIVED MSG');
    });
  };

  markAsRead = () => {
    axios
      .post('http://localhost:8080/api/mark-as-read', {
        email: 'qanh123@gmail.com'
      })
      .then(() => this.setState({ unreadCount: 0 }));
  };

  render() {
    const { collapsed, unreadCount } = this.state;
    if (this.props.location.pathname === '/') {
      return <Redirect  to="/household-mails"/>
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu selectable={false} theme="dark">
            <Menu.Item key="0">
              <span hidden={collapsed}>{'{House}'}</span>
            </Menu.Item>
          </Menu>
          <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Mail list</span>
                </span>
              }
            >
              <Menu.Item key="3">
                {this.generateLink('household-mails', 'General mails', false)}
              </Menu.Item>
              <Menu.Item key="4" onClick={this.markAsRead}>
                {this.generateLink(
                  'private-mails',
                  'Private mails',
                  false,
                  true
                )}
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="user-add" />
              { this.generateLink('add-user', 'Add user', collapsed) }
            </Menu.Item>
            <Menu.Item key="10">
              <Icon type="camera-o" />
              { this.generateLink('add-mailbox', 'Add mailbox', collapsed) }
            </Menu.Item>
          </Menu>
        </Sider>
        <MainContent route={this.props} fn={this.updateUnreadMail} />
      </Layout>
    );
  }
}
