
import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import Axios from 'axios';
import moment from 'moment'


const ShowTimes = (props) => {
    // const currentUser = authService.getCurrentUser();
    const date =  moment(new Date()).format("YYYY-MM-DD")

    const variables = {
        movieTitle: props.movieTitle,
        date: date
    }

    // console.log(variables)

      useEffect(() => {
        if (!props.movieTitle) return;
        Axios.post('http://localhost:8080/api/parser/parse', {data:variables}, {headers: authHeader()})
          .then(response => {
            if (response.data.success) {
              console.log('Times', response.data)
            //   setFutureFilmsList(response.data.films)
            } else {
              alert('Error')
            }
          })
      },[props])

    return (
        <div>
            hi
        </div>
    )
}

export default ShowTimes;