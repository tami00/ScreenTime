import React from "react";

import {Wrapper, Content, Text} from './heroImage.styles';

const HeroImage = ({title,image}) => (
    <Wrapper image={image}>
        <Content>
            <Text>
                <h1>{title}</h1>
            </Text>
        </Content>
    </Wrapper>
)

export default HeroImage;