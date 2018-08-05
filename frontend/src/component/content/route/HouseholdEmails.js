import React, { Component } from "react";
import { Breadcrumb, Layout, List, Avatar, Icon, Row, Col } from "antd";
import AddImage from "./AddImageModal/AddImage";
import axios from "axios";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

let listData = [];
export default class HouseholdEmails extends Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <strong>Household mails</strong>
          </Breadcrumb.Item>
        </Breadcrumb>
        <AddImage url={this.props.url} email={this.props.email} />
        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
          Here is the something
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="156" />,
                  <IconText type="like-o" text="156" />,
                  <IconText type="message" text="2" />
                ]}
              >
                <Row>
                  <Col span={5}>
                    <img
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      width={100}
                      className="flex-center-vertically"
                    />
                  </Col>
                  <Col span={15} offset={2} className="flex-center-vertically">
                    <div>
                      <div>
                        <strong>Sender: </strong>item.sender
                      </div>
                      <div>
                        <strong>Receiver: </strong>item.receiver
                      </div>
                      <div>
                        <strong>Time: </strong>item.time
                      </div>
                      <div>
                        <strong>Note: </strong>item.note
                      </div>
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
