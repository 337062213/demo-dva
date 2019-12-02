import React from 'react';
import {Form, Input, Modal, Select, InputNumber, Upload, Icon} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;

class UserCreate extends React.Component {
  constructor () {
    super();
    this.state = {
      visible: false,
    };
  }

  showModelHandler = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const { onOk, form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.setState({ visible: false });
        this.handleCancel();
        this.props.form.resetFields();
      }
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.form.resetFields();
  }

  render () {
    const { visible } = this.state;
    const { children, groupList, form: { getFieldDecorator } } = this.props;
    const results = groupList.map((group) => <Option key={group.id}>{group.groupName}</Option>);
    const formData = new FormData();
    formData.append('fid', 'test');
    formData.append('name', 'lisi');
    const prop = {
      action: 'http://localhost:8502/api/file/uploadFile1',
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        data: formData,
        name: 'xxx.png',
        status: 'done',
        // url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        url: 'http://localhost:8502/api/file/downloadFile/react.txt',
        // thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'http://localhost:8502/api/file/downloadFile/Update.exe',
      }],
    };
    const props = {
      action: 'http://localhost:8502/api/file/uploadMultipleFiles',
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        data: formData,
        name: 'xxx.png',
        status: 'done',
        // url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        url: 'http://localhost:8502/api/file/downloadFile/react.txt',
        // thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'http://localhost:8502/api/file/downloadFile/Update.exe',
      }],
    };
    return (
      <div>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="新建用户记录"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input placeholder="请填写您的姓名"/>
              )}
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator('age')(
                <InputNumber style={{width: '100%' }} placeholder="请填写年龄" min={18} max={65}/>
              )}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator('sex')(
                <Select placeholder="请选择您的性别" >
                  {['M', 'F'].map((item) => <Option key={item} value={item}>{item}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem label="地址">
              {getFieldDecorator('address')(
                <Input placeholder="请填写您的住址"/>
              )}
            </FormItem>
            <FormItem label="组">
              {getFieldDecorator('gid', {
                rules: [{ required: true, message: 'Please select your group ID!' }],
              })(
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={this.handleSelectChange}>
                  {results}
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Upload {...prop}>
                <Icon type="video-camera" />
                <div className="ant-upload-text">上传照片</div>
              </Upload>
              <Upload {...props} multiple={true}>
                <Icon type="plus" />
                <div className="ant-upload-text">上传照片</div>
              </Upload>
              {/* <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" className="upload-example">
                <img src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" />
                <span>示例</span>
              </a> */}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

UserCreate.propTypes = {
  groupList: PropTypes.array,
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};
export default Form.create()(UserCreate);
