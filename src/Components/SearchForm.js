import React, { Component } from 'react';
import Gists from "./Gists";

export default class SearchForm extends Component {

    constructor(){
        super();
        this.state = {
            searchText: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({searchText: this.refs.searchText.value});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Github username:
                        <input type="search"
                               ref="searchText"
                        />
                    </label>
                    <input type="submit" />
                </form>
                {this.state.searchText &&
                    <Gists query={this.state.searchText}></Gists>
                }
            </div>
        );
    }
}