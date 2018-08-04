import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';
import PropTypes from "prop-types";

export default class PicturesWall extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired,
  };

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  onUpload = () => {
    const { fileList } = this.state;
    const { onUpload } = this.props;

  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    console.log('file list is ', fileList);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={(file) => {
            this.setState(({ fileList }) => {
              return ({
                fileList: [...fileList, file],
              })
            });
            return false;
          }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
