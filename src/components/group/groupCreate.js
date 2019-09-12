import React from 'react';
import {Form, Input, Modal} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class GroupCreate extends React.Component {
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
            <FormItem label="ID" style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                rules: [{ required: false}],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="组名">
              {getFieldDecorator('groupName', {
                rules: [{ required: true }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

GroupCreate.propTypes = {
  form: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default Form.create()(GroupCreate);
