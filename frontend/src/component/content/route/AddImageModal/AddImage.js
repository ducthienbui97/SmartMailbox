import React, { Component } from "react";
import { Modal, Button, Icon } from "antd";
import PropTypes from "prop-types";
import axios from "axios";
import Upload from "./Upload";

// const URL = 'http://localhost:8080';
const URL = "https://aqueous-gorge-93987.herokuapp.com";

export default class AddImage extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired
  };

  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
    fileList: []
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    const { fileList } = this.state;
    this.setState(
      {
        confirmLoading: true
      },
      () => {
        let formData = new FormData();
        console.log("formData again is ", formData);
        const email = "qanh123@gmail.com";
        formData.append("image", fileList[0].originFileObj);
        formData.append("email", email);
        console.log("formData is ", formData);
        axios
          .post(`${URL}/api/image`, formData, {
            headers: {
              "content-type": "multipart/form-data"
            }
          })
          .then(({ data }) => {
            console.log("dtata is ", data);
            this.setState({
              visible: false,
              confirmLoading: false
            });
          });
      }
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  onImageChange = fileList => {
    this.setState({ fileList: fileList });
  };

  render() {
    const { visible, confirmLoading, ModalText, fileList } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add new mail
        </Button>
        <Modal
          title="Add an image of your mail here"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: fileList.length === 0 }}
        >
          <Upload
            onUpload={this.props.onUpload}
            onImageChange={this.onImageChange}
            fileList={fileList}
          />
        </Modal>
      </div>
    );
  }
}
