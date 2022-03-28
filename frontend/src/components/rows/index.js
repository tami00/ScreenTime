import React from "react";
// styles
import { Wrapper, Container, Content } from "./rows.styles";

const Rows = ({header, children}) => (
    <Wrapper>
        <h1>{header}</h1>
        <Container>
                {children}
        </Container>
    </Wrapper>
)

export default Rows