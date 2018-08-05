import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon, Badge } from "antd";
import axios from "axios";
import io from "socket.io-client";

import MainContent from "./content/Content";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const URL = "https://aqueous-gorge-93987.herokuapp.com";
export default class Sidebar extends Component {
  state = {
    collapsed: false,
    userId: null,
    unreadCount: 0,
    currentData: null,
    userEmail: "qanh123@gmail.com",
    socket: io(URL)
  };

  onCollapse = collapsed => {
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
              backgroundColor: "#fff",
              color: "#999",
              boxShadow: "0 0 0 1px #d9d9d9 inset"
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
    axios
      .post(`${URL}/api/login`, {
        email: this.state.userEmail
      })
      .then(({ data }) => {
        console.log("res data is ", data);
        this.setState({ currentData: data });
        let that = this;
        window.OneSignal.push(function() {
          window.OneSignal.getUserId(function(userId) {
            if (that.state.userId != userId) {
              if (that.state.userId) {
                axios.post(`${URL}/api/removeNotificationIds`, {
                  email: this.state.userEmail,
                  notificationId: that.state.userId
                });
              }
              that.setState({ userId });
              if (userId) {
                axios.post(`${URL}/api/setNotificationIds`, {
                  email: that.state.userEmail,
                  notificationId: userId
                });
              }
            }
          });
        });
        window.OneSignal.on("subscriptionChange", function(isSubscribed) {
          window.OneSignal.getUserId(function(userId) {
            if (that.state.userId != userId) {
              if (that.state.userId) {
                axios.post(`${URL}/api/removeNotificationIds`, {
                  email: that.state.userEmail,
                  notificationId: that.state.userId
                });
              }
              that.setState({ userId });
              if (userId) {
                axios.post(`${URL}/api/setNotificationIds`, {
                  email: that.state.userEmail,
                  notificationId: userId
                });
              }
            }
          });
        });
      });
  }

  markAsRead = () => {
    axios
      .post(`${URL}/api/mark-as-read`, {
        email: this.state.userEmail
      })
      .then(() => this.setState({ unreadCount: 0 }));
  };

  render() {
    const { collapsed, unreadCount, currentData } = this.state;
    let address = "Home";
    if (currentData && currentData.address) address = currentData.address;
    if (this.props.location.pathname === "/") {
      return <Redirect to="/private-mails" />;
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu selectable={false} theme="dark">
            <Menu.Item key="0">
              <span hidden={collapsed}>{address}</span>
            </Menu.Item>
          </Menu>
          <Menu theme="dark" defaultSelectedKeys={["3"]} defaultOpenKeys={["sub1"]} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>Mail list</span>
                </span>
              }
            >
              <Menu.Item key="3" onClick={this.markAsRead}>
                {this.generateLink(
                  "private-mails",
                  "Private mails",
                  false,
                  true
                )}
              </Menu.Item>
              <Menu.Item key="4">
                {this.generateLink("household-mails", "General mails", false)}
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="user-add" />
              {this.generateLink("add-user", "Add user", collapsed)}
            </Menu.Item>
            <Menu.Item key="10">
              <Icon type="camera-o" />
              {this.generateLink("add-mailbox", "Add mailbox", collapsed)}
            </Menu.Item>
          </Menu>
        </Sider>
        <MainContent
          route={this.props}
          fn={this.updateUnreadMail}
          email={this.state.userEmail}
          url={URL}
          socket={this.state.socket}
        />
      </Layout>
    );
  }
}
