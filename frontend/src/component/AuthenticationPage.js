import React, { Component } from 'react';
import { Input, Row, Col } from 'antd';

const Search = Input.Search;

export default class AuthenticationPage extends Component {
  onAuthenticate = (value) => {
    this.props.onAuthenticate(value);
  };

  render() {
    return (
      <Row>
        <Col span={8} offset={8} className="center-in-viewport">
          <div className="center">
            <div>
              <h2>Enter your account name</h2>
            </div>
            <div>
              <Search
                placeholder="Enter your account name"
                onSearch={this.onAuthenticate}
                enterButton
                size="large"
                className="authenticate-bar"
              />
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}
