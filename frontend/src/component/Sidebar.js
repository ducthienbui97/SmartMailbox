import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import MainContent from './content/Content';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class Sidebar extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  generateLink = (url, text, hidden) => {
    return (
      <Link to={url} className="inline-link"><span hidden={hidden}>{text}</span></Link>
    )
  };

  render() {
    const { collapsed } = this.state;
    console.log("this props is ", this.props)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu selectable={false} theme="dark">
            <Menu.Item key="0">
              <span hidden={collapsed}>{"\{House\}"}</span>
            </Menu.Item>
          </Menu>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>Mail list</span></span>}
            >
              <Menu.Item key="3">
                { this.generateLink('household-mails', 'Household mails', false) }
              </Menu.Item>
              <Menu.Item key="4">
                { this.generateLink('private-mails', 'Private mails', false) }
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
        <MainContent route={this.props}/>
      </Layout>
    );
  }
}
