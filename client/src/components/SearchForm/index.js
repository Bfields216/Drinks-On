import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <form className="search">
    <div className="input-group mb-3">
        <label htmlFor="breed"><h4>Search For a Drink</h4></label>
        <input
          value={props.searchQuery}
          onChange={props.handleInputChange}
          name="book"
          list="books"
          type="text"
          className="form-control"
          placeholder="Type in a drink name or ingredient to begin"
          id="book"
        />
        <div className="input-group-append">
        <button type="button" onClick={props.handleFormSubmit} className="btn btn-outline">
          Search
        </button>
      </div>
      </div>
     
    </form>
  );
}

export default SearchForm;



