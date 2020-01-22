import React, {useState} from "react";
import {Link} from "react-router-dom";
import EditModal from "./edit";

import {List, Skeleton, Avatar, Popconfirm, message, notification} from 'antd';
import openNotificationWithIcon from "../../helpers/openNotificationWithIcon";

export interface StudentEntity {
    first_name: string,
    last_name: string,
    birth_date: string,
    id: string,
    setUpdate: Function
};



const Student = (item: StudentEntity) => {
    function showEditModal() {
        setEditVisible(true)
    }

    function closeModal() {
        setEditVisible(false);
    }

    function get_students_list(){
        let storage_value = localStorage.getItem('students_list');
        if(storage_value){
            try {
                return JSON.parse(storage_value)
            } catch (e) {
                return []
            }
        }
        return []
    }

    function set_student_list (new_values: Array<any>){
        try {
            localStorage.setItem('students_list', JSON.stringify(new_values))
        } catch (e) {
            console.log(e)
        }
    }

    function onDelete() {
        let list = get_students_list();
        for( let i = 0; i < list.length; i++){
            if ( list[i].id === item.id) {
                list.splice(i, 1);
            }
        }
        set_student_list(list);
        item.setUpdate(true);
        openNotificationWithIcon('success', 'Success', 'Student has been successfully deleted');
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

export default Student;