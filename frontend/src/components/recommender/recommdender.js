import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import authService from '../../services/auth.service';
import authHeader from '../../services/auth-header';
import Axios from 'axios';

const ReccomendedMovies = (props) => {
  const currentUser = authService.getCurrentUser();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(currentUser.id);

  useEffect(() => {
    Axios.get('http://localhost:8080/api/recommender/home', { headers: authHeader() })
      .then(({ data }) => {
        console.log(data.movies);
        setMovies(data.movies);
        setTimeout(() => setLoading(false), 300);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      {/* Render Loading Icon Below? */}
      {loading && <div>Loading...</div>}

      {!loading && movies.map((movie, i) => <div key={i}>{movie}</div>)}
      {!loading && movies.length === 0 && (
        <div>Add a movie to your liked list to get reccomendations!</div>
      )}
    </Container>
  );
};

export default ReccomendedMovies;