import React, { Component } from "react";
import axios from "axios";




class Edit extends Component {
  state = {
    drinks: [],
    searchQuery: ""
  };

  componentDidMount() {
    API.drinks(this.props.match.params.id)
      .then(res => this.setState({ drinks: drinks.data.drinks }))
      .catch(err => console.log(err));
      console.log("This is working")


    getdrinkbyID = () => {
      axios
        .get("/api/drinks/" + this.props.match.params.id)
        .then(drinks => {
          console.log(drinks);
          this.setState({
            model: drinks.data.data.model,
            color: drinks.data.data.color,
            year: drinks.data.data.year,
            imageURL: drinks.data.data.imageURL,
            _id: drinks.data.data._id
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>This is the edit page</h1>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <form>
              <div className="form-group">
                <label htmlFor="model">Tesla Model</label>
                <input
                  className="form-control"
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={this.state.model}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Tesla Color</label>
                <input
                  className="form-control"
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={this.state.color}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Tesla Year</label>
                <input
                  className="form-control"
                  type="number"
                  name="year"
                  placeholder="Year"
                  value={this.state.year}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageURL">Tesla Image URL</label>
                <input
                  className="form-control"
                  type="text"
                  name="imageURL"
                  placeholder="Image URL"
                  value={this.state.imageURL}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Submit Changes
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }

}
  export default Edit;