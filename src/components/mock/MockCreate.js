import React from 'react';
import {Form, Input, Modal} from 'antd';
import PropTypes from 'prop-types';
import DateTime from '../../utils/DateTime';

const FormItem = Form.Item;

class MockCreate extends React.Component {
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
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
    let initDate = '';
    const setDateTime = () => {
      initDate = DateTime(new Date(), 'yyyy-MM-dd h:m:s');
      return initDate;
    };

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
            <FormItem {...formItemLayout} label="ID">
              {getFieldDecorator('id', {
                rules: [{required: true, placeholder: 'pls enter id'}],
              })(
                <Input placeholder={'pls enter id'}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              {getFieldDecorator('age')(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('sex')(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="地址">
              {getFieldDecorator('address')(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="邮件">
              {getFieldDecorator('email')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="GID">
              {getFieldDecorator('gid')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机">
              {getFieldDecorator('mobile')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="激活">
              {getFieldDecorator('avatar')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="状态">
              {getFieldDecorator('status')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="是否管理员">
              {getFieldDecorator('isadmin')(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="创建日期">
              {getFieldDecorator('createdat', {
                initialValue: initDate,
              })(<Input onClick = {setDateTime}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="更新日期">
              {getFieldDecorator('updatedat')(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

MockCreate.propTypes = {
  groupList: PropTypes.array,
  onOk: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};
export default Form.create()(MockCreate);
