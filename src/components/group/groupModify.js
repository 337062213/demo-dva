import React from 'react';
import {Modal, Form, Input} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class GroupModify extends React.Component {
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
    const { getFieldDecorator } = this.props.form;
    const { id, groupName } = this.props.record;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit Group"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="id" style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                initialValue: id,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="组名">
              {getFieldDecorator('groupName', {
                initialValue: groupName,
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
GroupModify.propTypes = {
  record: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default Form.create()(GroupModify);
