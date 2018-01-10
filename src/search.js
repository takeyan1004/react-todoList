import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
    this.searchInputHandler = this.searchInputHandler.bind(this);
  }

  searchInputHandler(event) {
    this.setState({
      search: event.target.value
    });
  }

  render() {
    const searchResultList = this.props.list.filter(item => {
      return (
        item.text.toUpperCase().indexOf(this.state.search.toUpperCase()) !==
          -1 && item.completed === false
      );
    });

    return (
      <div>
        <h3>ToDo Search</h3>
        <input onChange={this.searchInputHandler} value={this.state.search} />

        {searchResultList.map((item, index) => {
          if (this.state.search === "") {
            return false;
          }
          return <li key={index}>{item.text}</li>;
        })}
      </div>
    );
  }
}

export default Search;
