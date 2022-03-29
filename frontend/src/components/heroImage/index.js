import React from "react";

import {Wrapper, Content, Text} from './heroImage.styles';

const HeroImage = ({title,image}) => (
    <Wrapper image={image}>
        <Content>
            <Text>
                <h2>TAG LINE...</h2>
                <h3>{title}</h3>
            </Text>
        </Content>
    </Wrapper>
)

export default HeroImage;