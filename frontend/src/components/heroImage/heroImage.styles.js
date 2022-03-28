import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(${({ image }) => image});
  background-size: 100%, cover;
  background-position: center;
  height: 600px;
  position: relative;
`;

export const Content = styled.div`
    padding: 20px;
    margin: 0 auto
`;


export const Text = styled.div`
    z-index: 100;
    max-width: 700px;
    position: absolute;
    bottom: 40px;
    margin-right: 20px;
    min-height:100px;
    color: var(--white);
`;