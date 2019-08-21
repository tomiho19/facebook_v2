import React, { useState , useEffect} from 'react';
import Friend from "../../components/Friend";
import { List} from 'antd';
import axios from 'axios';

export interface FriendEntity {
    first_name: string,
    last_name: string,
    birth_date: string,
    id: number
}

// @ts-ignore
const FriendList: React.FC = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldUpdate, setUpdate] = useState(true);
    // @ts-ignore
    useEffect(() => {
        if(shouldUpdate){
            axios.get('http://127.0.0.1:8000/api/')
            .then(
                response => {
                    setList(response.data);
                    setLoading(false);
                    setUpdate(false);
                },
                error => {
                    setLoading(false);
                    setUpdate(false);
                }
            )
        }
    }, [shouldUpdate]);
    //@ts-ignore
    return <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loading={loading}
        dataSource={list}
        //@ts-ignore
        renderItem={(item: FriendEntity, index) => <Friend id={index + 1} {...item} setUpdate={setUpdate}/>}
        pagination={{pageSize: 3}}
        />
};

export default FriendList;
