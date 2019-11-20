import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    
    <div className="search-form">
    <h5>Search For a Drink</h5>
    <div className="row">
        <div className="col-12">
            <div className="input-group">
                <input 
                value={props.searchQuery}
                onChange={props.handleInputChange}
                name="book"
                list="bars"
                type="search"
                className="form-control border-secondary py-2"
                placeholder="Type in a drink name or ingredient to begin"
                id="bars"
              />


                <span className="input-group-append">
                    <button onClick={props.handleFormSubmit} className="btn btn-outline" type="button">
                        Search
                    </button>
                </span>
            </div>
        </div>
    </div>
</div>

  );
}

export default SearchForm;



