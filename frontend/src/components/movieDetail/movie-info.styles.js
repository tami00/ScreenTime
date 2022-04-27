import styled from "styled-components";

export const Container = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

export const Container2 = styled.div`
  position: absolute;
  z-index: 1;
  left: 0; right: 0; bottom: 0;
  background: #808080;
  padding: 3px 8px;
  border-top: 1px solid lightgray;
  color: #fff;
  overflow-y: auto;
  max-height: 50vh;
`;

export const ShowTimesContainer = styled.div`
  position: absolute;
  z-index: 1;
  left: 0; right: 0; bottom: 0;
  background: #808080;
  padding: 3px 8px;
  border-top: 1px solid lightgray;
  color: #fff;
  overflow-y: auto;
  max-height: 50vh;
`;


export const PosterImg = styled.img`
  object-fit: cover;
  height: 352px;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const MovieName = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
    text-transform: capitalize;
    text-overflow: ellipsis;
    & span {
    opacity: 0.8;
}
`;

export const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

export const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

export const FavouriteButton = styled.button`
  height: 30px;
  width: 40px;
`;