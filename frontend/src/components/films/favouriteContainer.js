import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FavouriteCard from "./favouriteCard";
import Axios from "axios";
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import { Layout } from 'antd'
import { Content } from "antd/lib/layout/layout";


const FavouriteContainer = () => {
    const currentUser = authService.getCurrentUser();
    const [favouriteList, setFavouriteList] = useState([])

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

  return (
        <Layout>
            <Content>
                <div>
                    {favouriteList && favouriteList.map((films, index) => 
                        <FavouriteCard key={index} films={films}/>
                    )}
                </div>
            </Content>
        </Layout>
    )
}

export default FavouriteContainer