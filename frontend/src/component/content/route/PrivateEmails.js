import React, { Component } from "react";
import { Spin, Breadcrumb, Layout, List, Avatar, Icon, Row, Col } from "antd";
import AddImage from "./AddImageModal/AddImage";
import axios from "axios";

let data = [];
let fullName = "";
let unreadMailCount = 0;
let loading = true;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class PrivateEmails extends Component {
  componentDidMount() {
    axios
      .post(`${this.props.url}/api/mail`, {
        email: this.props.email
      })
      .then(resident => {
        let mails = resident.data.mail;
        fullName = resident.data.firstName + " " + resident.data.lastName;
        for (let i = 0; i < mails.length; i++) {
          data.push({
            imgLink: mails[i].imgLink,
            time: mails[i].timeStamp,
            sender: mails[i].sender,
            mailRead: mails[i].mailRead
          });
        }
        data = data.sort((mail1, mail2) => {
          if (mail1.time < mail2.time) return -1;
          else return 1;
        });
        unreadMailCount = mails.filter(mail => !mail.mailRead).length;
        this.props.fn(unreadMailCount);
        loading = false;
        this.forceUpdate();
      });
    this.props.socket.on(`${this.props.email}-mail-added`, mail => {
      data.unshift({
        imgLink: mail.imgLink,
        time: mail.timeStamp,
        sender: mail.sender,
        mailRead: mail.mailRead
      });
    });
  }

  componentWillUnmount() {
    data = [];
    fullName = "";
    unreadMailCount = 0;
    loading = true;
  }

  render() {
    let headerStyle = {
      fontSize: 22,
      fontWeight: "bold",
      color: "#47acec"
    };
    let userStyle = {
      fontSize: 20,
      fontWeight: "bold"
    };
    if (loading) {
      const antIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;
      return (
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div>
            <Spin indicator={antIcon} />
            <div
              style={{
                fontSize: 18,
                position: "relative",
                right: 10,
                top: 10
              }}
            >
              Loading...
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <strong>Private mails</strong>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={headerStyle}>Private mails</Breadcrumb.Item>
        </Breadcrumb>
        <AddImage url={this.props.url} email={this.props.email} />
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          <div style={userStyle}>User: {fullName}</div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 4
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item
                actions={
                  [
                    // <IconText type="star-o" text="156" />,
                    // <IconText type="like-o" text="156" />,
                    // <IconText type="message" text="2" />
                  ]
                }
              >
                <Row>
                  <Col span={5}>
                    <img src={item.imgLink} className="mail-img" />
                  </Col>
                  <Col
                    style={{ height: "100%", alignItems: "center" }}
                    span={15}
                    offset={2}
                    className=""
                  >
                    <div
                      style={{
                        fontSize: 18
                      }}
                    >
                      <div>
                        <strong>Sender: </strong>
                        {item.sender}
                      </div>
                      {/* <div>
                        <strong>Receiver: </strong>item.receiver
                      </div> */}
                      <div>
                        <strong>Time: </strong>
                        {item.time}
                      </div>
                      {/* <div>
                        <strong>Note: </strong>item.note
                      </div> */}
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
