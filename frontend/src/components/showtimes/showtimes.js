
import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import Axios from 'axios';
import moment from 'moment'
import { Table } from 'antd';


const ShowTimes = (props) => {
    // const currentUser = authService.getCurrentUser();
    const date =  moment(new Date()).format("YYYY-MM-DD")
    const [showTimesList, setShowTimesList] = useState([])

    const variables = {
        movieTitle: props.movieTitle,
        date: date
    }

    const columns = [
      { title: 'Cineworld Showtimes', dataIndex: 'address', key: '1' },
    ];

    const dataSource = [{}]

    // const times = moment(showTimesList).format('DD-MM-YYYY HH:mm:ss')
    // console.log(showTimesList)

      useEffect(() => {
        if (!props.movieTitle) return;
        Axios.post('http://localhost:8080/api/parser/parse', {data:variables}, {headers: authHeader()})
          .then(response => {
            if (response.data.success) {
              console.log('Times', response.data.sendTimes)
              setShowTimesList(response.data.sendTimes.map(item =>(moment(item).format("HH:mm"))))
            } else {
              alert('Error')
            }
          })
      },[props])

      return (
        <div style={{ maxWidth: '100px', margin: '2rem auto' }}>
          {showTimesList.length === 0 ?
            <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
              <h1>There are no available showtimes at the moment</h1>
            </div> :
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Table columns={columns}></Table>
            </div>
    
          }
    
        </div>
    )
}

export default ShowTimes;