import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 0 auto;
    padding: 0 20px;
    overflow-y: hidden;
    overflow-x: scroll; 
    &::-webkit-scrollbar {
        display: none
    }
`;

export const Container = styled.div`
    display: flex;
`;

