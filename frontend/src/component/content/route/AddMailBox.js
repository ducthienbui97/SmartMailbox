import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

class EmailInput extends Component {
  state = {
    email: ''
  };

  emitEmpty = () => {
    this.emailInput.focus();
    this.setState({ email: '' });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
    this.props.pushEmail(e.target.name, e.target.value); // update parent
  };

  render() {
    const { email } = this.state;
    const suffix = email ? (
      <Icon type="close-circle" onClick={this.emitEmpty} className="pointer" />
    ) : null;

    const { name } = this.props;
    const index = name.slice(-1);

    return (
      <div
        style={{
          display: 'flex',
          marginTop: 5,
          marginBottom: 5
        }}
      >
        <Input
          placeholder="Enter mailbox camera ID"
          prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={suffix}
          value={email}
          onChange={this.onChangeEmail}
          ref={node => (this.emailInput = node)}
          name={this.props.name}
        />
        <Button
          shape="circle"
          style={{
            border: 'none',
            marginLeft: 5,
            backgroundColor: '#F0F2F5'
          }}
          onClick={() => this.props.handleDelete(index)}
        >
          <Icon
            type="close"
            style={{
              fontSize: 24,
              lineHeight: 1.2
            }}
          />
        </Button>
      </div>
    );
  }
}

export default class AddMailBox extends Component {
  state = {
    count: 0,
    inputArray: [],
    emailList: {}
  };

  componentDidMount() {
    this.setState({
      inputArray: [
        <EmailInput
          key={0}
          handleDelete={this.handleDelete}
          pushEmail={this.pushEmail}
          name="email-0"
        />
      ]
    });
  }

  pushEmail = (name, email) => {
    this.setState(prev => ({
      emailList: { ...prev.emailList, [name]: email }
    }));
  };

  handleDelete = index => {
    this.setState(prev => ({
      inputArray: prev.inputArray.filter(x => x.props.name.slice(-1) !== index)
    }));
    console.log(index);
  };

  increment = () => {
    this.setState(prev => ({
      count: prev.count + 1,
      inputArray: [
        ...prev.inputArray,
        <EmailInput
          key={prev.count + 1}
          handleDelete={this.handleDelete}
          pushEmail={this.pushEmail}
          name={`email-${prev.count + 1}`}
        />
      ]
    }));
  };

  handleSubmit = () => {
    // To do
  };

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <Row>
          <Col offset={3}>
            <Icon type="camera-o" style={{ fontSize: 40, color: '#2d9ee0' }} />
            <h1>Add Mailbox Camera</h1>
          </Col>
        </Row>

        <Form>
          <Row>
            <Col xs={16} sm={12} md={10} lg={8} xl={7} offset={3}>
              <FormItem
                label={<span className="email-form-label">Email Address</span>}
                style={{
                  marginBottom: 5
                }}
              >
                {this.state.inputArray}
              </FormItem>
              <a
                onClick={this.increment}
                style={{
                  display: 'inline-block',
                  marginTop: -15,
                  marginBottom: 25
                }}
              >
                <Icon type="plus-circle-o" /> Add Another Camera
              </a>
              <FormItem>
                <Button type="primary" htmlType="submit" size="large">
                  Add Camera
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
