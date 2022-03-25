import React,{useState} from 'react'
import { useHistory } from "react-router-dom";// services


function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const history = useHistory();

    const onTextChange =(e) => {
      const value = e.target.value;
      setSearchQuery(value);
    };
  
    //call function when submitting
    const onMovieSearch = async (event) =>
    {
      event.preventDefault();
      try {
        // passing result to callback function retrieved from parent (App.js)
        history.push(`/films/${searchQuery}`)
      } catch (error) {
          console.log(error)
      }
     
      
    }
  
    return (
      <div>
        <form class="d-flex" onSubmit={onMovieSearch}>
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={onTextChange}/>
          <button class="btn btn-outline-success ml-2" type="submit">Search</button>
        </form>
      </div>
    );
  }

export default Search;