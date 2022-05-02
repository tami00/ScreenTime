import styled from "styled-components";

export const MovieCard = styled.div`
display: flex;
flex-direction: column;
width: 175px;
box-shadow: 0 3px 10px 0 #aaa;
cursor: pointer;
gap: 0;
border-radius: 5px;
cursor : pointer;
`;


export const BottomDiv = styled.div`
  display: flex;
  flex-direction: column;
  height : 65px;
  padding : 5px;
`;

export const MovieName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin: 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PosterImg = styled.img`
  object-fit: cover;
  height: 250px;
`;

export const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;