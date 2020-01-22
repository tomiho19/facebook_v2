import React, { useState , useEffect} from 'react';
import Student from "../../components/Student";
import { List} from 'antd';
import axios from 'axios';

export interface StudentEntity {
    first_name: string,
    last_name: string,
    birth_date: string,
    id: string
}

const get_students_list = () => {
    let storage_value = localStorage.getItem('students_list');
    if(storage_value){
        try {
            return JSON.parse(storage_value)
        } catch (e) {
            return []
        }
    }
    return []
};

// @ts-ignore
const StudentList: React.FC = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldUpdate, setUpdate] = useState(true);
    // @ts-ignore
    useEffect(() => {
        if(shouldUpdate){
            const list = get_students_list()
            setList(list);
            setLoading(false);
            setUpdate(false);
        }
    }, [shouldUpdate]);
    //@ts-ignore
    return <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loading={loading}
        dataSource={list}
        //@ts-ignore
        renderItem={(item: StudentEntity, index) => <Student id={index + 1} {...item} setUpdate={setUpdate}/>}
        pagination={{pageSize: 3}}
        />
};

export default StudentList;
