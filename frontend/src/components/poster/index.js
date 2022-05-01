import React from "react";

import { useHistory } from "react-router-dom";// services
import {Image} from './poster.styles'

const Poster = ({image, movieId, movieTitle}) => {
    const history = useHistory();
    return (
    <div>
        <Image src = {image} onClick={() => { history.push(`/films/${movieTitle}/${movieId}`)}}/>
    </div>
    )
}

export default Poster;