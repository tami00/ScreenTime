import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; // services
import authHeader from '../services/auth-header';
import Axios from 'axios';
import { Card, Avatar, Space } from 'antd';

const { Meta } = Card;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 30px;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;

const UserListComponent = (props) => {
  
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const { username } = useParams();

  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/search?username=${username}`, {
      headers: authHeader(),
    })
      .then(({ data }) => {
        console.log(data.users);
        setUserList(data.users);
        setTimeout(() => setLoading(false), 500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  

  return (
    <UserListContainer
      onClick={() => {
        //history.push(`/films/${props.movieList.movie.id}`)
      }}
    >
      {loading && <div>Loading...</div>}
      {!loading &&
        userList.map((user, i) => (
          <Link key={i} to={`/user/${user._id}`}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card key={i} user={user} style={{ width: 700 }}>
            <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={user.username}
                    description={user.bio}
                  />
            </Card>
          </Space>
          </Link>
        ))}
      {!loading && userList.length === 0 && (
        <div>No users exist with that name!</div>
      )}
    </UserListContainer>
  );
};

export default UserListComponent;