import React, {useState} from "react";
import {Link} from "react-router-dom";

import {List, Skeleton, Avatar, Popconfirm, message, notification} from 'antd';
import openNotificationWithIcon from "../../helpers/openNotificationWithIcon";
import axios from 'axios';
import EditModal from "./modals/edit";

export interface FriendEntity {
    first_name: string,
    last_name: string,
    birth_date: string,
    id: number,
    setUpdate: Function
}



const Friend = (item: FriendEntity) => {
    function showEditModal() {
        setEditVisible(true)
    }

    function closeModal() {
        setEditVisible(false);
    }

    function onDelete() {
        let config = {
      headers: { Authorization: "bearer " + localStorage.getItem('token') }
    };
        axios.delete(`http://127.0.0.1:8000/api/${item.id}/`, config)
            .then(
                response => {
                    item.setUpdate(true);
                    openNotificationWithIcon('success', 'Success', 'Friend has been successfully deleted');
                },
                error => {
                    openNotificationWithIcon('error', 'Error', 'Error has been encountered while trying to delete');
                }
            );
    }

    const [editVisible, setEditVisible] = useState(false);
    // @ts-ignore
    const editModal = <EditModal
        item={item.id ? item : {}}
        visible={editVisible}
        handleCancel={closeModal}
    />;

    // @ts-ignore
    return <List.Item
            key={item.id}
            actions={[
                <a key="list-loadmore-edit" onClick={showEditModal}>Edit</a>,
                //@ts-ignore
                <Popconfirm placement="topLeft" title={'Are you sure?'} onConfirm={onDelete} okText="Yes" cancelText="No">
                    <a key="list-loadmore-more">Delete</a>
                </Popconfirm>
            ]}
          >
            <Skeleton loading={false} avatar title={false} active >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Link to={`/list/${item.id}`}>{item.first_name} {item.last_name}</Link>}
                description={item.birth_date}
              />
            </Skeleton>
            {editModal}
          </List.Item>
};

export default Friend;