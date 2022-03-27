import styled from "styled-components";

// export const Wrapper = styled.div`
//     url(${({image}) => image})
//     background-size: 100%, cover;
//     height: 600px;
//     width: 300px
//     position: relative;
// `;

export const Wrapper = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 41%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(${({ image }) => image});
  background-size: 100%, cover;
  width: 1000px;
  height: 400px;
`;

export const Content = styled.div``;


export const Text = styled.div``;