import React, { Component } from 'react';
import { Modal, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import Upload from './Upload';

export default class AddImage extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired,
  };

  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onImageChange = (fileList) => {
    this.setState({ fileList: fileList });
  };

  render() {
    const { visible, confirmLoading, ModalText, fileList } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Add new mail</Button>
        <Modal
          title="Add an image of your mail here"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: fileList.length === 0 }}
        >
          <Upload onUpload={this.props.onUpload} onImageChange={this.onImageChange} fileList={fileList}/>
        </Modal>
      </div>
    )
  }
}
