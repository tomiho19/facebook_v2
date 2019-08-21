import React from "react";
import { Form, Icon, Input, Button } from 'antd';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/auth';
import axios from "axios";
import openNotificationWithIcon from "../../helpers/openNotificationWithIcon";

function hasErrors(fieldsError: Array<string>) {
  return Object.keys(fieldsError).some((field: string) : string => {
      // @ts-ignore
      return fieldsError[field];
  });
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
      // @ts-ignore
    this.props.form.validateFields();
  }
      // @ts-ignore
  handleSubmit = e => {
    e.preventDefault();
          // @ts-ignore
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.sendValues(values);
      }
    });
  };

  sendValues = (values: any) => {
      console.log(values.email, values.password);
            //@ts-ignore
      this.props.onAuth(values.email, values.password);
                  //@ts-ignore

      //@ts-ignore
      setTimeout(() => this.props.history.push('/list'), 3000);
  };

  render() {
            // @ts-ignore
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email:any, password:any) => dispatch(actions.authLogin(email, password))
    }
};

const SignIn = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);
export default connect(null, mapDispatchToProps)(SignIn);