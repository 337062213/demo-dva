import React from 'react';
import {Modal, Form, Input, Select, InputNumber} from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const Option = Select.Option;

class UserUpdate extends React.Component {
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
    const { children, groupList, fid, name, age, gid, sex, address } = this.props;
    const { getFieldDecorator } = this.props.form;
    const results = groupList.map((group) => <Option key={group.id}>{group.groupName}</Option>);
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div style={{float: 'left'}}>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Update User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="ID" style={{ display: 'none' }}>
              {getFieldDecorator('fid', {
                initialValue: fid,
              })(<Input placeholder="请选择ID"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                initialValue: name,
              })(<Input placeholder="请填写姓名"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator('age', {
                initialValue: age,
              })(<InputNumber style={{width: '100%'}} placeholder="请填写年龄" min={18} max={65}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('sex', {initialValue: sex})(
                <Select placeholder="请选择性别" >
                  {['M', 'F'].map((item) => <Option key={item} value={item}>{item}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="住址">
              {getFieldDecorator('address', {
                initialValue: address,
              })(<Input placeholder="请填写住址"/>)}
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
      </div>
    );
  }
}
UserUpdate.propTypes = {
  form: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default Form.create()(UserUpdate);
