import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; // services
import authHeader from '../services/auth-header';
import Axios from 'axios';
import OtherProfile from './profile/OtherProfile'

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 30px;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;

const MemberUser = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/user/?id=${id}`, {
      headers: authHeader(),
    })
      .then(({ data }) => {
        console.log(data);
        setUser(data);
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
      {!loading && user && (
      <OtherProfile id={id}/>
      )}
      {!loading && !user && <div>No users exist with that id!</div>}
    </UserListContainer>
  );
};

export default MemberUser;