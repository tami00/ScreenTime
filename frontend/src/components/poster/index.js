import React from "react";

import {Image} from './poster.styles'

const Poster = ({image, movieId}) => (
    <div>
        <Image src = {image}/>
    </div>
)

export default Poster;