import React from 'react';
import {Modal, Form, Input} from 'antd';
import DateTime from '../../utils/DateTime';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class MockUpdate extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = () => {
    this.setState({
      visible: true,
    });
  }

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  }

  render () {
    const { children } = this.props;
    const { id, name, age, sex, address, gid, mobile, avatar, status, email, isadmin, createdat, updatedat } = this.props.record;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const now = new Date();
    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="ID">
              {getFieldDecorator('id', {
                initialValue: id,
                rules: [{required: true, message: 'pls enter id'}],
              })(<Input disabled={true}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                initialValue: name,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator('age', {
                initialValue: age,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('sex', {
                initialValue: sex,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="住址">
              {getFieldDecorator('address', {
                initialValue: address,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="邮件">
              {getFieldDecorator('email', {
                initialValue: email,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="GID">
              {getFieldDecorator('gid', {
                initialValue: gid,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机">
              {getFieldDecorator('mobile', {
                initialValue: mobile,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="激活">
              {getFieldDecorator('avatar', {
                initialValue: avatar,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('status', {
                initialValue: status,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="是否管理员">
              {getFieldDecorator('isadmin', {
                initialValue: isadmin,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="创建日期">
              {getFieldDecorator('createdat', {
                initialValue: createdat,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="更新日期">
              {getFieldDecorator('updatedat', {
                initialValue: updatedat || DateTime(now, 'yyyy-MM-dd h:m:s'),
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
MockUpdate.propTypes = {
  record: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default Form.create()(MockUpdate);
