import React from 'react';
import { Button, Form, Input, Icon } from 'antd';
import { Link } from 'dva/router';

const FormItem = Form.Item;

class Login extends React.Component {

  handleSubmit = () => {
    const { onLogin, form: { validateFields }} = this.props;
    validateFields((err, values) => {
      if (!err) {
        onLogin(values);
        this.props.form.resetFields();
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.props;
    if (isLogin) {
      return (
        <div>
          <div>This is Home!</div>
          <div>
            <Link to="/index" style={{color: 'black'}}>
              <div><Icon type="caret-right"/>点击跳转到dva</div>
            </Link>
            <Link to="/user" style={{color: 'black'}}>
              <div><Icon type="caret-right"/>点击跳转到user</div>
            </Link>
            <Link to="/group" style={{color: 'black'}}>
              <div><Icon type="caret-right"/>点击跳转到group</div>
            </Link>
            <Link to="/" style={{color: 'black'}}>
              <div><Icon type="caret-right"/>点击跳转到default</div>
            </Link>
            <Link to="/mock" style={{color: 'black'}}>
              <div><Icon type="caret-right"/>点击跳转到mock</div>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <Form onSubmit={this.handleSubmit} className='login-form' style={ {margin: '0 auto", width: "28%' }}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='name' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
          </FormItem>
        </Form>
      );
    }
  }
}

export default Form.create()(Login);
