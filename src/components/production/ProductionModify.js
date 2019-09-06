import React, { Component } from 'react';
import {Modal, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;

class ProductionModify extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) {e.stopPropagation();}
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
    const { getFieldDecorator } = this.props.form;
    const { fid, name, age, gid, sex, address } = this.props.record;

    const groupList = JSON.parse(sessionStorage.getItem('groupList'));
    const results = groupList.map((group) => <Option key={group.id}>{group.name}</Option>);

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

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
            <FormItem {...formItemLayout} label="ID" style={{ display: 'none' }}>
              {getFieldDecorator('fid', {
                initialValue: fid,
              })(<Input />)}
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
            <FormItem {...formItemLayout} label="组">
              {getFieldDecorator('gid', {
                initialValue: gid,
              })(
                <Select onChange={this.handleSelectChange}>
                  {results}
                </Select>
              )}
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}

ProductionModify.propTypes = {
  children: PropTypes.object.isRequired,
  userList: PropTypes.array.isRequired,
  record: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
export default Form.create({})(ProductionModify);
