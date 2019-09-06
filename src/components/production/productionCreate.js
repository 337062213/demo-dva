import React, { Component } from 'react';
import {Form, Input, Modal, Select } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;

class ProductionCreate extends Component {
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
    const { children, form: { getFieldDecorator } } = this.props;

    const groupList = JSON.parse(sessionStorage.getItem('groupList'));
    const results = groupList.map((group) => <Option key={group.id}>{group.name}</Option>);

    return (
      <div>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="新建记录"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="ID">
              {getFieldDecorator('fid', {
                rules: [{ required: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="姓名">
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator('age')(
                <Input />
              )}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator('sex')(
                <Input >
                  <Select placeholder="请选择人员" style={{ width: 120 }}>
                    <Option value="M">M</Option>
                    <Option value="F">F</Option>
                  </Select>
                </Input>
              )}
            </FormItem>
            <FormItem label="地址">
              {getFieldDecorator('address')(
                <Input />
              )}
            </FormItem>
            <FormItem label="组别">
              {getFieldDecorator('gid', {
                rules: [{ required: true, message: 'Please select your gid!' }],
              })(
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={this.handleSelectChange}>
                  {results}
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

ProductionCreate.propTypes = {
  children: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Form.create()(ProductionCreate);
