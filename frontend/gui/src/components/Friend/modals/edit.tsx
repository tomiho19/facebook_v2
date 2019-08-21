import React from "react";
import {
    Form,
    Input,
    Tooltip,
    Icon,
    DatePicker,
    Select,
    Button,
    AutoComplete, Modal,
} from 'antd';
import axios from 'axios';
import openNotificationWithIcon from "../../../helpers/openNotificationWithIcon";
import {ErrorEntity} from "../../../containers/Pages/signup";

const moment = require('moment');
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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
        //@ts-ignore
        this.sendValues(values)
      }
    });
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

  sendValues = (values: any) => {
    //@ts-ignore
    const id = this.props.item.id;
    let config = {
      headers: { Authorization: "bearer " + localStorage.getItem('token') }
    };
        //@ts-ignore
    const setUpdate = this.props.item.setUpdate;
    values['birth_date'] = values['birth_date'].format('YYYY-MM-DD');
    values['id'] = id;
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";

        //@ts-ignore
    axios.put(`http://127.0.0.1:8000/api/${id}/`, {...values}, config)
            .then(
                response => {
                    setUpdate(true);
                    openNotificationWithIcon('success', 'Success', 'Friend has been successfully update');
                },
                error => {
                    openNotificationWithIcon('error', 'Error', 'Error has been encountered while trying to edit');
                }
            )
  };

  render() {
            // @ts-ignore

    const { getFieldDecorator } = this.props.form;

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
    // @ts-ignore
    const {first_name, last_name, birth_date, email, password} = this.props.item || {};

    return (
        <Modal
          title="Edit"
          //@ts-ignore
          visible={this.props.visible}
          //@ts-ignore
          onCancel={this.props.handleCancel}
          footer={[]}
        >
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            initialValue: email,
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
            //@ts-ignore
            initialValue: first_name,
          }, )(<Input/>)}
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
            //@ts-ignore
            initialValue: last_name,
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Your birth date">
          {getFieldDecorator('birth_date', {
            rules: [{ required: true, message: 'Please input your birth date!' }],
            //@ts-ignore
            initialValue: moment(+new Date(birth_date))
          })(
              //@ts-ignore
            <DatePicker showTime format="YYYY-MM-DD" />,
          )}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            initialValue: password,
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
            initialValue: password,
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
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
        </Modal>
    );
  }
}

const EditModal = Form.create({ name: 'register' })(RegistrationForm);
export default EditModal;