import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Card } from 'antd';
const { Meta } = Card;

const Detail: React.FC = (props) => {
  const [item, setItem] = useState({id: 0, title: '', author: '', start_date: '', end_date: ''});
  const [loading, setLoading] = useState(true);
      // @ts-ignore
    let id = +props.match.params.id;

    // @ts-ignore
    useEffect(() => {
        if(!item.id || item.id !== id){
            axios.get(`http://127.0.0.1:8000/api/${id}`)
            .then(
                response => {
                    setItem(response.data);
                    setLoading(false)
                },
                error => {
                    setLoading(false)
                }
            )
        }
    });
  return (
    <Card
        loading={loading}
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
  >
    <Meta title={`${item.title} (${item.start_date} - ${item.end_date})`} description={item.author} />
  </Card>
  );
};

export default Detail;
