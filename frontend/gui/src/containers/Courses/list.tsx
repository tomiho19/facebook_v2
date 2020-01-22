import React, { useState , useEffect} from 'react';
import Course from "../../components/Course";
import { List} from 'antd';
import axios from 'axios';

export interface CourseEntity {
    title: string,
    author: string,
    start_date: string,
    end_date: string,
    id: string
}

const get_courses_list = () => {
    let storage_value = localStorage.getItem('courses_list');
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
const CourseList: React.FC = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldUpdate, setUpdate] = useState(true);
    // @ts-ignore
    useEffect(() => {
        if(shouldUpdate){
            const list = get_courses_list();
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
        renderItem={(item: CourseEntity, index) => <Course id={item.id} {...item} setUpdate={setUpdate}/>}
        pagination={{pageSize: 3}}
        />
};

export default CourseList;
