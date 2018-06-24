import React, { Component } from 'react';

export default class SearchForm extends Component {

    state = {
        searchText: ''
    }
    
    onSearchChange = event => {
        this.setState({ searchText: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSearch(this.state.searchText);
        event.currentTarget.reset();
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <label className="is-hidden" htmlFor="search">Search</label>
                <input type="search" 
                    placeholder="Username"
                    onChange={this.onSearchChange}
                />
            </form>
        );
    }
}