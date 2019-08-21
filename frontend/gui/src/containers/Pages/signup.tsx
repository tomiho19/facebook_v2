import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  DatePicker,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import * as actions from "../../store/actions/auth";
import {connect} from 'react-redux';
import axios from "axios";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

export interface ErrorEntity {
    target: Object
}

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
      // @ts-ignore
  handleSubmit = e => {
    e.preventDefault();
          // @ts-ignore

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.sendValues(values);
      }
    });
  };

  sendValues = (values:any) => {
    values['birth_date'] = values['birth_date'].format('YYYY-MM-DD');
    delete values.agreement;
    delete values.confirm;
    //@ts-ignore
    this.props.onAuth(values.email, values.password).then(
        (response:any) => {
          axios.post(`http://127.0.0.1:8000/api/`, values)
            .then(
                response => console.log(response),
                error => console.log(error)
            );
        },
        (error:any) => {
          //
        }
    );
    //@ts-ignore
    this.props.history.push('/signin')
  };


  handleConfirmBlur = (e: ErrorEntity) => {
      // @ts-ignore
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule: string, value: string, callback: Function) => {
            // @ts-ignore
    const form  = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: string, value: string, callback: Function) => {
                  // @ts-ignore

    const form  = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
            // @ts-ignore

    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
          <Form.Item
          label={
            <span>
              First Name&nbsp;
              <Tooltip title="For example Ivan">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('first_name', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
          <Form.Item
          label={
            <span>
              Last Name&nbsp;
              <Tooltip title="For example Ivanov">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('last_name', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Your birth date">
          {getFieldDecorator('birth_date', {
            rules: [{ required: true, message: 'Please input your birth date!' }],
            //@ts-ignore
          })(
              //@ts-ignore
            <DatePicker showTime format="YYYY-MM-DD" />,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email:any, password:any) => dispatch(actions.authSignup(email, password))
    }
};

const SignUp = Form.create({ name: 'register' })(RegistrationForm);
export default connect(null, mapDispatchToProps)(SignUp);