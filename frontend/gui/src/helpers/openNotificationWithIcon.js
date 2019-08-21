import {notification} from "antd";

export default function openNotificationWithIcon(type, message, description){
  notification[type]({
    message,
    description
  });
}