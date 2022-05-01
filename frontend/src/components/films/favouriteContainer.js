import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'; // services
import styled from "styled-components";
import FavouriteCard from "./favouriteCard";
import Axios from "axios";
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import { Col, Row  } from 'antd'


const FavouriteContainer = (props) => {
    const currentUser = authService.getCurrentUser();

    const id = props.userID;

    const url = window.location.href 
    
    // if (url.indexOf(id)) {
    //     console.log('OK')
    // }

    // console.log('OUID',otherUserID)

    const [favouriteList, setFavouriteList] = useState([])
    const [visible, setVisible] = useState(3)
    // const [maxValue, setMaxValue] = useState()


    const handleChange = (value) => {
       setVisible((prevValue) => prevValue + 3)
    }

    useEffect(() => {
        if(!props.userID) return;
        Axios.post('http://localhost:8080/api/favourite/getOtherUserFavourites', { data: id }, { headers: authHeader() })
            .then(response => {
                if (response.data.success) {
                    console.log('Others Users Favourite Films', response.data)
                    //setFavouriteList(response.data.films)
                } else {
                    alert('Error')
                }
            })
    },[props])

    

    useEffect(() => {
        Axios.post('http://localhost:8080/api/favourite/getFavourites', { data: currentUser.id }, { headers: authHeader() })
            .then(response => {
                if (response.data.success) {
                    console.log('Users Favourite Films', response.data)
                    setFavouriteList(response.data.films)
                } else {
                    alert('Error')
                }
            })
    },[])

    const displayCards = favouriteList && favouriteList.slice(0, visible).map((films, index) => {
        return (
        <Col lg={6} md={8} xs={24}>
        <FavouriteCard key={index} films={films}/>
        </Col>
        )
    })

  return (
    <div style={{ maxWidth: '2000px', margin: '2rem auto' }}>              
        {favouriteList.length === 0 ?
         <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
         <h2>Add movies to your favourites</h2>
     </div> :
     <div>
         <Row gutter={[16, 16]}>
             {displayCards}          
         </Row>
         <button onClick={handleChange}>Load</button>
     </div>
        
    }
             
    </div>
    )
}

export default FavouriteContainer