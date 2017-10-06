import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.searchOnEnter = this.searchOnEnter.bind(this);
  }

  search(event){
    try {
      this.props.onSearch(this.state.term);
    } catch(e) {
      console.log(e);
    }
  }

  searchOnEnter(event) {
    if(event.keyCode == 13) {
      this.search();
    }
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  render() {
    return (
    <div className="SearchBar">
      <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" onKeyDown={this.searchOnEnter}/>
      <a onClick={this.search}>SEARCH</a>
    </div>
  )}
}

export default SearchBar;
